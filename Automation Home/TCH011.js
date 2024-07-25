const { Builder, By, Key, until } = require("selenium-webdriver");

(async function home() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page and log in
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
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

    await driver.findElement(By.xpath("//a[contains(text(), 'Logout')]")).click();
    console.log("Logout successful!");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();
