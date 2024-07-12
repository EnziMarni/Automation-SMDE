const { Builder, By, Key, until } = require("selenium-webdriver");

(async function aboutuser() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page and log in
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    await driver.sleep(3000);
    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

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
