const db = require("./db.js");
const IdLenghtError = require("../exception/idLenghtError.js")
const ListToLongError = require("../exception/listToLongError.js")
const NoProductSpecFoundError = require("../exception/noProductSpecFoundError.js")

class ProdSpec {
  constructor(prodSpecData) {
    this.ID = prodSpecData.ID;
    this.ProductID = prodSpecData.ProductID;
    this.spec = prodSpecData.spec;
  }
}

async function findById(id) {
  try {
    let resultArray = [];

    if (id.length !== 7){
      throw new IdLenghtError()
    }

    resultArray = await getProdSpecById(id)

    if (resultArray.length === 0){
      throw new NoProductSpecFoundError()
    }

    if (resultArray.length > 100){
      throw new ListToLongError()
    }

    return resultArray;
  } catch (error) {
    throw error
  }
}

async function getProdSpecById(id) {
  return new Promise((resolve, reject)  => {
    db.query(
      "SELECT * FROM ProdSpec WHERE ProductID = ?",
      [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}
module.exports = findById;
