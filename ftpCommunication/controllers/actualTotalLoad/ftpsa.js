/*'use strict';

const ftp = require('basic-ftp');
const fs = require('fs');

class FTPClient {
    constructor(host = 'sftp-transparency.entsoe.eu', port = 22, username = 'antonyts1717@gmail.com', password = '1234567890-=1234a', secure = false) {
        this.client = new ftp.Client();
        this.settings = {
            host: host,
            port: port,
            user: username,
            password: password,
            secure: secure
        };
    }

    upload(sourcePath, remotePath, permissions) {
        let self = this;
        (async () => {
            try {
                let access = await self.client.access(self.settings);
                let upload = await self.client.upload(fs.createReadStream(sourcePath), remotePath);
                let permissions = await self.changePermissions(permissions.toString(), remotePath);
            } catch(err) {
                console.log(err);
            }
            self.client.close();
        })();
    }

    close() {
        this.client.close();
    }

    changePermissions(perms, filepath) {
        let cmd = 'SITE CHMOD ' + perms + ' ' + filepath;
        return this.client.send(cmd, false);
    }
}


  const ftp = require("basic-ftp")

  example()
  sftp://antonyts1717%2540gmail.com@sftp-transparency.entsoe.eu/TP_export/ActualTotalLoad_6.1.A/2014_12_ActualTotalLoad_6.1.A.csv
  async function example() {

      const client = new ftp.Client()
      client.ftp.verbose = true
      console.log("A")
      try {
        console.log("B")
        await client.access({
            host: "sftp-transparency.entsoe.eu",
            user: "antonyts1717@gmail.com",
            password: "1234567890-=1234a",
            port:22,
            secure: true
          })
          console.log("List")
          console.log(await client.list())
      }
      catch(err) {
        console.log("No")
        console.log(err)
      }
      client.close()
  }
*/
const Client = require('ssh2-sftp-client');
let sftp = new Client();
let remotePath = '/TP_export/ActualTotalLoad_6.1.A/2021_09_ActualTotalLoad_6.1.A.csv';
let localPath = './csvtest/2021_09_ActualTotalLoad_6.1.A.csv';
sftp.connect({
    host: "sftp-transparency.entsoe.eu",
    user: "antonyts1717@gmail.com",
    password: "1234567890-=1234a",
    port:22
}).then(() => {
    sftp.fastGet(remotePath, localPath);
    //return sftp.list('/TP_export/ActualTotalLoad_6.1.A/');
}).then( _ => {
  console.log('Data uploaded successfully');
}).catch(err => {
  console.log(err, 'catch error');
});

/*const Client = require('ssh2-sftp-client');
let client = new Client();
let remotePath = '/TP_export/ActualTotalLoad_6.1.A/2021_08_ActualTotalLoad_6.1.A.csv';
let localPath = './csvtest/2022_05_ActualTotalLoad_6.1.A.csv';

client.connect({
    host: "sftp-transparency.entsoe.eu",
    user: "antonyts1717@gmail.com",
    password: "1234567890-=1234a",
    port:22
}).then(() => {
    client.fastGet(remotePath, localPath);
  })
  .then(() => {
    client.end();
  })
  .catch(err => {
    console.error(err.message);
  });*/