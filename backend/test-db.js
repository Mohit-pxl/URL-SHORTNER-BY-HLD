// require("dotenv").config();

// const { getNextUrlId } = require("./src/repositories/url.repositories");

// async function test() {
//     const id = await getNextUrlId();

//     console.log("Generated ID:", id);
// }

// test();

require("dotenv").config();

const { generateShortCode } = require("./src/services/url.service");

async function test() {
    const shortCode = await generateShortCode();

    console.log("Generated short code:", shortCode);
}

test();