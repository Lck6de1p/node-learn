const express = require('express');
const app = express();


app.get('/', (req,res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-Length', 10)  // helloworld
  // res.setHeader('Content-Length', 8)   // hellowor
  // res.setHeader('Content-Length', 12)    //无法访问
  res.end('helloworld')
})


app.get('/chunk', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.setHeader('Content-Length', 10);
  res.setHeader('Transfer-Encoding', 'chunked'); // 设置chunk后 Content-Length被忽略

  res.write("<p>来啦</p>");
    setTimeout(() => {
      res.write("第一次传输<br/>");
    }, 1000);
    setTimeout(() => {
      res.write("第二次传输");
      res.end()
    }, 2000);
})










app.listen(5000, "localhost", (err) => {
  if (!err){
  	console.log("服务器启动成功")
  	console.log("访问：http://localhost:5000/")
  } 
  else console.log(err);
})