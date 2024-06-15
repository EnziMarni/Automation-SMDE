const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    async function searchByTitle(query) {
      // Mendapatkan nilai input pencarian
      await driver.findElement(By.id("search")).sendKeys(query);

      await driver.sleep(1000);
    }

    await searchByTitle("Dokumen");
    await driver.sleep(1000);
    console.log("judul dokumen berhasil di cari");
  } finally {
    await driver.quit();
  }
})();
