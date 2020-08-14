var http = require('http');
const https = require('https')   
var cheerio = require('cheerio');

var url = 'https://www.uottawa.ca/en';

function filterHtml(html) {
    var $ = cheerio.load(html);
    var arcList =0;
    var aPost = $("body").find("div");
    aPost.each(function () {
        var ele = $(this);
        if(ele.find("div")){
          arcList++;
        }
      });  
      return arcList;
}

https.get(url, function (res) {
    var html = '';
    var arcList = [];
    // var arcInfo = {};
    res.on('data', function (chunk) {
        html += chunk;
    });
    res.on('end', function () {
        arcList = filterHtml( html ); 
        console.log( arcList );
    });
});