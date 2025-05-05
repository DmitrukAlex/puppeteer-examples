const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.URL || 'https://uspix.ua/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const prices = await page.evaluate(() => {
    const text = document.body.innerText;
    return [...new Set(text.match(/\d{3,4} ?(грн|₴)/gi))];
  });

  console.log(`Ціни з сайту ${url}:`, prices);
  await browser.close();
})();
