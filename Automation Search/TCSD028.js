const { Builder, By, Key, until } = require("selenium-webdriver");

async function searchDocuments() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    // Perform the search
    await driver.findElement(By.id("search")).sendKeys("dokumen, visi misi");
    await driver.findElement(By.id("searchIcon")).click();

    console.log("Dokumen Tidak Ditemukan, dengan kata kunci ganda");
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

searchDocuments();
