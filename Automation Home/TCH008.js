const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/home");
  } catch (error) {
    console.error("Login gagal:", error);
  } finally {
    await driver.sleep(2000); // Menunggu 2 detik sebelum mencari elemen
    await driver.quit();
  }
})();
