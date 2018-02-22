var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
      {
        name: "Tuomas"
      },
      {
        name: "Erkki"
      }
    ]);
});

module.exports = router;
