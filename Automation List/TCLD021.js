const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    // View file dokumen pertama dalam list
    await driver.sleep(500);
    let viewFileLink = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[8]/a"));
    await viewFileLink.click();
    await driver.sleep(1000);
    console.log("Dokumen berhasil di akses");
  } finally {
    await driver.quit();
  }
})();
