# Node Crawler Practice


## Functions

- Selenium module can automatically analyze and crawl selected data.
- Node mailer can be used to dynamically  fetch data, if there is information update on the selected web page, it will send an email to notify you in time.
- 'Weibo hot news crawler' is a practice of data crawling.

## Stack

Selenium, node-mailer, cheerio



## Installation & Run

1. Folder of node-mailer test_Gmail

   + before install the packages, you need to setup your own Gmail authorization in nodemailer.js

   ```js
   npm install 
   node nodemailer.js
   ```

   

2. Folder of Selenium Automated crawler

   - **Attention**:  the version of chromedriver.exe  depends on your own Chrome version.  If  version mismatch, go http://chromedriver.storage.googleapis.com/index.html to update chromedriver.exe.

   ```js
   node autoControl.js      (auto search and write files)
   
   Or
   
   node autoPage.js         (auto print results)
   ```

3. Folder of Weibo hot news crawler

   ```js
   npm install 
   node app.js
   ```

   



## ScreenShots

**1.Node Mailer**

<img src="README.assets/WeChat Image_20200814014114.jpg" alt="WeChat Image_20200814014114" style="zoom:25%;" />

