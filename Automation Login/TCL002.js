const { Builder, By, Key, until } = require("selenium-webdriver");

(async function login() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("mahasiswa12", Key.RETURN);

    // Tunggu sampai halaman masuk
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login Gagal");
  } finally {
    await driver.quit();
  }
})();
