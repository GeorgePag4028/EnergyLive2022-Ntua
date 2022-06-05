

/*var fs = require('fs');
var files1 = fs.readdirSync('./csvtest/');
const filePath = './csvtest/';

const fsPromises = require("fs/promises");

const deleteFile = async (filePath) => {
  try {
    await fsPromises.unlink(filePath);
    console.log(files1[0]+' Successfully removed file!');
  } catch (err) {
    console.log(err);
  }
};
console.log(files1[0]);
for (let i = 0; i < files1.length; i++) {
  if(files1[i].charAt(0)=="2"){
    deleteFile(filePath+files1[i]);
  }
}
// Try i
//deleteFile(filePath);
let actualTotalLoad = [];
const options = {
  // objectMode: true,
  delimiter: "\t",
  // quote: null,
  headers: true,
  // renameHeaders: false,
};
const fs = require("fs");
const csv = require("fast-csv");

//file here
const Client = require('ssh2-sftp-client');
let sftp = new Client();
let remotePath = '/TP_export/ActualTotalLoad_6.1.A/2018_12_ActualTotalLoad_6.1.A.csv';
let path = './csvtest/2018_12_ActualTotalLoad_6.1.A.csv';
let localPath = path;

sftp.connect({
  host: "sftp-transparency.entsoe.eu",
  user: "antonyts1717@gmail.com",
  password: "1234567890-=1234a",
  port:22
}).then(() => {
  sftp.fastGet(remotePath, localPath);
  
}).then( _ => {
console.log('Data uploaded successfully');
}).then( _ => {
setTimeout(()=>{
  fs.createReadStream(path)
      .pipe(csv.parse(options))
      // csv.parseFile(path,{headers: true})
      .on("data", data => {
      actualTotalLoad.push(data);
      })
      .on("end", () => {
      console.log(actualTotalLoad.length);})
},5000);
}).then( _ => {
  console.log(actualTotalLoad.length+"asdasd");
})*/
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
//    port:8080,
  logging : false, 
});

const { QueryTypes } = require('sequelize');
const users =  sequelize.query("SELECT * FROM `actualTotalLoad`", { type: QueryTypes.SELECT });
console.log(users[0]);
