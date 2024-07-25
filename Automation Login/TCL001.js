const { Builder, By, Key, until } = require("selenium-webdriver");

(async function login() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Tunggu sampai halaman masuk
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");
  } catch (error) {
    console.error("Login gagal:", error);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
})();
