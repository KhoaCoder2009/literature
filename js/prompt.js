/* =========================================================================
   6. AI PROMPT BUILDER & QUESTION IMPORTER
   ========================================================================= */

const QUESTION_TYPE_LABELS = {
  mc: 'trắc nghiệm', short: 'trả lời ngắn', fill: 'điền từ', tf: 'đúng / sai'
};

function getPromptOptions() {
  const topic = $('#prompt-topic')?.value?.trim() || '';
  const sourceText = $('#prompt-source')?.value?.trim() || '';
  const questionCount = Number($('#prompt-question-count')?.value) || 5;
  const questionTypes = [...document.querySelectorAll('input[name="prompt-question-type"]:checked')].map(input => input.value);
  if (!topic) throw new Error('Vui lòng nhập chủ đề hoặc bài học (Ví dụ: Ông già và biển cả, Vợ nhặt...).');
  if (!questionTypes.length) throw new Error('Vui lòng chọn ít nhất một dạng câu hỏi.');
  return { topic, sourceText, questionCount, questionTypes };
}

function openPromptDialog() {
  if ($('#prompt-topic')) $('#prompt-topic').value = '';
  if ($('#prompt-question-count')) $('#prompt-question-count').value = '5';
  document.querySelectorAll('input[name="prompt-question-type"]').forEach(input => { input.checked = true; });
  if ($('#prompt-source')) $('#prompt-source').value = '';
  if ($('#prompt-output')) $('#prompt-output').value = '';
  if ($('#prompt-result')) $('#prompt-result').value = '';
  updatePromptSourceRequirement();
  $('#prompt-dialog')?.showModal();
  $('#prompt-topic')?.focus();
}

function updatePromptSourceRequirement() {
  const sourceText = ($('#prompt-source')?.value || '').trim();
  const sourceCharacters = Array.from(sourceText).length;
  const guidanceEl = $('#prompt-source-guidance');
  const countEl = $('#prompt-source-count');
  if (!guidanceEl || !countEl) return;

  if (sourceCharacters === 0) {
    guidanceEl.textContent = '💡 Để trống: AI sẽ tự động dùng kiến thức tác phẩm/bài học chuẩn theo SGK.';
    countEl.textContent = 'Chế độ: Tự động dùng kiến thức SGK';
    countEl.style.color = 'var(--cyan)';
  } else {
    guidanceEl.textContent = 'Đã có văn bản nguồn: AI sẽ tạo câu hỏi đọc hiểu bám sát ngữ liệu này.';
    countEl.textContent = `Độ dài văn bản: ${sourceCharacters.toLocaleString('vi-VN')} ký tự`;
    countEl.style.color = sourceCharacters >= 30 ? 'var(--green)' : 'var(--gold)';
  }
}

function openExternalAI(tool) {
  const prompt = $('#prompt-output')?.value?.trim() || '';
  if (prompt && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(prompt).catch(() => {});
  }
  let url = 'https://chatgpt.com';
  let name = 'ChatGPT';
  if (tool === 'gemini') {
    url = 'https://gemini.google.com';
    name = 'Google Gemini';
  } else if (tool === 'claude') {
    url = 'https://claude.ai';
    name = 'Claude AI';
  }
  window.open(url, '_blank');
  toast(`Đang mở ${name}! Bạn hãy dán (Ctrl + V) prompt vào ô chat.`, 'ok');
}

