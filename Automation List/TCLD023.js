const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    // Mengklik icon delete pada dokumen pertama dalam tabel
    await driver.executeScript("arguments[0].click();", await driver.findElement(By.xpath("//table/tbody/tr[1]/td[9]/form/button/i")));
    await driver.sleep(1000); // Tunggu beberapa saat untuk memastikan operasi berhasil
  } finally {
    await driver.quit();
  }
})();
