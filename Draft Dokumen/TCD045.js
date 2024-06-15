const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocumentFromDraft() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);

    await driver.get("http://localhost:8000/draft-dokumen");
    await driver.sleep(1000);

    let deleteButton = await driver.findElement(By.css("button[type='submit'] > i.fa.fa-trash"));
    await driver.sleep(1000);
    await deleteButton.click();
    await driver.sleep(1000);

    await driver.switchTo().alert().accept();
    await driver.sleep(1000);

    console.log("Draft document deleted successfully.");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    await driver.quit();
  }
}

deleteDocumentFromDraft();
