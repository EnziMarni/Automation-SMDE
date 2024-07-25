const { Builder, By, Key, until } = require("selenium-webdriver");

async function loginAndNavigate() {
  // Setup Chrome driver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    console.log("Login berhasil!");

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Fungsi untuk mengklik tautan navigasi
    async function navigateTo(linkText, expectedUrl) {
      await driver.findElement(By.linkText(linkText)).click();
      await driver.wait(until.urlIs(expectedUrl));
      console.log(`Navigated to ${linkText}`);
    }

    // Akses setiap tautan navigasi

    await navigateTo("Upload Dokumen", "http://127.0.0.1:8000/input-dokumen");
    await navigateTo("List Dokumen", "http://127.0.0.1:8000/list-dokumen");
    await navigateTo("Dokumen Saya", "http://127.0.0.1:8000/list-dokumen-user");
    await navigateTo("Deleted Dokumen", "http://127.0.0.1:8000/draft-dokumen");

    // Akses tautan yang hanya tersedia untuk Admin
    if (await isElementPresent(By.linkText("List Kategori"))) {
      await navigateTo("List Kategori", "http://127.0.0.1:8000/kategori-dokumen-view");
      await navigateTo("List Role", "http://127.0.0.1:8000/jabatan-view");
      await navigateTo("List User", "http://127.0.0.1:8000/list-user");
      await navigateTo("List Validasi", "http://127.0.0.1:8000/validasi-view");
    }

    // Akses tautan yang hanya tersedia untuk Kaprodi
    if (await isElementPresent(By.linkText("List User"))) {
      await navigateTo("List User", "http://127.0.0.1:8000/list-user");
    }
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

// Fungsi untuk memeriksa apakah elemen ada
async function isElementPresent(locator) {
  try {
    await driver.findElement(locator);
    return true;
  } catch (err) {
    return false;
  }
}

loginAndNavigate().catch(console.error);
