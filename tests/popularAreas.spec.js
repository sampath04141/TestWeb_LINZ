import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { homePage } from '../pages/homePage';

export default defineConfig({
    retries: 3,
});

//Define list of populer topics
const POPULAR_AREAS = ['Landonline log in and alerts',
    'Landonline support',
    'Search for and order a land record',
    'Notices to Mariners',
    'LINZ Data Service',
    'Cadastral survey guidelines',
    'Land registration guidance',
    'Overseas investment guidance',
    'Maps',
    'Tide predictions',
    'Crown property guidance',
    'Survey and titles processing times',
    'Place names'
];

//Define list of page headline corresponding to the popular topics
const POPULAR_PAGE_TOPIC = ['Landonline',
    'Landonline support',
    'Land Record Search',
    'Notices to Mariners',
    'LINZ Data Service',
    'Cadastral survey guidelines',
    'Land registration',
    'Overseas investment',
    'Maps',
    'Tide predictions',
    'Crown property',
    'Landonline',
    'New Zealand Geographic Board']

//load page before each test
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.linz.govt.nz/');
});



test('Validate all populer topics', async ({ page }) => {

    const home = new homePage(page);
    const popularSections = await home.getPopularAreaSectionLocator();

    let i = 0;
    //loop and validate popular areas
    for (const popularTitle of popularSections) {
        const topic = await popularTitle.textContent();
        console.log('\ncontain text and array test :  ' + await popularTitle.textContent() + " : " + POPULAR_AREAS[i]);
        expect(topic).toContain(POPULAR_AREAS[i]);
        i = i + 1;

    }

});

test('Validate each populater page topic', async ({ page }) => {

    for (let i = 0; i < POPULAR_AREAS.length; i++) {
        const title = POPULAR_AREAS[i];

        const locatora = '//a[text()="' + POPULAR_AREAS[i] + '"]';
        await page.locator('//li/a[text()="' + POPULAR_AREAS[i] + '"]').click();

        await expect(page.locator('[class="page-header mb-0"]')).toBeVisible();
        await expect(page.locator('[class="page-header mb-0"]')).toHaveText(POPULAR_PAGE_TOPIC[i]);

        await page.goBack();
    }
});
