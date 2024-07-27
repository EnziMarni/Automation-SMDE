const { Builder, By, Key, until } = require("selenium-webdriver");

// Menunggu element yang ditentukan dapat di klik
async function clickWhenClickable(driver, locator, timeout = 20000) {
  console.log(`Waiting for element to be located: ${locator}`);
  const element = await driver.wait(until.elementLocated(locator), timeout);
  console.log(`Element located: ${locator}`);
  await driver.wait(until.elementIsVisible(element), timeout);
  console.log(`Element is visible: ${locator}`);
  await driver.wait(until.elementIsEnabled(element), timeout);
  console.log(`Element is enabled: ${locator}`);
  await element.click();
  console.log(`Element clicked: ${locator}`);
}

async function navigateSidebar() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/input-dokumen");
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/input-dokumen"));
    console.log("Navigasi ke halaman Input Dokumen berhasil!");
  } catch (error) {
    console.error("Error during navigation:", error.message);
  } finally {
    await driver.quit();
  }
}

navigateSidebar();
