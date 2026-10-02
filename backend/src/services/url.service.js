const {
    getNextUrlId,
    createUrl,
    getUrlByShortCode
} = require("../repositories/url.repositories");
const {getCachedUrl,cacheUrl} = require("../repositories/cache.repositories");

const { encodeBase62 } = require("../utils/base62");

async function createShortUrl(longUrl, customCode, expiresAt) {
    const id = await getNextUrlId();

    const shortCode = customCode || encodeBase62(BigInt(id));

    const url = await createUrl(
        id,
        shortCode,
        longUrl,
        expiresAt
    );

    return url;
}

async function getLongUrl(shortCode) {
    const cachedLongUrl = await getCachedUrl(shortCode);

    if (cachedLongUrl) {
        return {
            longUrl: cachedLongUrl,
            expired: false
        };
    }

    const url = await getUrlByShortCode(shortCode);

    if (!url) {
        return null;
    }

    // Check expiration
    if (url.expires_at && new Date(url.expires_at) <= new Date()) {
        return {
            longUrl: null,
            expired: true
        };
    }

    await cacheUrl(
        shortCode,
        url.long_url,
        url.expires_at
    );

    return {
        longUrl: url.long_url,
        expired: false
    };
}
module.exports = {
    createShortUrl,
    getLongUrl
};