import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class InvestingService {
  async getUsdtData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      'https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=2103',
    );

    await page.setViewport({ width: 1080, height: 1024 });

    let element = await page.waitForSelector('.pid-2103-last');

    const usdtSpot = await element?.evaluate((el) => el.textContent);

    await page.goto(
      'https://br.widgets.investing.com/crypto-currency-rates?theme=darkTheme&pairs=1031397',
    );

    element = await page.waitForSelector('.pid-1031397-bid');

    const usdt = await element?.evaluate((el) => el.textContent);

    await browser.close();

    return {
      usdtSpot: Number(usdtSpot?.replace(',', '.')),
      usdt: Number(usdt?.replace(',', '.')),
    };
  }
}
