const express = require("express");
const router = express.Router();
const ProdSpec = require("../models/prodspec.model.js");

router.get("/:num1", async (req, res, next) => {
  await ProdSpec.findId(req.params.num1, (err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err || "Some error occurred while retrieving data.",
      });
      res.end();
    } else {
      console.log(data);
      res.send(data);
    }
    res.end();
  });
});

module.exports = router;
