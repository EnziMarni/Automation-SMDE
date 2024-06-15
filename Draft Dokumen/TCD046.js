const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function unarchiveDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);

    await driver.get("http://localhost:8000/draft-dokumen");
    await driver.sleep(1000);

    let unarchiveButton = await driver.findElement(By.css("button[type='submit'] > i.fa.fa-arrow-left"));
    await driver.sleep(1000);
    await unarchiveButton.click();

    console.log("Document unarchived successfully.");
    await driver.sleep(1000);
  } catch (error) {
    console.error("Error during unarchiving document:", error);
  } finally {
    await driver.quit();
  }
}

unarchiveDocument();
