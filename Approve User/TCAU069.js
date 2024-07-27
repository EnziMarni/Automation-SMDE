const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function clickApproveAllButton() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("kaprodi@example.com");
    await driver.findElement(By.id("password")).sendKeys("kaprodi123", Key.RETURN);

    // Tunggu hingga login berhasil dan diarahkan ke halaman home
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));

    console.log("Login berhasil!");

    // Buka halaman daftar pengguna
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-user");

    await driver.wait(until.elementLocated(By.css("table.table")));

    console.log("Halaman list user berhasil dimuat");

    // Cari dan klik tombol 'Approve All' jika ada
    let approveAllButton = await driver.findElement(By.xpath("//button[contains(text(), 'Approve All')]"));
    await approveAllButton.click();

    console.log("Tombol 'Approve All' berhasil diklik");
  } catch (error) {
    console.error("Error during clicking 'Approve All' button:", error);
  } finally {
    await driver.quit();
  }
}

clickApproveAllButton();
