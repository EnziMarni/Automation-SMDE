const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("", Key.RETURN);

    // Tunggu sampai halaman masuk
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login Gagal!");
  } finally {
    await driver.sleep(2000); // Menunggu 2 detik sebelum mencari elemen
    await driver.quit();
  }
})();
