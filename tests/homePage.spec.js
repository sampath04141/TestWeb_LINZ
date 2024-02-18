const { test, expect } = require('@playwright/test');
const { timeLog } = require('console');

import { homePage } from '../pages/homePage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.linz.govt.nz/');
});

test('Validate Title', async ({ page }) => {

    const pageTitle = await page.title();
    const url = await page.url();

    await expect(page).toHaveTitle(/Land Information New Zealand/);
    await expect(page).toHaveTitle('Home | Toitū Te Whenua - Land Information New Zealand');
    await expect(page).toHaveURL(/www.linz.govt.nz/);
    page.close();

});

test('validate search results', async ({ page }) => {
    //Create an object of homePage class
    const home = new homePage(page);

    //First 5 result must contain ->' crown property' in the search result title
    expect(await home.searchATopic('crown property', 5)).toBeTruthy();
    page.close();
})

