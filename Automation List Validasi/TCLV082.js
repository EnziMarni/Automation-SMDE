const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testListRolePage() {
  // Buka browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigasi ke halaman login
    await driver.get("http://localhost:8000/login");
    await driver.sleep(1000);

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.name("password")).sendKeys("admin123");
    await driver.sleep(1000);
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("http://localhost:8000/home"), 10000);

    // Navigasi ke halaman List Validasi Dokumen
    await driver.get("http://127.0.0.1:8000/validasi-view");
    await driver.sleep(1000);

    console.log('Test berhasil: Halaman "List Role ditampilkan dengan benar');
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

testListRolePage();
