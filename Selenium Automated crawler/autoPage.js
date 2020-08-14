const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver');
let currentPage = 1
let maxPage;
// driver is a global variable
let driver = new Builder().forBrowser('chrome').build();
(async function example() {
  await driver.get('https://www.lagou.com');
  // await driver.findElement(By.css('#changeCityBox .checkTips .tab.focus')).click();
  await driver.findElement(By.css('#changeCityBox ul.clearfix > li:nth-of-type(8)')).click();
  await driver.findElement(By.css('#search_input')).sendKeys('前端', Key.RETURN);
  maxPage = await driver.findElement(By.className('totalNum')).getText()
  //   await driver.findElement(By.id('search_input')).sendKeys('前端', Key.RETURN);
  pullData();
})();


async function pullData() {
  console.log(`Fetching data of page${currentPage}, Total${maxPage}pages`)
  while (true) {
    let noError = true;
    try {
      let items = await driver.findElements(By.css('.item_con_list .con_list_item'))
      let arr = []
      // Iterate over the array to get the required data
      for (let i = 0; i < items.length; i++) {
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
        arr.push({
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
        })
      }
      // fetching page 1's data
      console.log(arr);
      currentPage++;
      if (currentPage <= maxPage) {
        await driver.findElement(By.className('pager_next')).click();
        await pullData();
      }
    } catch (e) {
      // console.log(e.message);
      if (e) noError = false;
    } finally {
      if (noError) break
    }
  }
}