const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/draft-dokumen");
    await driver.sleep(1000);

    console.log("Berhasil akses halaman draft dokumen");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

deleteDocument();
