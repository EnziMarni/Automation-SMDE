const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function searchDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    await driver.wait(until.elementLocated(By.css("input#search")));

    // Kata kunci pencarian
    let query = "/Keuangan";

    let searchInput = await driver.findElement(By.css("input#search"));

    await searchInput.sendKeys(query, Key.RETURN);

    let rows = await driver.findElements(By.css("#documentTableBody tr"));

    console.log("Search gagal");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

searchDocument();
