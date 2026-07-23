const { COOKIE_NAME, safeEqual, createSession } = require("./_auth");

module.exports = function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.APP_USERNAME || !process.env.APP_PASSWORD || !process.env.SESSION_SECRET) {
    return res.status(503).json({ error: "Ứng dụng chưa được cấu hình tài khoản." });
  }

  const { username, password } = req.body || {};
  const valid = safeEqual(username, process.env.APP_USERNAME) &&
    safeEqual(password, process.env.APP_PASSWORD);

  if (!valid) return res.status(401).json({ error: "Thông tin đăng nhập không đúng." });

  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(createSession())}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`);
  return res.status(200).json({ ok: true });
};
