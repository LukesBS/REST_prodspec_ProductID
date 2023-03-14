const db = require("./db.js");
const IdLenghtError = require("../exception/idLenghtError.js")
const ListToLongError = require("../exception/listToLongError.js")
const NoProductSpecFoundError = require("../exception/noProductSpecFoundError.js")

// const ProdSpec = function (ProdSpecData) {
//   this.ID = ProdSpecData.ID;
//   this.ProductID = ProdSpecData.ProductID;
//   this.spec = ProdSpecData.spec;
// };
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

// ProdSpec.findId = async (id, resultData) => {
//   const db = require("./db.js");
//   const result = await db.query(
//     " SELECT * FROM ProdSpec WHERE ProductID = ?",
//     id,
//     (err, result) => {
//       if (id.length !== 7) {
//         return resultData(
//           {
//             error_info: "REQUEST ERROR",
//             error_reason: "Ids have to be 7 characters long!",
//           },
//           null
//         );
//       } else if (result.length > 100) {
//         return resultData(
//           {
//             error_info: "REQUEST ERROR",
//             error_reason: "Too many results!",
//           },
//           null
//         );
//       } else {
//         let array = Array();
//         array = result.map((result) => {
//           return new ProdSpec({ ...result });
//         });
//         console.log("Data retrieved from DB");
//         //console.log(array);
//         return resultData(null, array);
//       }
//     }
//   );
// };

module.exports = findById;
