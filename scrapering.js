const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

router.get('/extract-text', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://11cart.com', { waitUntil: 'domcontentloaded' });

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    // Remove script and style elements
    $('script, style').remove();

    // Extract text from the remaining HTML
    const extractedText = $.text().trim();

    await browser.close();

    res.send(extractedText);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while extracting text');
  }
});

module.exports = router;