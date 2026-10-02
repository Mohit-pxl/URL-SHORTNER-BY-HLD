const BASE62_CHARACTERS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(number) {
    if (typeof number !== "bigint" || number < 0n) {
        throw new Error("Input must be a non-negative BigInt");
    }

    if (number === 0n) {
        return "0";
    }

    let result = "";

    while (number > 0n) {
        const remainder = number % 62n;

        result = BASE62_CHARACTERS[Number(remainder)] + result;

        number = number / 62n;
    }

    return result;
}

module.exports = {
    encodeBase62
};