const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function searchDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    await driver.wait(until.elementLocated(By.css("input#search")));

    // Kata kunci pencarian
    let query = "/Keuangan";

    let searchInput = await driver.findElement(By.css("input#search"));

    await searchInput.sendKeys(query, Key.RETURN);

    let rows = await driver.findElements(By.css("#documentTableBody tr"));

    console.log("Search berhasil");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

searchDocument();
