exports.homePage =
    class homePage {

        constructor(page) {
            this.page = page;
            this.searchBox = 'Search our site';
            this.searchButton = '.search-widget__react button';
            this.searchResults = '[class="list-unstyled mb-0 view--with-divides"] a';

            //Popular Area
            this.popularAreasLocator = '.field--name-field-popular-content>li>a';
        }


        async searchATopic(text, count) {
            await this.page.getByPlaceholder(this.searchBox).fill(text)

            await this.page.locator(this.searchButton).click();
            this.searchOutput = await this.page.$$(this.searchResults);
            this.found = false;

            for (const searchResultTitle of this.searchOutput) {
                var textRes = await searchResultTitle.textContent();
                const textcontent = textRes.toLowerCase();
                if (textcontent.includes(text.toLowerCase())) {
                    this.found = true;
                    console.log('\n++++ return string , expected : ' + textcontent + " , " + text.toLowerCase());
                } else {
                    this.found = false;
                    console.log('\n--- return string , expected : ' + textcontent + " , " + text.toLowerCase());
                    return this.found;
                }

                if (count <= 0) {
                    return this.found;
                }
                count = count - 1;
            }
            return this.found;
        }

        async getPopularAreaSectionLocator() {
            this.page.waitForSelector(this.popularAreasLocator);
            return await this.page.$$(this.popularAreasLocator);
        }



    }