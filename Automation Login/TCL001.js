const { Builder, By, Key, until } = require("selenium-webdriver");

(async function login() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.sleep(1000);

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);
    await driver.sleep(1000);

    // Tunggu sampai halaman masuk
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    await driver.sleep(1000);
    console.log("Login berhasil!");
  } catch (error) {
    console.error("Login gagal:", error);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
})();
