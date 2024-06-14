const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function searchDocument() {
  // Buat instance WebDriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman yang akan diuji
    await driver.get("http://localhost:8000/list-dokumen"); // Ganti dengan URL yang sesuai

    // Tunggu elemen input pencarian terlihat
    let searchInput = await driver.wait(until.elementLocated(By.id("search")), 10000);

    // Masukkan kata kunci pencarian
    await driver.sleep(1000);
    await searchInput.sendKeys("propo"); // Ganti dengan kata kunci yang ingin diuji

    // Tunggu hasil pencarian muncul
    await driver.sleep(2000); // Tunggu 2 detik untuk memastikan hasil pencarian telah diperbarui

    // Ambil hasil pencarian dari tabel
    let rows = await driver.findElements(By.css("#documentTableBody tr"));

    // Log hasil pencarian
    for (let row of rows) {
      console.log("search berhasil");
    }
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

searchDocument();
