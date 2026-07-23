const crypto = require("crypto");

const COOKIE_NAME = "sat_hach_session";

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function sign(value) {
  return crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "")
    .update(value)
    .digest("hex");
}

function createSession() {
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  const value = String(expires);
  return `${value}.${sign(value)}`;
}

function verifySession(cookieHeader = "") {
  if (!process.env.SESSION_SECRET) return false;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;
  const [expires, signature] = decodeURIComponent(match[1]).split(".");
  return Number(expires) > Date.now() && safeEqual(signature, sign(expires));
}

module.exports = { COOKIE_NAME, safeEqual, createSession, verifySession };
