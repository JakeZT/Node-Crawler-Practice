const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require("fs");
// const fetchedData=require('./fetchedData.json')
let currentPage = 1
let thisPage=1
let maxPage;
let driver = new Builder().forBrowser('chrome').build();
(async function autoSearching() {
    await driver.get('http://www.google.com');
    await driver.findElement(By.css('.gLFyf')).sendKeys('拉勾网', Key.RETURN);
/*
    let auto= await driver.findElements(By.css('.g'))
    let findResult=[];
    for(let i = 0; i < auto.length; i++) {
      let autoH3=auto[i]
      let title = await driver.findElement(By.css('.DKV0Md')).getText()
      findResult.push(title)
    }
*/
        let findResult=[];
          let title = await driver.findElement(By.css('.DKV0Md')).getText()
          findResult.push(title)
        
    // console.log('Result is'+findResult);
    for(let i = 0; i < findResult.length; i++){
      searchResult=findResult[i];
      if(searchResult==="拉勾网"){
        await driver.findElement(By.css(`.g:nth-of-type(${i+1}) .DKV0Md`)).click();
      }
    }
    await driver.findElement(By.css('#changeCityBox ul.clearfix > li:nth-of-type(8)')).click();
    await driver.findElement(By.css('#search_input')).sendKeys('前端', Key.RETURN);
    maxPage = await driver.findElement(By.className('totalNum')).getText()
    pullData();
})();



async function pullData() {
  console.log(`Fetching data of page-${currentPage}, Total--${maxPage}pages`)
  while (true) {
    let noError = true;
    try {
      let items = await driver.findElements(By.css('.item_con_list .con_list_item'))
      let data ={}
      // Iterate over the array to get the required data
      for (let i =0; i < items.length; i++) {
        let item = items[i];
        // console.log(await item.getText());
        let title = await item.findElement(By.css('.position h3')).getText()
        let address = await item.findElement(By.css('.position .add em')).getText()
        let time = await item.findElement(By.css('.position .format-time')).getText()
        let jdLink = await item.findElement(By.css('.position .position_link')).getAttribute('href')
        let money = await item.findElement(By.css('.position .money')).getText()
        let background = await item.findElement(By.css('.position .li_b_l')).getText()
        background.replace(money, '')
        let companyName = await item.findElement(By.css('.company .company_name')).getText()
        let companyLink = await item.findElement(By.css('.company .company_name a')).getAttribute('href')
        let industry = await item.findElement(By.css('.company .industry')).getText()
        let tag = await item.findElement(By.css('.list_item_bot .li_b_l')).getText()
        let welfare = await item.findElement(By.css('.list_item_bot .li_b_r')).getText()
        data[i+1]={
          title,
          address,
          time,
          jdLink,
          money,
          background,
          companyName,
          companyLink,
          industry,
          tag,
          welfare
        }
      }
      // console.log(data);
        fs.appendFile( `${__dirname}/fetchedData.json`, JSON.stringify(data),  "utf-8", (err)=>{
          if (err) {
              console.log('Rewrite Failed',err);
          } else {
            // number++;
            console.log('added successfully');
            thisPage++
          }
        });
      currentPage++;
      if (currentPage <= maxPage) {
        await driver.findElement(By.className('pager_next')).click();
        await pullData();
      }
    } catch (e) {
      if (e) noError = false;
    } finally {
      if (noError) break
    }
  }
}
