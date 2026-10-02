const express = require("express");
const asyncHandler = require("../utils/asyncHandler");

const {
    redirectToLongUrl
} = require("../controllers/url.controller");

const router = express.Router();

router.get("/:shortCode", asyncHandler(redirectToLongUrl));

module.exports = router;