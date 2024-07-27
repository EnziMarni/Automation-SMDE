const { Builder, By, Key, until } = require("selenium-webdriver");

async function loginAndNavigate() {
  // Setup Chrome driver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");
    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

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
      try {
        console.log(`Navigating to ${linkText}...`);
        await driver.findElement(By.linkText(linkText)).click();
        await driver.wait(until.urlIs(expectedUrl), 30000); // Timeout 30 detik
        console.log(`Navigated to ${linkText}`);
      } catch (error) {
        console.error(`Failed to navigate to ${linkText}: ${error.message}`);
      }
    }

    // Akses setiap tautan navigasi
    await navigateTo("Upload Dokumen", "https://apps.srpcenter.com/TA/Enzi2024/input-dokumen");
    await navigateTo("List Dokumen", "https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");
    await navigateTo("Dokumen Saya", "https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");
    await navigateTo("Deleted Dokumen", "https://apps.srpcenter.com/TA/Enzi2024/draft-dokumen");

    // Akses tautan yang hanya tersedia untuk Admin
    if (await isElementPresent(driver, By.linkText("List Kategori"))) {
      await navigateTo("List Kategori", "https://apps.srpcenter.com/TA/Enzi2024/kategori-dokumen-view");
      await navigateTo("List Role", "https://apps.srpcenter.com/TA/Enzi2024/jabatan-view");
      await navigateTo("List User", "https://apps.srpcenter.com/TA/Enzi2024/list-user");
      await navigateTo("List Validasi", "https://apps.srpcenter.com/TA/Enzi2024/validasi-view");
    }

    // Akses tautan yang hanya tersedia untuk Kaprodi
    if (await isElementPresent(driver, By.linkText("List User"))) {
      await navigateTo("List User", "https://apps.srpcenter.com/TA/Enzi2024/list-user");
    }
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

// Fungsi untuk memeriksa apakah elemen ada
async function isElementPresent(driver, locator) {
  try {
    await driver.findElement(locator);
    return true;
  } catch (err) {
    return false;
  }
}

loginAndNavigate().catch(console.error);
