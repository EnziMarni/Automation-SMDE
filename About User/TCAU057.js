const { Builder, By, Key, until } = require("selenium-webdriver");

(async function aboutuser() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Klik dropdown
    await driver.findElement(By.id("navbarDropdown")).click();

    // Klik dropdown about me
    await driver.findElement(By.css("a.dropdown-item[href*='about-me']")).click();
    console.log("Navigasi ke About Me berhasil!");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await driver.quit();
  }
})();
