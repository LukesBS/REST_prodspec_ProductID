const express = require("express");
const router = express.Router();
const findById = require("../models/prodspec.model.js");
const IdLenghtError = require("../exception/idLenghtError.js")
const ListToLongError = require("../exception/listToLongError.js")
const NoProductSpecFoundError = require("../exception/noProductSpecFoundError.js")


router.get("/:num1", async (req, res) => {
  try {
    const result = await findById(req.params.num1);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof IdLenghtError || error instanceof ListToLongError || error instanceof NoProductSpecFoundError){
      res.status(404).send({ replyInfo: "request error"})
    }else{
      res.status(500).send({ replyInfo: "technical error" });
    }
  }
});

module.exports = router;
