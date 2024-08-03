const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");
    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    await driver.wait(until.urlContains("home"));

    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");
    await driver.wait(until.elementLocated(By.xpath("//table/tbody/tr[1]/td[11]/form/button/i")), 1000);

    // Click icon delete
    let deleteButton = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[11]/form/button/i"));
    await driver.executeScript("arguments[0].click();", deleteButton);
    console.log("Berhasil klik icon delete");
  } finally {
    await driver.quit();
  }
})();
