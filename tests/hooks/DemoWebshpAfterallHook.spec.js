import {chromium, expect, test} from "@playwright/test";
let browser;
let context;
let page;
test.beforeAll("Before all the test login", async()=>{
    browser=await chromium.launch();
    context=await browser.newContext();
    page=await context.newPage();
// Login once before all tests
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("link", {name:"Log in"}).click();
    await page.getByLabel("Email:").fill("josephit1005@gmail.com");
    await page.getByLabel("Password:").fill("12345678");
    await page.locator(".button-1.login-button").click();
    await expect(page.locator("//a[text()='josephit1005@gmail.com']")).toBeVisible();
    console.log("Logged in the website");
})

test.afterAll("After all the test log out", async () => {
    try {
        // Attempt to log out
        if (page && await page.locator(".ico-logout").isVisible()) {
            await page.locator(".ico-logout").click();
            console.log("Logged out");
        }
    } finally {
        // Always attempt to close the browser resources
        await context?.close();
        await browser?.close();

        console.log("Browser closed");
    }
});

test("search valid", async()=>{
    await page.locator("//input[@id='small-searchterms']").fill("laptop");
    await page.getByRole("button", {name:"Search"}).click();
    await expect(page.locator("//a[contains(., '14.1-inch Laptop')]")).toHaveText("14.1-inch Laptop");
    console.log("Valid search is verified")
})

test("Search Invalid", async()=>{
    await page.locator("//input[@id='small-searchterms']").fill("hiokdl");
    await page.getByRole("button", {name:"Search"}).first().click();
    await expect(page.locator("//strong[contains(., 'No products were found')]")).toBeVisible();
    console.log("Invalid search is verified");
})