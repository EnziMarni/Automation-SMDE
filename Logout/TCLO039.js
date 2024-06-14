const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page and log in
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Perform navigation or other tasks here if needed
    await driver.get("http://127.0.0.1:8000/input-dokumen");

    // Open the dropdown menu to access the logout link
    await driver.findElement(By.id("navbarDropdown")).click();
    await driver.sleep(1000); // Wait a bit for the dropdown to appear

    // Click the logout link, which triggers the form submission
    await driver.findElement(By.xpath("//a[contains(text(), 'Logout')]")).click();
    console.log("Logout successful!");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();
