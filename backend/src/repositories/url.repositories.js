const {pool} = require("../config/db");

async function getNextUrlId(){
    const result = await pool.query(
        "SELECT nextval('urls_id_seq') AS id"

    );
    return result.rows[0].id;
}

async function createUrl(id, shortCode, longUrl, expiresAt){
    const result= await pool.query(
          `
        INSERT INTO urls (id, short_code, long_url, expires_at)
        VALUES ($1, $2, $3, $4)
        RETURNING id, short_code, long_url, created_at, expires_at
        `,
        [id, shortCode, longUrl, expiresAt]
    );

    return result.rows[0];
}

async function getUrlByShortCode(shortCode) {
    const result = await pool.query(
        `
        SELECT id, short_code, long_url, created_at, expires_at
        FROM urls
        WHERE short_code = $1
        `,
        [shortCode]
    );

    return result.rows[0];
}

module.exports={
    getNextUrlId,
    createUrl,
    getUrlByShortCode
}