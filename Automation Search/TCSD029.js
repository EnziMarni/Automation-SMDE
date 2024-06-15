const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function searchDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    await driver.get("http://localhost:8000/list-dokumen");

    let searchInput = await driver.wait(until.elementLocated(By.id("search")), 10000);

    // Kata kunci pencarian
    await driver.sleep(1000);
    await searchInput.sendKeys("tAGs");

    await driver.sleep(2000);

    let rows = await driver.findElements(By.css("#documentTableBody tr"));

    for (let row of rows) {
      let title = await row.findElement(By.css("td:nth-child(1)")).getText();

      console.log("search berhasil");
    }
  } finally {
    await driver.quit();
  }
}

searchDocument();
