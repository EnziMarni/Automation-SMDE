const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page and log in
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    await driver.findElement(By.id("navbarDropdown")).click();
    await driver.sleep(1000);

    await driver.findElement(By.css("a.dropdown-item[href*='about-me']")).click();
    await driver.sleep(1000);
    console.log("Navigasi ke About Me berhasil!");

    await driver.sleep(2000);

    // Klik button back to home
    await driver.findElement(By.css("a.btn.btn-primary[href*='home']")).click();
    await driver.sleep(2000);
    console.log("Navigasi kembali ke halaman utama berhasil!");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await driver.quit();
  }
})();
