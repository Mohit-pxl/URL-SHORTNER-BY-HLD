const express = require("express");

const {createUrl}= require("../controllers/url.controller");
const asyncHandler = require("../utils/asyncHandler");

const router=express.Router();

router.post("/",asyncHandler(createUrl));


module.exports= router;