const ActualTotalLoad = require("../../models/ActualTotalLoad");
const fs = require("fs");
const csv = require("fast-csv");

// const uploadActualTotalLoad = aync (req, res)=>{
//     console.log("fucl")
//     console.log(req.test)
// };
const uploadActualTotalLoad = async (req, res) => {
  console.log(req.body)
  try {
    // if (req.file == undefined) {
    //   return res.status(400).send("Please upload a CSV file!");
    // }
    let actualTotalLoad = [];
    let path = "./csvtest/" + "2014_12_ActualTotalLoad_6.1.A.csv"
    // let path = __basedir + "/csvtest/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        actualTotalLoad.push(row);
      })
      .on("end", () => {
        ActualTotalLoad.bulkCreate(actualTotalLoad)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getActualTotalLoad = (req, res) => {
  ActualTotalLoad.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving actualTotalLoad.",
      });
    });
};
module.exports = {
  uploadActualTotalLoad,
  getActualTotalLoad,
};