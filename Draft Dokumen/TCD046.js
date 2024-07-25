const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const fs = require("fs");

async function unarchiveDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    // Akses halaman draft-dokumen
    await driver.get("http://127.0.0.1:8000/draft-dokumen");

    console.log("Berhasil akses halaman draft");

    // Tunggu sampai elemen tabel ada
    await driver.wait(until.elementLocated(By.css("tbody")));
    console.log("Table body located");

    // Tunggu sampai baris pertama tabel muncul
    await driver.wait(until.elementLocated(By.css("tbody tr:first-child")));
    console.log("First row located");

    // Coba temukan tombol unarchive dengan selector yang lebih spesifik
    let unarchiveButton;
    try {
      unarchiveButton = await driver.findElement(By.css("tbody tr:first-child form[action*='unarchive'] button[type='submit']"));
      console.log("Unarchive button located");
    } catch (error) {
      console.log("Unarchive button not found, trying alternative selector");
      unarchiveButton = await driver.findElement(By.css("tbody tr:first-child form[action*='unarchive'] button"));
    }

    // Scroll ke tombol unarchive
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", unarchiveButton);

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
