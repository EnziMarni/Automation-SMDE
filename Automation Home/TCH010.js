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

    // Screen sizes to test
    const screenSizes = [
      { width: 1024, height: 768 }, // Tablet landscape
      { width: 768, height: 1024 }, // Tablet portrait
      { width: 1366, height: 768 }, // Standard laptop
      { width: 1920, height: 1080 }, // Full HD
    ];

    for (const size of screenSizes) {
      await driver.manage().window().setRect({ width: size.width, height: size.height });
      await driver.sleep(2000); // Pause to allow layout changes to take effect
      console.log(`Testing at resolution: ${size.width}x${size.height}`);

      // Optionally take screenshots
      const screenshot = await driver.takeScreenshot();
      require("fs").writeFileSync(`screenshot-${size.width}x${size.height}.png`, screenshot, "base64");

      // Add specific checks for each resolution if needed
      // For example, checking visibility of elements, layout breaks, etc.
    }

    console.log("Responsive tests completed successfully!");
  } catch (error) {
    console.error("An error occurred during the responsive test:", error);
  } finally {
    await driver.quit();
  }
})();
