const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Wait for the page to load after login
    await driver.wait(until.urlContains("home"));

    // Access the document list page
    await driver.get("http://127.0.0.1:8000/list-dokumen-user");
    await driver.wait(until.elementLocated(By.xpath("//table/tbody/tr[1]/td[11]/form/button/i")), 1000);

    // Click the delete icon
    let deleteButton = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[11]/form/button/i"));
    await driver.executeScript("arguments[0].click();", deleteButton);
  } finally {
    await driver.quit();
  }
})();
