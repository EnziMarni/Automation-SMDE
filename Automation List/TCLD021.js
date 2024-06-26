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

    // View file dokumen pertama dalam list
    await driver.sleep(1000);
    let viewFileLink = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[8]/a"));
    await viewFileLink.click();
    await driver.sleep(1000);
    console.log("Dokumen berhasil di akses");
  } finally {
    await driver.quit();
  }
})();
