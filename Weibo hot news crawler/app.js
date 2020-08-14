
var Koa=require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path');
var app=new Koa();
const fs = require("fs");
const cheerio = require("cheerio");
const superagent = require("superagent");
var hotSearchData=require('./hotSearch.json')
// set url

const weiboURL = "https://s.weibo.com";
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot";


function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) reject("request error");
      const $ = cheerio.load(res.text);
      let hotList = [];
      $("#pl_top_realtimehot table tbody tr").each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find("a").attr("href");
          const text = $td.find("a").text();
          const hotValue = $td.find("span").text();
          const icon = $td.find("img").attr("src")
            ? "https:" + $td.find("img").attr("src")
            : "";
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          });
        }
      });
      hotList.length ? resolve(hotList) : reject("error");
    });
  });
}
// rewrite files
let number=0;
setInterval( async ()=>{
  try {
    var hotList = await getHotSearchList();
    await fs.writeFile( `${__dirname}/hotSearch.json`, JSON.stringify(hotList),  "utf-8", function (err) {
      if (err) {
          console.log('Rewrite Failed',err);
      } else {
        number++;
        console.log('Pulled Times : '+ number );
        console.log('Rewrite Successfully'); 
        return;
      }
    });
  } catch (error) {
    console.error(error);
  }
},10000);

//configure art-template
render(app, {
    root: path.join(__dirname, 'views'),   
    extname: '.html',  // suffix
    debug: process.env.NODE_ENV !== 'production'  

});

setInterval(()=>{fs.readFile(`${__dirname}/hotSearch.json`,"utf-8",function(err, data){
  if(err) throw err;
  // console.log(data)
  hotSearchData= JSON.parse(data);
})},1000);

router.get('/',async (ctx)=>{
    await ctx.render('index',{
        list:hotSearchData
    })
})

app.use(router.routes());   
app.use(router.allowedMethods());
app.listen(3000,console.log('listening'));






