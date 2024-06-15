const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function downloadDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    let downloadLink = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link"));

    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", downloadLink);

    await driver.sleep(1000);

    await downloadLink.click();

    await driver.sleep(2000);

    console.log("Unduhan berhasil dipicu.");
  } finally {
    await driver.quit();
  }
}

downloadDocument();
