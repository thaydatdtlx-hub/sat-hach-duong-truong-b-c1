const fs = require("fs");
const path = require("path");
const { verifySession } = require("./_auth");

module.exports = function handler(req, res) {
  const authenticated = verifySession(req.headers.cookie || "");
  const file = authenticated ? "app.html" : "login.html";
  const html = fs.readFileSync(path.join(process.cwd(), "views", file), "utf8");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).send(html);
};
