const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Tunggu sampai berhasil login dan halaman home terbuka
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/draft-dokumen");

    console.log("berhasil akses halaman draft");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

deleteDocument();
