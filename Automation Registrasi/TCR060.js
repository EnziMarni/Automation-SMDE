const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function registerStudent() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman register
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/register");

    // Tunggu hingga halaman register dimuat
    await driver.wait(until.elementLocated(By.id("name")));
    console.log("Halaman register berhasil dimuat");

    // Isi form register
    await driver.findElement(By.id("name")).sendKeys("Test Mahasiswa baru");

    await driver.findElement(By.id("email")).sendKeys("mahasiswabaru@example.com");

    await driver.findElement(By.id("password")).sendKeys("password123");

    await driver.findElement(By.id("password-confirm")).sendKeys("password123");

    // memilih jabatan mahasiswa
    let jabatanDropdown = await driver.findElement(By.id("jabatanSelect"));

    await jabatanDropdown.findElement(By.xpath("//option[. = 'Mahasiswa']")).click();

    // Klik tombol register
    await driver.findElement(By.css("button.btn.btn-success")).click();

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/login"));
    console.log("Registrasi berhasil!");
  } catch (error) {
    console.error("Error during student registration:", error);
  } finally {
    await driver.quit();
  }
}

registerStudent();
