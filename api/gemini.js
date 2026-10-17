// Vercel Serverless Function: proxy tới Google Gemini API, giữ key ở phía máy chủ.
// Cấu hình: Vercel → Project → Settings → Environment Variables → GEMINI_API_KEY = <key của bạn>, rồi Redeploy.
// GET  /api/gemini  → {ok, hasKey} để app biết máy chủ đã có key chưa.
// POST /api/gemini  {model, body} → chuyển nguyên body sang models/{model}:generateContent.
const MAX_BYTES = 4 * 1024 * 1024; // ảnh đã được app thu nhỏ trước khi gửi

export default async function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ ok: true, hasKey: !!key });
  if (req.method !== 'POST') return res.status(405).json({ error: { message: 'Method not allowed' } });
  if (!key) return res.status(503).json({ error: { message: 'GEMINI_API_KEY is not configured on the server' } });

  // Chỉ nhận request từ chính trang demo (chặn site khác dùng ké quota)
  const origin = req.headers.origin || req.headers.referer || '';
  try { if (origin && new URL(origin).host !== req.headers.host) return res.status(403).json({ error: { message: 'Forbidden origin' } }); }
  catch { return res.status(403).json({ error: { message: 'Forbidden origin' } }); }

  const { model, body } = req.body || {};
  if (!/^gemini-[\w.-]+$/.test(model || '') || !body || !Array.isArray(body.contents))
    return res.status(400).json({ error: { message: 'Invalid request' } });
  if (JSON.stringify(body).length > MAX_BYTES) return res.status(413).json({ error: { message: 'Payload too large' } });

  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: body.contents, generationConfig: body.generationConfig || {} }),
    });
    res.status(r.status).setHeader('content-type', 'application/json').send(await r.text());
  } catch (e) {
    res.status(502).json({ error: { message: 'Upstream error: ' + (e.message || e) } });
  }
}
