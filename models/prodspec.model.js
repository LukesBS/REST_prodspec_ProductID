const ProdSpec = function (ProdSpecData) {
  this.ID = ProdSpecData.ID;
  this.ProductID = ProdSpecData.ProductID;
  this.spec = ProdSpecData.spec;
};

ProdSpec.findId = async (id, resultData) => {
  const db = require("./db.js");
  const result = await db.query(
    " SELECT * FROM ProdSpec WHERE ProductID = ?",
    id,
    (err, result) => {
      if (id.length !== 7) {
        return resultData(
          {
            error_info: "REQUEST ERROR",
            error_reason: "Ids have to be 7 characters long!",
          },
          null
        );
      } else if (result.length > 100) {
        return resultData(
          {
            error_info: "REQUEST ERROR",
            error_reason: "Too many results!",
          },
          null
        );
      } else {
        let array = Array();
        array = result.map((result) => {
          return new ProdSpec({ ...result });
        });
        console.log("Data retrieved from DB");
        //console.log(array);
        return resultData(null, array);
      }
    }
  );
};

module.exports = ProdSpec;
