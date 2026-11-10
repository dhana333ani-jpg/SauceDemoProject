import {expect, test} from "@playwright/test";

test.beforeEach("Before each & every test login", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("link", {name:"Log in"}).click();
    await page.getByLabel("Email:").fill("josephit1005@gmail.com");
    await page.getByLabel("Password:").fill("12345678");
    await page.locator(".button-1.login-button").click();
    await expect(page.locator("//a[text()='josephit1005@gmail.com']")).toBeVisible();
    console.log("Logged in the website");
})

test.afterEach("After each & every test log out", async({page})=>{
    await page.locator(".ico-logout").click();
    await expect(page.locator("//h2[contains(., 'Welcome to our store')]")).toBeVisible();
    console.log("Logged Out");
    
})

test("search valid", async({page})=>{
    await page.locator("//input[@id='small-searchterms']").fill("laptop");
    await page.getByRole("button", {name:"Search"}).click();
    await expect(page.locator("//a[contains(., '14.1-inch Laptop')]")).toHaveText("14.1-inch Laptop");
    console.log("Valid search is verified")
})

test("Search Invalid", async({page})=>{
    await page.locator("//input[@id='small-searchterms']").fill("hiokdl");
    await page.getByRole("button", {name:"Search"}).click();
    await expect(page.locator("//strong[contains(., 'No products were found')]")).toBeVisible();
    console.log("Invalid search is verified");
})