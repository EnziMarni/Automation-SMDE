const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function downloadDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");

    // Tunggu hingga halaman selesai dimuat
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    // Temukan tautan unduh pertama dan klik
    let downloadLink = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link"));

    // Scroll ke tautan unduh jika perlu
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", downloadLink);

    // Tunggu sejenak untuk memastikan elemen dapat diklik
    await driver.sleep(1000);

    // Klik tautan unduh
    await downloadLink.click();

    // Tangani dialog konfirmasi unduhan (opsional)
    await driver.sleep(2000); // Tunggu beberapa detik untuk dialog muncul (jika ada)

    console.log("Unduhan berhasil dipicu.");
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

downloadDocument();
