const { Builder, By, Key, until } = require("selenium-webdriver");

async function searchDocuments() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    // Perform the search
    await driver.findElement(By.id("search")).sendKeys("contoh, tag");
    await driver.findElement(By.id("searchIcon")).click();

    console.log("Dokumen Tidak Ditemukan, dengan kata kunci ganda");
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

searchDocuments();
