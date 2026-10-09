const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    return jsonResponse({ error: "Gemini API key is not configured on the server" }, 500);
  }

  let topic: unknown;
  try {
    ({ topic } = await request.json());
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON" }, 400);
  }
  if (typeof topic !== "string" || !topic.trim() || topic.length > 500) {
    return jsonResponse({ error: "Topic must contain 1 to 500 characters" }, 400);
  }

  const model = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
  const systemInstruction = 'Bạn là giáo viên Ngữ Văn. Tạo từ 4 đến 8 câu hỏi trắc nghiệm bằng tiếng Việt. Chỉ trả về JSON theo schema: {"title":"...","topic":"...","qs":[{"type":"mc","c":"...","o":["...","...","...","..."],"a":0,"e":"...","d":"Dễ"}]}. Mỗi câu phải có đúng 4 phương án, a là chỉ số đáp án đúng từ 0 đến 3, d là một trong "Dễ", "Trung bình", "Khó".';

  let providerResponse: Response;
  try {
    providerResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: `Tạo bộ câu hỏi theo chủ đề: ${topic.trim()}.` }] }],
          generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
        }),
      },
    );
  } catch (error) {
    console.error("Gemini request failed", error);
    return jsonResponse({ error: "Could not connect to Gemini" }, 502);
  }

  if (!providerResponse.ok) {
    console.error("Gemini returned status", providerResponse.status);
    return jsonResponse({ error: `Gemini request failed (${providerResponse.status})` }, 502);
  }

  let providerData: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  try {
    providerData = await providerResponse.json();
  } catch (error) {
    console.error("Gemini returned invalid JSON", error);
    return jsonResponse({ error: "Gemini returned an invalid response" }, 502);
  }

  const content = providerData.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  if (!content) {
    return jsonResponse({ error: "Gemini returned no question data" }, 502);
  }

  let generated: { title?: unknown; topic?: unknown; qs?: unknown };
  try {
    generated = JSON.parse(content);
  } catch (error) {
    console.error("Gemini returned invalid question JSON", error);
    return jsonResponse({ error: "Gemini returned question data in an invalid format" }, 502);
  }

  if (
    typeof generated.title !== "string" ||
    !Array.isArray(generated.qs) ||
    generated.qs.length < 4 ||
    generated.qs.length > 8 ||
    !generated.qs.every((question) =>
      question &&
      question.type === "mc" &&
      typeof question.c === "string" &&
      Array.isArray(question.o) &&
      question.o.length === 4 &&
      question.o.every((option: unknown) => typeof option === "string") &&
      Number.isInteger(question.a) &&
      question.a >= 0 &&
      question.a < 4
    )
  ) {
    return jsonResponse({ error: "Gemini returned questions in an invalid format" }, 502);
  }

  return jsonResponse({
    title: generated.title,
    topic: typeof generated.topic === "string" ? generated.topic : topic.trim(),
    qs: generated.qs.map((question) => ({ ...question, id: crypto.randomUUID() })),
  });
});
