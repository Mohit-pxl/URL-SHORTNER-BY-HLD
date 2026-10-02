const {redisClient,isRedisAvailable} = require("../config/redis");

async function getCachedUrl(shortCode) {
      if (!isRedisAvailable()) {
        return null;
    }

    try {
        return await redisClient.get(shortCode);
    } catch (error) {
        console.error("Redis GET failed:", error);
        return null;
    }
}
async function cacheUrl(shortCode, longUrl, expiresAt) {
    if (!isRedisAvailable()) {
        return;
    }

    try {
        if (expiresAt) {
            const ttl = Math.floor(
                (new Date(expiresAt).getTime() - Date.now()) / 1000
            );

            if (ttl <= 0) {
                return;
            }

            await redisClient.set(shortCode, longUrl, {
                EX: ttl
            });

            return;
        }

        await redisClient.set(shortCode, longUrl, {
            EX: 3600
        });

    } catch (error) {
        console.error("Redis SET failed:", error.message);
    }
}

async function deleteCachedUrl(shortCode) {
     if (!isRedisAvailable()) {
        return null;
    }
    try {
        await redisClient.del(shortCode);
    } catch (error) {
        console.error("Redis DELETE failed:", error);
    }
}

module.exports = {
    getCachedUrl,
    cacheUrl,
    deleteCachedUrl
};