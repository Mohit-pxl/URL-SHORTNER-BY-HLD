const { createClient } = require("redis");

const redisClient = createClient({
    url: "redis://localhost:6379",

    socket: {
        reconnectStrategy: false
    }
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
});

function isRedisAvailable() {
    return redisClient.isOpen && redisClient.isReady;
}

module.exports = {
    redisClient,
    isRedisAvailable
};