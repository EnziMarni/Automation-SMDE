const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    await driver.get("http://127.0.0.1:8000/list-dokumen");

    await driver.wait(until.elementLocated(By.id("filter")), 10000);

    await driver.findElement(By.id("filter")).sendKeys("Dokumen Visi Misi", Key.RETURN);

    await driver.sleep(3000);

    let visibleRows = await driver.findElements(By.css("#documentTableBody tr"));
    console.log("Jumlah baris tabel setelah filter:", visibleRows.length);
  } finally {
    await driver.quit();
  }
})();