function buildQuestionPrompt() {
  try {
    const { topic, sourceText, questionCount, questionTypes } = getPromptOptions();
    const typePlan = Array.from({ length: questionCount }, (_, index) => questionTypes[index % questionTypes.length]);
    const hasSource = Boolean(sourceText && sourceText.length > 0);

    const typeExamples = [];
    if (questionTypes.includes('mc')) {
      typeExamples.push(`[DẠNG TRẮC NGHIỆM 4 PHƯƠNG ÁN - "type": "mc"]
{
  "type": "mc",
  "c": "Nội dung câu hỏi kiến thức / đọc hiểu rõ ràng?",
  "o": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
  "a": 0,
  "e": "Lời giải thích chi tiết, chỉ rõ căn cứ trong tác phẩm: “...”",
  "d": "Dễ"
}
* Quy tắc: "o" gồm đúng 4 phương án dạng chuỗi (KHÔNG tự viết thêm tiền tố "A.", "B.", "C.", "D."). "a" là số nguyên từ 0 đến 3 (0 là đáp án đầu tiên).`);
    }

    if (questionTypes.includes('tf')) {
      typeExamples.push(`[DẠNG ĐÚNG / SAI 4 Ý - "type": "tf"]
{
  "type": "tf",
  "c": "Phát biểu sau đây là đúng?",
  "passage": "Trích đoạn văn bản nếu cần đọc hiểu riêng (hoặc để rỗng \"\")",
  "items": [
    { "text": "Nội dung nhận định a...", "correct": true },
    { "text": "Nội dung nhận định b...", "correct": false },
    { "text": "Nội dung nhận định c...", "correct": true },
    { "text": "Nội dung nhận định d...", "correct": false }
  ],
  "e": "Phân tích cụ thể tính đúng/sai của từng nhận định a, b, c, d kèm trích dẫn: “...”",
  "d": "Trung bình"
}
* Quy tắc: "items" có đúng 4 nhận định (ý a, b, c, d). "correct" BẮT BUỘC là boolean true hoặc false.`);
    }

    if (questionTypes.includes('short')) {
      typeExamples.push(`[DẠNG TRẢ LỜI NGẮN - "type": "short"]
{
  "type": "short",
  "c": "Câu hỏi ngắn gọn yêu cầu người học tự điền đáp án ngắn (tên nhân vật, năm, sự kiện, chi tiết...)?",
  "acc": ["Đáp án chuẩn", "Cách viết khác"],
  "e": "Giải thích chi tiết kèm căn cứ bài học: “...”",
  "d": "Trung bình"
}
* Quy tắc: "acc" là mảng các cách diễn đạt đáp án đúng được chấp nhận.`);
    }

    if (questionTypes.includes('fill')) {
      typeExamples.push(`[DẠNG ĐIỀN TỪ VÀO CHỖ TRỐNG - "type": "fill"]
{
  "type": "fill",
  "c": "Câu văn trích dẫn có đúng một vị trí chỗ trống ký hiệu bằng đúng 5 dấu gạch dưới: _____ ",
  "acc": ["Từ cần điền", "Từ đồng nghĩa"],
  "e": "Giải thích chi tiết và trích dẫn nguyên văn câu gốc: “...”",
  "d": "Dễ"
}
* Quy tắc: Trong "c" bắt buộc phải có ký hiệu _____ để biểu thị vị trí cần điền.`);
    }

    const contextSection = hasSource
      ? `=== VĂN BẢN NGUỒN CĂN CỨ ===\n<source_text>\n${sourceText}\n</source_text>`
      : `=== CĂN CỨ KIẾN THỨC BÀI HỌC ===\nVì không có văn bản ngữ liệu đính kèm, bạn hãy sử dụng kiến thức chuẩn xác, chính thống về tác phẩm/chủ đề "${topic}" trong SGK Ngữ văn theo Chương trình Giáo dục phổ thông 2018 (tác giả, xuất xứ, hoàn cảnh sáng tác, cốt truyện, nhân vật, chi tiết nghệ thuật, thông điệp tư tưởng).`;

    const authenticityRule = hasSource
      ? `1. TÍNH XÁC THỰC: 100% câu hỏi và đáp án phải có căn cứ trực tiếp trong văn bản nguồn được cung cấp. Giữ đúng tên nhân vật, con số, sự kiện, không bịa đặt.`
      : `1. TÍNH CHUẨN XÁC: 100% câu hỏi và đáp án phải bám sát nội dung bài học/tác phẩm "${topic}" theo chuẩn kiến thức kỹ năng môn Ngữ văn. Không bịa đặt tình tiết.`;

    const promptText = `Bạn là một chuyên gia khảo thí và biên soạn câu hỏi kiểm tra đánh giá môn Ngữ Văn (theo Chương trình Giáo dục phổ thông mới). Hãy tạo một bộ câu hỏi ôn tập chất lượng cao về bài học dưới đây.

=== THÔNG TIN BỘ CÂU HỎI ===
- Chủ đề / Bài học: ${topic}
- Số lượng câu hỏi cần tạo: ${questionCount} câu.
- Thứ tự phân bổ dạng câu hỏi: ${typePlan.map(type => QUESTION_TYPE_LABELS[type]).join(' → ')}.

=== NGUYÊN TẮC BẮT BUỘC ===
${authenticityRule}
2. CHUẨN MỰC HỌC LIỆU: Câu hỏi rõ ràng, không tối nghĩa, không lặp ý. Độ khó "d" gồm 3 mức: "Dễ" (nhận biết), "Trung bình" (thông hiểu), "Khó" (vận dụng).
3. LỜI GIẢI THÍCH (trường "e"): Phải giải thích cặn kẽ và BẮT BUỘC có ít nhất một đoạn trích dẫn cụ thể đặt trong dấu ngoặc kép cong “...”.
4. KHÔNG TẠO CHẾ ĐỘ CHƠI: Không thêm bất kỳ trường chế độ chơi (game_mode, boss, timer, cấp độ game). Hệ thống chỉ dùng câu hỏi để vào làm bài và trả lời trực tiếp.
5. ĐỊNH DẠNG ĐẦU RA: CHỈ XUẤT RA DUY NHẤT MỘT KHỐI JSON HỢP LỆ (raw JSON), KHÔNG kèm bất kỳ văn bản chào hỏi, lời dẫn hay giải thích nào bên ngoài khối JSON.

=== QUY CHUẨN CÁC DẠNG CÂU HỎI (TRONG MẢNG "qs") ===
${typeExamples.join('\n\n')}

=== CẤU TRÚC JSON ĐẦU RA BẮT BUỘC ===
{
  "title": "Tên bộ câu hỏi ngắn gọn, trang trọng",
  "topic": ${JSON.stringify(topic)},
  "qs": [
    // Danh sách đúng ${questionCount} câu hỏi theo cấu trúc mẫu ở trên
  ]
}

${contextSection}`;

    $('#prompt-output').value = promptText;
    $('#prompt-output').focus();
    copyQuestionPrompt(true);
    toast('Đã tạo prompt chi tiết và tự động sao chép! Hãy dán sang ChatGPT / Gemini.', 'ok');
  } catch (error) {
    toast(error.message || 'Không tạo được prompt.', 'bad');
  }
}

