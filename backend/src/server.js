require("dotenv").config();
const express=require('express');
const {redisClient,isRedisAvailable} = require("./config/redis");
const { connectDB } = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const pinoHttp = require("pino-http");
const logger = require("./config/logger");

const {pool}=require("./config/db");
const urlRoutes = require("./routes/url.routes");
const redirectRoutes = require("./routes/redirect.routes");
const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/not-found.middleware");

const app=express();

app.use(
    pinoHttp({
        logger,

        serializers: {
            req: () => undefined,
            res: () => undefined
        },

        customSuccessMessage: function (req, res) {
            return `${req.method} ${req.url} -> ${res.statusCode}`;
        }
    })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:100,
    standardHeaders: true,
    legacyHeaders: false
})

const PORT=process.env.PORT || 5000;

app.use("/api/v1/urls",apiLimiter,urlRoutes);


app.get("/",(req,res)=>{
    res.json({
        meassage:"URL shortner api is running"
    })
});


app.get("/health/db", async (req, res) => {
    const result = await pool.query("SELECT * FROM urls");

    res.json(result.rows);
});

app.use("/",redirectRoutes);

app.use(notFound);
app.use(errorHandler);




async function startServer() {
    try {
        await connectDB();
         try {
            await redisClient.connect();
            console.log("Redis connected");
        } catch (error) {
            console.error("Redis unavailable. Starting without Redis cache.");
        }

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Application startup failed:", error);
        process.exit(1);
    }
}

startServer();
