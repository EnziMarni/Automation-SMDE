const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testListKategoriPage() {
  // Buka browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigasi ke halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");

    await driver.findElement(By.name("password")).sendKeys("admin123");

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("http://localhost:8000/home"));

    // Navigasi ke halaman List Kategori Dokumen
    await driver.get("http://127.0.0.1:8000/kategori-dokumen-view");

    // Tunggu hingga judul halaman tampil
    let pageTitle = await driver.wait(until.elementLocated(By.css(".judul")), 10000).getText();

    assert.strictEqual(pageTitle, "List Kategori Dokumen");

    console.log('Test berhasil: Halaman "List Kategori Dokumen" ditampilkan dengan benar');
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

testListKategoriPage();