async function copyQuestionPrompt(silent = false) {
  const prompt = $('#prompt-output')?.value || '';
  if (!prompt) return !silent && toast('Hãy tạo prompt trước khi sao chép.', 'bad');
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
      if (!silent) toast('Đã sao chép prompt thành công!', 'ok');
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch (error) {
    $('#prompt-output')?.focus();
    $('#prompt-output')?.select();
    if (!silent) toast('Prompt đã được chọn, hãy nhấn Ctrl+C để sao chép.', 'bad');
  }
}

function extractQuestionFromObj(rawObj, index) {
  if (!rawObj || typeof rawObj !== 'object') return null;
  const num = index + 1;

  // Trích xuất nội dung câu hỏi
  let c = String(
    rawObj.c || rawObj.question || rawObj.content || rawObj.text ||
    rawObj.cau_hoi || rawObj.cauHoi || rawObj.q || rawObj.de_bai || ''
  ).trim();

  // Nếu nội dung câu hỏi bị nhầm là cả khối JSON thô thì bỏ qua
  if (c.startsWith('{') && c.endsWith('}') && (c.includes('"type"') || c.includes('"qs"'))) return null;

  // Xác định dạng câu hỏi
  let rawType = String(rawObj.type || rawObj.dạng || '').toLowerCase();
  let type = 'mc';
  if (rawType === 'tf' || rawType.includes('dung') || rawType.includes('true') || Array.isArray(rawObj.items)) {
    type = 'tf';
  } else if (rawType === 'short' || rawType.includes('ngan') || rawType.includes('short')) {
    type = 'short';
  } else if (rawType === 'fill' || rawType.includes('dien') || rawType.includes('fill') || c.includes('_____')) {
    type = 'fill';
  } else {
    type = 'mc';
  }

  let e = String(
    rawObj.e || rawObj.explanation || rawObj.explain || rawObj.giai_thich ||
    rawObj.loi_giai || rawObj.huong_dan || 'Căn cứ vào kiến thức tác phẩm/bài học.'
  ).trim();

  let d = ['Dễ', 'Trung bình', 'Khó'].includes(rawObj.d || rawObj.difficulty || rawObj.do_kho)
    ? (rawObj.d || rawObj.difficulty || rawObj.do_kho)
    : 'Trung bình';

  const item = {
    id: uid(),
    type,
    c,
    e,
    d
  };

  if (type === 'mc') {
    if (!c) c = `Câu hỏi trắc nghiệm ${num}`;
    item.c = c;
    let o = Array.isArray(rawObj.o) ? rawObj.o
      : Array.isArray(rawObj.options) ? rawObj.options
      : Array.isArray(rawObj.choices) ? rawObj.choices
      : Array.isArray(rawObj.answers) ? rawObj.answers
      : Array.isArray(rawObj.phuong_an) ? rawObj.phuong_an
      : [];

    o = o.map(opt => String(opt).replace(/^[A-Da-d][\.\:\)\s]+/, '').trim()).filter(Boolean);
    while (o.length < 4) o.push(`Phương án ${'ABCD'[o.length] || (o.length + 1)}`);
    if (o.length > 4) o = o.slice(0, 4);
    item.o = o;

    let a = rawObj.a !== undefined ? rawObj.a
      : rawObj.answer !== undefined ? rawObj.answer
      : rawObj.correct !== undefined ? rawObj.correct
      : rawObj.key !== undefined ? rawObj.key
      : rawObj.dap_an_dung;

    if (typeof a === 'string') {
      const upper = a.trim().toUpperCase();
      if (upper === 'A' || upper === '0') a = 0;
      else if (upper === 'B' || upper === '1') a = 1;
      else if (upper === 'C' || upper === '2') a = 2;
      else if (upper === 'D' || upper === '3') a = 3;
      else {
        const found = o.findIndex(opt => opt.toLowerCase() === a.trim().toLowerCase());
        a = found !== -1 ? found : 0;
      }
    } else if (typeof a === 'number') {
      a = Math.min(3, Math.max(0, Math.floor(a)));
    } else {
      a = 0;
    }
    item.a = a;
  } else if (type === 'tf') {
    if (!c) c = 'Phát biểu sau đây là đúng?';
    item.c = c;
    item.passage = typeof rawObj.passage === 'string' ? rawObj.passage.trim() : '';
    let items = Array.isArray(rawObj.items) ? rawObj.items : Array.isArray(rawObj.statements) ? rawObj.statements : [];
    if (items.length) {
      item.items = items.slice(0, 4).map((it, idx) => {
        const text = String(it.text || it.statement || it.c || `Phát biểu ${'abcd'[idx]}`).trim();
        const cor = it.correct === true || it.correct === 'true' || it.correct === 'Đúng' || it.correct === 'đúng' || it.correct === 1;
        return { text, correct: cor };
      });
      while (item.items.length < 4) {
        item.items.push({ text: `Phát biểu nhận định ${'abcd'[item.items.length]}`, correct: true });
      }
    } else {
      item.items = [
        { text: 'Phát biểu nhận định a', correct: true },
        { text: 'Phát biểu nhận định b', correct: false },
        { text: 'Phát biểu nhận định c', correct: true },
        { text: 'Phát biểu nhận định d', correct: false }
      ];
    }
  } else {
    if (!c) c = type === 'fill' ? 'Điền từ thích hợp vào chỗ trống: _____' : `Câu hỏi trả lời ngắn ${num}`;
    item.c = c;
    let acc = rawObj.acc || rawObj.answers || rawObj.a || rawObj.answer;
    if (Array.isArray(acc)) {
      item.acc = acc.map(x => String(x).trim()).filter(Boolean);
    } else if (typeof acc === 'string' && acc.trim()) {
      item.acc = acc.split(/[\|,]/).map(x => x.trim()).filter(Boolean);
    } else {
      item.acc = ['đáp án'];
    }
    if (!item.acc.length) item.acc = ['đáp án'];
  }

  return item;
}

