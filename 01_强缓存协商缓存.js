const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// // // 解决跨域
// app.all("*",function(req,res,next){
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin","*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers","content-type");
//   //跨域允许的请求方式
//   res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method.toLowerCase() == 'options')
//     res.send(200);  //让options尝试请求快速结束
//   else
//     next();
// });


/**
 *  强缓存
 *  @title 设置缓存 (在HTTP/1.0)
 *  @private 在服务器设置了private比如Cache-Control: private , max-age=60的情况下，表示只有用户的浏览器可以缓存private响应，不允许任何中继Web代理对其进行缓存
 *  @public 如果设置了public，表示该响应可以再浏览器或者任何中继的Web代理中缓存，public是默认值，即Cache-Control: max-age=60等同于Cache-Control: public , max-age=60。
 *  @Expires Expires 表示存在时间，允许客户端在这个时间之前不去检查（发请求），等同max-age的效果 但是如果同时存在，则被Cache-Control的max-age覆盖。
 *  f5刷新不走强缓存

  */
app.get('/*.css', function(req, res) {

  res.setHeader('expires', new Date(Date.now() + 3 * 60 * 1000).toString());
  // res.setHeader('Cache-Control', 'private,max-age=' + 1000 * 60 * 60);
  const pathfile = path.join(__dirname, './public/style.css');
  fs.readFile(pathfile, (error, content) => {
      res.end(content);
  })
});

/**
 * 协商缓存
 * 
 * 协商缓存(协商缓存由于需要向服务器发送一次请求，所以相比于强缓存来收收益更低，缓存资源体积越大，收益越高。)
 * 
 * 协商缓存中那几个首部字段是配对使用的.
 * 请求头 if-modified-since(自从某某时间有没有修改过HTTP 1.0 )	响应头 last-modified(最后修改的时间为某某时间HTTP 1.0 )
 * 请求头 if-none-match(HTTP 1.1 )	                        响应头 etag(HTTP 1.1 )
 * 
 */
// app.get('/*.css', function(req, res) {
//   const pathfile = path.join(__dirname, './public/style.css');
//   // 获取文件信息
//   const ifModifiedSince = req.headers['if-modified-since'];
//   fs.stat(pathfile, (err, stat) => {
//       if (ifModifiedSince === stat.mtime.toUTCString()) {
//           res.writeHead("304", 'no modified')
//           res.end();
//       } else {
//           fs.readFile(pathfile, (error, content) => {
//               res.setHeader('Last-Modified', stat.mtime.toUTCString());
//               res.end(content);
//           });
//       }

//   })

// });


app.listen(5000, "localhost", (err) => {
  if (!err){
  	console.log("服务器启动成功")
  	console.log("访问：http://localhost:5000/")
  } 
  else console.log(err);
})
