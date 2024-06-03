const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(2000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    await driver.sleep(2000);
    await driver.findElement(By.id("v-pills-profile-tab")).click();
    await driver.wait(until.elementLocated(By.css("h3.judul")), 10000);

    let pageTitle = await driver.findElement(By.css("h3.judul")).getText();
    if (pageTitle === "FORM INPUT DOKUMEN") {
      console.log("Berhasil mengakses halaman Input Dokumen!");
      await driver.sleep(2000);

      // Scroll agar button cancel tampil di halaman
      let cancelButton = await driver.findElement(By.id("cancelButton"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", cancelButton);
      await driver.sleep(1000);

      // Klik button cance
      await driver.executeScript("arguments[0].click();", cancelButton);
      console.log("Batal mengirim form!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Input Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