function parseQuestionsFromAnyJson(rawInput) {
  let questions = [];
  let title = '';
  let topic = '';

  let cleaned = rawInput.trim();
  const fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fence) cleaned = fence[1].trim();

  // Loại bỏ comments một dòng //... và dấu phẩy thừa
  let noComments = cleaned.replace(/(^|[^:])\/\/[^\r\n]*/g, '$1');
  let noTrailingCommas = noComments.replace(/,\s*([}\]])/g, '$1');

  let parsed = null;
  try {
    parsed = JSON.parse(noTrailingCommas);
  } catch (e1) {
    const firstBrace = noTrailingCommas.indexOf('{');
    const firstBracket = noTrailingCommas.indexOf('[');
    let sliceText = noTrailingCommas;
    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      const lastBracket = noTrailingCommas.lastIndexOf(']');
      if (lastBracket > firstBracket) sliceText = noTrailingCommas.substring(firstBracket, lastBracket + 1);
    } else if (firstBrace !== -1) {
      const lastBrace = noTrailingCommas.lastIndexOf('}');
      if (lastBrace > firstBrace) sliceText = noTrailingCommas.substring(firstBrace, lastBrace + 1);
    }
    try {
      parsed = JSON.parse(sliceText);
    } catch (e2) {
      // Tiếp tục xuống bộ bóc tách đối tượng riêng lẻ
    }
  }

  if (parsed && typeof parsed === 'object') {
    if (typeof parsed.title === 'string' && parsed.title.trim()) title = parsed.title.trim();
    if (typeof parsed.topic === 'string' && parsed.topic.trim()) topic = parsed.topic.trim();

    let rawList = null;
    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else {
      const possibleKeys = ['qs', 'questions', 'cau_hoi', 'cauHoi', 'items', 'data', 'list', 'danh_sach', 'quiz', 'de_thi'];
      for (const key of possibleKeys) {
        if (Array.isArray(parsed[key]) && parsed[key].length) {
          rawList = parsed[key];
          break;
        }
      }
      if (!rawList && (parsed.type || parsed.c || parsed.question || parsed.o || parsed.options)) {
        rawList = [parsed];
      }
    }

    if (rawList && Array.isArray(rawList)) {
      rawList.forEach((q, idx) => {
        const item = extractQuestionFromObj(q, idx);
        if (item) questions.push(item);
      });
    }
  }

  // 2. Nếu parse tổng thể không ra câu hỏi, dùng bộ đếm ngoặc nhọn để bóc tách từng JSON Object riêng biệt
  if (!questions.length) {
    const jsonChunks = [];
    let depth = 0;
    let startIdx = -1;
    let inString = false;
    let escapeNext = false;

    for (let i = 0; i < rawInput.length; i++) {
      const ch = rawInput[i];
      if (inString) {
        if (escapeNext) escapeNext = false;
        else if (ch === '\\') escapeNext = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') { inString = true; continue; }
      if (ch === '{') {
        if (depth === 0) startIdx = i;
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0 && startIdx !== -1) {
          jsonChunks.push(rawInput.substring(startIdx, i + 1));
          startIdx = -1;
        } else if (depth < 0) {
          depth = 0;
          startIdx = -1;
        }
      }
    }

    for (const chunk of jsonChunks) {
      let cleanChunk = chunk.replace(/,\s*([}\]])/g, '$1');
      try {
        const obj = JSON.parse(cleanChunk);
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj.qs) || Array.isArray(obj.questions) || Array.isArray(obj.cau_hoi)) {
            const arr = obj.qs || obj.questions || obj.cau_hoi;
            arr.forEach((q) => {
              const item = extractQuestionFromObj(q, questions.length);
              if (item) questions.push(item);
            });
            if (obj.title && !title) title = obj.title;
            if (obj.topic && !topic) topic = obj.topic;
          } else if (obj.c || obj.question || obj.type || obj.o || obj.options) {
            const item = extractQuestionFromObj(obj, questions.length);
            if (item) questions.push(item);
          }
        }
      } catch (err) {
        // Fallback: bóc tách trường bằng biểu thức chính quy (Regex) nếu JSON bị lỗi nháy kép bên trong
        const cMatch = cleanChunk.match(/"(?:c|question|content|text)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i);
        const typeMatch = cleanChunk.match(/"type"\s*:\s*"([^"]+)"/i);
        const aMatch = cleanChunk.match(/"(?:a|answer|correct|key)"\s*:\s*([0-3]|"[A-Da-d0-3]")/i);
        const optMatches = cleanChunk.match(/"(?:o|options|choices|answers)"\s*:\s*\[([\s\S]*?)\]/i);

        if (cMatch || optMatches) {
          let cVal = cMatch ? cMatch[1].replace(/\\"/g, '"').trim() : `Câu hỏi trắc nghiệm ${questions.length + 1}`;
          let oList = [];
          if (optMatches) {
            const optStrings = optMatches[1].match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
            if (optStrings) oList = optStrings.map(s => s.slice(1, -1).replace(/\\"/g, '"').trim());
          }
          while (oList.length < 4) oList.push(`Phương án ${'ABCD'[oList.length]}`);
          let aVal = aMatch ? parseInt(aMatch[1].replace(/"/g, '')) || 0 : 0;
          const fallbackItem = {
            id: uid(),
            type: typeMatch ? typeMatch[1] : 'mc',
            c: cVal,
            o: oList.slice(0, 4),
            a: Math.min(3, Math.max(0, aVal)),
            e: 'Dựa vào kiến thức bài học.',
            d: 'Trung bình'
          };
          questions.push(fallbackItem);
        }
      }
    }
  }

  return { questions, title, topic };
}

function parseRawTextQuestions(text) {
  if (!text || typeof text !== 'string') return [];
  const trimmed = text.trim();

  // Ngăn chặn tuyệt đối: Không nhận diện các văn bản là JSON hoặc code
  if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.includes('"type":') || trimmed.includes('"qs":') || trimmed.includes('"questions":')) {
    return [];
  }

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const questions = [];

  const qBlocks = [];
  let currentBlock = [];
  const isQStart = (line) => /^(?:Câu\s*\d+|Bài\s*\d+|\d+[\.\:\)])/i.test(line);

  for (const line of lines) {
    if (isQStart(line) && currentBlock.length > 0) {
      qBlocks.push(currentBlock.join('\n'));
      currentBlock = [line];
    } else {
      currentBlock.push(line);
    }
  }
  if (currentBlock.length > 0) {
    qBlocks.push(currentBlock.join('\n'));
  }

  for (const block of qBlocks) {
    const blockLines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!blockLines.length) continue;

    let questionText = blockLines[0].replace(/^(?:Câu\s*\d+[\.\:\)]*|Bài\s*\d+[\.\:\)]*|\d+[\.\:\)])\s*/i, '').trim();
    let options = [];
    let answerIndex = 0;
    let explanation = '';
    let answerText = '';
    let isTf = false;
    let tfItems = [];
    let inOptions = false;

    for (let i = 1; i < blockLines.length; i++) {
      const line = blockLines[i];

      const ansMatch = line.match(/^(?:Đáp\s*án|Key|Answer|Đ\/a)\s*[\:\.]\s*(.*)$/i);
      if (ansMatch) {
        answerText = ansMatch[1].trim();
        continue;
      }
      const expMatch = line.match(/^(?:Lời\s*giải|Giải\s*thích|Explanation|HD|Gợi\s*ý)\s*[\:\.]\s*(.*)$/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
        continue;
      }

      const tfMatch = line.match(/^([a-d])[\.\:\)]\s*(.*?)(?:[\:\-–\s]+(Đúng|Sai|True|False))?$/i);
      if (tfMatch && (/đúng/i.test(questionText) || /sai/i.test(questionText) || tfMatch[3])) {
        isTf = true;
        const stmtText = tfMatch[2].trim();
        const cor = tfMatch[3] ? /đúng|true/i.test(tfMatch[3]) : true;
        tfItems.push({ text: stmtText || `Nhận định ${tfMatch[1]}`, correct: cor });
        continue;
      }

      const optMatch = line.match(/^([A-D])[\.\:\)]\s*(.*)$/i);
      if (optMatch) {
        inOptions = true;
        options.push(optMatch[2].trim());
        continue;
      }

      if (!inOptions && !line.match(/^(?:Đáp|Lời|Giải|HD|Key)/i)) {
        questionText += ' ' + line;
      }
    }

    if (isTf && tfItems.length >= 2) {
      while (tfItems.length < 4) {
        tfItems.push({ text: `Phát biểu ${'abcd'[tfItems.length]}`, correct: false });
      }
      questions.push({
        id: uid(),
        type: 'tf',
        c: questionText || 'Phát biểu sau đây là đúng?',
        passage: '',
        items: tfItems.slice(0, 4),
        e: explanation || 'Căn cứ vào kiến thức tác phẩm.',
        d: 'Trung bình'
      });
      continue;
    }

    if (options.length >= 2) {
      while (options.length < 4) {
        options.push(`Phương án ${'ABCD'[options.length]}`);
      }
      if (options.length > 4) options = options.slice(0, 4);

      if (answerText) {
        const upper = answerText.toUpperCase().trim();
        if (['A', 'B', 'C', 'D'].includes(upper[0])) {
          answerIndex = ['A', 'B', 'C', 'D'].indexOf(upper[0]);
        } else {
          const idx = options.findIndex(opt => opt.toLowerCase() === answerText.toLowerCase());
          if (idx !== -1) answerIndex = idx;
        }
      }

      questions.push({
        id: uid(),
        type: 'mc',
        c: questionText || 'Câu hỏi trắc nghiệm',
        o: options,
        a: answerIndex,
        e: explanation || 'Căn cứ vào kiến thức tác phẩm.',
        d: 'Trung bình'
      });
      continue;
    }

    if (questionText && !questionText.startsWith('{') && !questionText.includes('"type"')) {
      const isFill = questionText.includes('_____') || /điền/i.test(questionText);
      questions.push({
        id: uid(),
        type: isFill ? 'fill' : 'short',
        c: questionText,
        acc: answerText ? [answerText] : ['đáp án'],
        e: explanation || 'Căn cứ vào kiến thức bài học.',
        d: 'Trung bình'
      });
    }
  }

  return questions;
}

