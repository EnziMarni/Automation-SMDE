const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    async function searchByTitle(query) {
      // Mendapatkan nilai input pencarian
      await driver.findElement(By.id("search")).sendKeys(query);
    }
    await searchByTitle("Dokumen");

    console.log("judul dokumen berhasil di cari");
  } finally {
    await driver.quit();
  }
})();
