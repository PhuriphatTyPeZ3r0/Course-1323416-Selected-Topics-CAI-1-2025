const express = require('express')
const app = express()

let fs = require('fs');

// เขียนไฟล์ 1
fs.writeFile('demofile1.txt', 'test content', 'utf8', (err) => {
   if (!err) console.log('write1 complete!!');
   else console.log('write1 NOT complete!!');
});

// เขียนไฟล์ 2
fs.writeFile('demofile2.txt', 'test content', 'utf8', (err) => {
   if (!err) console.log('write2 complete!!');
   else console.log('write2 NOT complete!!');
});

// อ่านไฟล์ด้วย callback แบบลำดับ
fs.readFile('demofile1.txt', 'utf8', (err, data1) => {
   if (err) return console.error("read1 error:", err);
   console.log("demo file 1:", data1);

fs.readFile('demofile2.txt', 'utf8', (err, data2) => {
   if (err) return console.error("read2 error:", err);
   console.log("demo file 2:", data2);
      });
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/aboutme',  (req, res) => {
   res.send('Gu HumYai')
});

app.get('/myname', (req, res) => {
    res.send('Phuriphat Hemakul');
});

app.listen(3000, () => {
   console.log("Server started on port 3000 !");
});
