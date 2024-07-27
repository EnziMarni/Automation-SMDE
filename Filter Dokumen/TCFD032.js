const { Builder, By, Key, until } = require("selenium-webdriver");

(async function filter() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    await driver.wait(until.elementLocated(By.id("filter")), 1000);

    await driver.findElement(By.id("filter")).sendKeys("Dokumen Visi Misi", Key.RETURN);

    let visibleRows = await driver.findElements(By.css("#documentTableBody tr"));
    console.log("Jumlah baris tabel setelah filter:", visibleRows.length);
  } finally {
    await driver.quit();
  }
})();
