const { Builder, By, Key, until } = require("selenium-webdriver");

(async function logout() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/list-dokumen");

    await driver.findElement(By.id("navbarDropdown")).click();

    await driver.findElement(By.xpath("//a[contains(text(), 'Logout')]")).click();
    console.log("Logout successful!");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();
