const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const fs = require("fs");

async function unarchiveDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");

    // Akses halaman draft-dokumen
    await driver.get("http://127.0.0.1:8000/draft-dokumen");
    await driver.sleep(1000);
    console.log("Berhasil akses halaman draft");

    // Tunggu sampai elemen tabel ada
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);
    console.log("Table body located");

    // Tunggu sampai baris pertama tabel muncul
    await driver.wait(until.elementLocated(By.css("#documentTableBody tr:first-child")), 10000);
    console.log("First row located");

    // Ambil screenshot untuk memastikan halaman sudah sesuai
    let image = await driver.takeScreenshot();
    fs.writeFileSync("screenshot.png", image, "base64");
    console.log("Screenshot taken");

    // Coba temukan tombol unarchive dengan selector yang lebih spesifik
    let unarchiveButton;
    try {
      unarchiveButton = await driver.findElement(By.css("#documentTableBody tr:first-child form[action*='unarchive'] button[type='submit']"));
      console.log("Unarchive button located");
    } catch (error) {
      console.log("Unarchive button not found, trying alternative selector");
      unarchiveButton = await driver.findElement(By.css("#documentTableBody tr:first-child form[action*='unarchive'] button"));
    }

    // Scroll ke tombol unarchive
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", unarchiveButton);
    await driver.sleep(1000);

    // Klik tombol unarchive
    console.log("Mengklik tombol unarchive...");
    await unarchiveButton.click();
    await driver.sleep(1000);

    console.log("Dokumen berhasil di-unarchive dari draft.");
  } catch (error) {
    console.error("Error during document unarchiving:", error);
  } finally {
    await driver.quit();
  }
}

unarchiveDocument();
