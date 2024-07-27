const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testListRolePage() {
  // Buka browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigasi ke halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.sleep(1000);

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.findElement(By.name("password")).sendKeys("admin123");
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 10000);

    // Navigasi ke halaman List jabatan
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/jabatan-view");

    console.log('Test berhasil: Halaman "List Role ditampilkan dengan benar');
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

testListRolePage();
