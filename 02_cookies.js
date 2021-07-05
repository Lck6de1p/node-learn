const express=require("express");
const cookieParser=require("cookie-parser");
 
var app=express();
 
//设置中间件
app.use(cookieParser());
 
app.get("/",function(req,res){
    res.send("首页");
});
 
/**
 * cookie大小 4kb， 谷歌浏览器最大cookies数为163个
 * expire： 过期时间 ，在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT。
 * maxAge： 最大失效时间，设置在多少后失效
 * secure, 默认为false，当他为true的时候只有在https中才生效
 * httpOnly: 通过程序（JS 脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击的产生 。
 * singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值。

 */

//设置cookie
app.get("/set",function(req,res){
    for (let i = 0; i < 1000; i++) {
      res.cookie("userName" + i,'张三' + i,{maxAge: 20000, httpOnly: true});
    }
    
    res.send("设置cookie成功");
});
 
//获取cookie
app.get("/get",function(req,res){
    res.send("获取cookie成功，cookie为："+ res.cookies);
});

app.listen(5000, "localhost", (err) => {
  if (!err){
  	console.log("服务器启动成功")
  	console.log("访问：http://localhost:5000/")
  } 
  else console.log(err);
})