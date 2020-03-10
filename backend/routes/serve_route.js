const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get("/snowmobiles", (req, res) => {
    res.sendFile(__dirname + '/public/snowmobiles/index.html');
});

module.exports = router;
