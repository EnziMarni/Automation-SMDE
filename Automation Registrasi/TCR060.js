const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function registerStudent() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman register
    await driver.get("http://127.0.0.1:8000/register");

    // Tunggu hingga halaman register dimuat
    await driver.wait(until.elementLocated(By.id("name")), 10000);
    console.log("Halaman register berhasil dimuat");

    // Isi form register
    await driver.findElement(By.id("name")).sendKeys("Test Mahasiswa");
    await driver.sleep(2000);
    await driver.findElement(By.id("email")).sendKeys("mahasiswa1@example.com");
    await driver.sleep(2000);
    await driver.findElement(By.id("password")).sendKeys("password123");
    await driver.sleep(2000);
    await driver.findElement(By.id("password-confirm")).sendKeys("password123");

    // memilih jabatan mahasiswa
    let jabatanDropdown = await driver.findElement(By.id("jabatanSelect"));
    await driver.sleep(2000);
    await jabatanDropdown.findElement(By.xpath("//option[. = 'Mahasiswa']")).click();

    // Klik tombol register
    await driver.findElement(By.css("button.btn.btn-success")).click();
    await driver.sleep(2000);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/login"), 10000);
    console.log("Registrasi berhasil!");
  } catch (error) {
    console.error("Error during student registration:", error);
  } finally {
    await driver.quit();
  }
}

registerStudent();
