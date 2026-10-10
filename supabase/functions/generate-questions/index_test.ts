import { handleRequest } from "./index.ts";

const sourceText = "Lan tưới cây. Thầy Minh đọc sách. ".repeat(40);
const questionTypes = ["mc", "short", "fill", "tf"];

function createQuestions() {
  return [
    {
      type: "mc",
      c: "Ai tưới cây?",
      o: ["Lan", "Mai", "Hùng", "Thầy Minh"],
      acc: [],
      a: 0,
      e: "Văn bản ghi: “Lan tưới cây.”",
      d: "Dễ",
    },
    {
      type: "short",
      c: "Ai đọc sách?",
      o: [],
      acc: ["Thầy Minh"],
      a: -1,
      e: "Văn bản ghi: “Thầy Minh đọc sách.”",
      d: "Dễ",
    },
    {
      type: "fill",
      c: "Lan _____ cây.",
      o: [],
      acc: ["tưới"],
      a: -1,
      e: "Văn bản ghi: “Lan tưới cây.”",
      d: "Dễ",
    },
    {
      type: "tf",
      c: "Lan tưới cây.",
      o: [],
      acc: [],
      a: 0,
      e: "Phát biểu đúng theo câu: “Lan tưới cây.”",
      d: "Dễ",
    },
    {
      type: "mc",
      c: "Thầy Minh làm gì?",
      o: ["Tưới cây", "Đọc sách", "Trồng hoa", "Ghi chép"],
      acc: [],
      a: 1,
      e: "Văn bản ghi: “Thầy Minh đọc sách.”",
      d: "Dễ",
    },
  ];
}

function createRequest(): Request {
  return new Request("https://example.test/functions/v1/generate-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: "Đọc hiểu",
      sourceText,
      questionCount: 5,
      questionTypes,
    }),
  });
}

async function withOpenRouterMock(
  mockFetch: typeof fetch,
  run: () => Promise<void>,
): Promise<void> {
  const previousFetch = globalThis.fetch;
  const previousOpenRouterKey = Deno.env.get("OPENROUTER_API_KEY");
  const previousGeminiKey = Deno.env.get("GEMINI_API_KEY");
  const previousModel = Deno.env.get("OPENROUTER_MODEL");
  Deno.env.set("OPENROUTER_API_KEY", "unit-test-openrouter-key");
  Deno.env.delete("GEMINI_API_KEY");
  Deno.env.delete("OPENROUTER_MODEL");
  globalThis.fetch = mockFetch;

  try {
    await run();
  } finally {
    globalThis.fetch = previousFetch;
    if (previousOpenRouterKey === undefined) Deno.env.delete("OPENROUTER_API_KEY");
    else Deno.env.set("OPENROUTER_API_KEY", previousOpenRouterKey);
    if (previousGeminiKey === undefined) Deno.env.delete("GEMINI_API_KEY");
    else Deno.env.set("GEMINI_API_KEY", previousGeminiKey);
    if (previousModel === undefined) Deno.env.delete("OPENROUTER_MODEL");
    else Deno.env.set("OPENROUTER_MODEL", previousModel);
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

Deno.test("OpenRouter returns the requested question types in order", async () => {
  let requestUrl = "";
  let requestInit: RequestInit | undefined;
  await withOpenRouterMock(async (input, init) => {
    requestUrl = String(input);
    requestInit = init;
    return Response.json({
      choices: [{ message: { content: JSON.stringify({ title: "Bộ đọc hiểu", topic: "Đọc hiểu", qs: createQuestions() }) } }],
    });
  }, async () => {
    const response = await handleRequest(createRequest());
    const body = await response.json();
    assert(response.status === 200, `Expected 200, got ${response.status}: ${JSON.stringify(body)}`);
    assert(requestUrl === "https://openrouter.ai/api/v1/chat/completions", "Used the wrong provider URL");
    assert(requestInit?.method === "POST", "Expected a POST request");

    const headers = new Headers(requestInit?.headers);
    assert(headers.get("Authorization") === "Bearer unit-test-openrouter-key", "OpenRouter authorization was not set");
    const sent = JSON.parse(String(requestInit?.body));
    assert(sent.model === "google/gemini-2.5-flash", "Unexpected default OpenRouter model");
    assert(sent.response_format?.type === "json_object", "JSON response mode was not enabled");
    assert(body.qs.length === 5, "Expected five questions");
    assert(
      body.qs.map((question: { type: string }) => question.type).join(",") === "mc,short,fill,tf,mc",
      "Question types were not kept in the requested order",
    );
    assert(!("acc" in body.qs[0]), "MC question retained an unused answer field");
    assert(!("o" in body.qs[1]) && !("a" in body.qs[1]), "Short-answer question retained unused fields");
    assert(!("o" in body.qs[3]) && !("acc" in body.qs[3]), "True/false question retained unused fields");
    assert(body.qs.every((question: { id?: string }) => typeof question.id === "string"), "Question IDs were not assigned");
  });
});

Deno.test("OpenRouter retries and repairs an invalid question set", async () => {
  let callCount = 0;
  let retryPrompt = "";
  await withOpenRouterMock(async (_input, init) => {
    callCount++;
    const sent = JSON.parse(String(init?.body));
    if (callCount === 2) retryPrompt = sent.messages[0].content;
    const questions = createQuestions();
    if (callCount === 1) delete (questions[0] as { a?: number }).a;
    return Response.json({
      choices: [{ message: { content: JSON.stringify({ title: "Bộ đọc hiểu", topic: "Đọc hiểu", qs: questions }) } }],
    });
  }, async () => {
    const response = await handleRequest(createRequest());
    const body = await response.json();
    assert(response.status === 200, `Expected retry to succeed, got ${response.status}: ${JSON.stringify(body)}`);
    assert(callCount === 2, `Expected two provider calls, got ${callCount}`);
    assert(retryPrompt.includes("đáp án trắc nghiệm không hợp lệ"), "Retry did not identify the missing answer");
    assert(body.qs.length === 5, "Retry did not return the complete question set");
  });
});

Deno.test("OpenRouter quota errors are returned clearly without retrying", async () => {
  let callCount = 0;
  await withOpenRouterMock(async () => {
    callCount++;
    return new Response(JSON.stringify({ error: { message: "rate limit" } }), { status: 429 });
  }, async () => {
    const response = await handleRequest(createRequest());
    const body = await response.json();
    assert(response.status === 429, `Expected 429, got ${response.status}`);
    assert(body.error.includes("OpenRouter"), "Expected an OpenRouter-specific quota message");
    assert(callCount === 1, `Quota error should not be retried, got ${callCount} calls`);
  });
});
