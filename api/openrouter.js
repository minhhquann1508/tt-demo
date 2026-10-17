// Vercel Serverless Function: proxy tới OpenRouter, giữ key ở phía máy chủ.
// Cấu hình: Vercel → Project → Settings → Environment Variables → OPENROUTER_API_KEY = <key của bạn>, rồi Redeploy.
// GET  /api/openrouter  → {ok, hasKey} để app biết máy chủ đã có key chưa.
// POST /api/openrouter  {body} → chuyển sang https://openrouter.ai/api/v1/chat/completions.
const MAX_BYTES = 4 * 1024 * 1024; // ảnh đã được app thu nhỏ trước khi gửi
const MODEL = /^[\w.-]+\/[\w.:-]+$/;

export default async function handler(req, res) {
  const key = process.env.OPENROUTER_API_KEY;
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ ok: true, hasKey: !!key });
  if (req.method !== 'POST') return res.status(405).json({ error: { message: 'Method not allowed' } });
  if (!key) return res.status(503).json({ error: { message: 'OPENROUTER_API_KEY is not configured on the server' } });

  // Chỉ nhận request từ chính trang demo (chặn site khác dùng ké credit)
  const origin = req.headers.origin || req.headers.referer || '';
  try { if (origin && new URL(origin).host !== req.headers.host) return res.status(403).json({ error: { message: 'Forbidden origin' } }); }
  catch { return res.status(403).json({ error: { message: 'Forbidden origin' } }); }

  const { body } = req.body || {};
  const models = body && (body.models || (body.model ? [body.model] : []));
  if (!body || !Array.isArray(body.messages) || !models.length || !models.every(m => MODEL.test(m)))
    return res.status(400).json({ error: { message: 'Invalid request' } });
  if (JSON.stringify(body).length > MAX_BYTES) return res.status(413).json({ error: { message: 'Payload too large' } });

  // chỉ chuyển các trường app dùng tới
  const out = { messages: body.messages };
  if (body.model) out.model = body.model;
  if (body.models) out.models = body.models.slice(0, 3);
  if (body.modalities) out.modalities = body.modalities;
  if (typeof body.temperature === 'number') out.temperature = body.temperature;

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${key}`, 'HTTP-Referer': `https://${req.headers.host}`, 'X-Title': 'T&T demo' },
      body: JSON.stringify(out),
    });
    res.status(r.status).setHeader('content-type', 'application/json').send(await r.text());
  } catch (e) {
    res.status(502).json({ error: { message: 'Upstream error: ' + (e.message || e) } });
  }
}
