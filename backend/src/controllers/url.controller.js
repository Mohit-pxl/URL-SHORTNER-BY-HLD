const { createShortUrl, getLongUrl } = require("../services/url.service");
const { createUrlSchema } = require("../utils/validation");

async function createUrl(req, res) {
  const result = createUrlSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: result.error.issues,
    });
  }

  const { longUrl, customCode, expiresAt } = result.data;

  const url = await createShortUrl(longUrl, customCode, expiresAt);

  res.status(201).json({
    shortCode: url.short_code,
    shorturl: `http://localhost:5000/${url.short_code}`,
  });
}

async function redirectToLongUrl(req, res) {
  const { shortCode } = req.params;

  const result = await getLongUrl(shortCode);

  if (!result) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }

  if (result.expired) {
    return res.status(410).json({
      message: "Short URL has expired",
    });
  }

  res.redirect(result.longUrl);
}

module.exports = {
  createUrl,
  redirectToLongUrl,
};
