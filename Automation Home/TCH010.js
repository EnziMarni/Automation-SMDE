const { Builder, By, Key, until } = require("selenium-webdriver");

(async function home() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");
    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    const screenSizes = [
      { width: 1024, height: 768 }, // Tablet landscape
      { width: 768, height: 1024 }, // Tablet portrait
      { width: 1366, height: 768 }, // Standard laptop
      { width: 1920, height: 1080 }, // Full HD
    ];

    for (const size of screenSizes) {
      await driver.manage().window().setRect({ width: size.width, height: size.height });
      console.log(`Testing at resolution: ${size.width}x${size.height}`);
    }

    console.log("Responsive tests completed successfully!");
  } catch (error) {
    console.error("An error occurred during the responsive test:", error);
  } finally {
    await driver.quit();
  }
})();