function importPromptQuestionSet() {
  try {
    const rawInput = $('#prompt-result')?.value?.trim() || '';
    if (!rawInput) throw new Error('Vui lòng dán kết quả JSON hoặc văn bản câu hỏi từ AI vào ô Bước 3.');

    const defaultTopic = $('#prompt-topic')?.value?.trim() || 'Ngữ văn';
    let questions = [];
    let extractedTitle = '';
    let extractedTopic = defaultTopic;

    // 1. Thử bóc tách qua bộ đọc JSON đa năng
    const jsonResult = parseQuestionsFromAnyJson(rawInput);
    if (jsonResult && jsonResult.questions && jsonResult.questions.length) {
      questions = jsonResult.questions;
      if (jsonResult.title) extractedTitle = jsonResult.title;
      if (jsonResult.topic) extractedTopic = jsonResult.topic;
    }

    // 2. Nếu không bóc tách được từ JSON, thử bộ bóc tách văn bản thô dạng đề thi (Câu 1: A, B, C, D...)
    if (!questions.length) {
      questions = parseRawTextQuestions(rawInput);
    }

    if (!questions.length) {
      throw new Error('Không nhận diện được câu hỏi hợp lệ trong nội dung bạn vừa dán. Hãy kiểm tra lại kết quả từ AI (hỗ trợ cả JSON và văn bản trắc nghiệm Câu 1: A, B, C, D...).');
    }

    const title = extractedTitle || `${extractedTopic} - Bộ câu hỏi`;
    const topic = extractedTopic || defaultTopic;
    const set = { id: uid(), emo: '📖', title, topic, qs: questions };

    sets.unshift(set);
    save();
    $('#prompt-dialog')?.close();
    R.lib();
    go('edit', set.id);
    toast(`🎉 Đã nhập thành công bộ câu hỏi gồm ${questions.length} câu!`, 'ok');
  } catch (error) {
    toast(error.message || 'Không thể nhập dữ liệu. Vui lòng kiểm tra lại phản hồi từ AI.', 'bad');
  }
}
