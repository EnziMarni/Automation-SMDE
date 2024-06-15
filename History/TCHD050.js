const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Masuk ke halaman login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.css("a.btn.btn-link i.fa-history")), 10000);

    let viewHistoryIcon = await driver.findElement(By.css("a.btn.btn-link i.fa-history"));

    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", viewHistoryIcon);
    await driver.sleep(1000);

    // Klik ikon view history
    await viewHistoryIcon.click();
    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.css("button.btn.btn-primary[data-bs-toggle='modal']")), 10000);

    let viewHistoryButton = await driver.findElement(By.css("button.btn.btn-primary[data-bs-toggle='modal']"));

    await viewHistoryButton.click();
    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.css("button.btn.btn-secondary[data-bs-dismiss='modal']")), 10000);

    let closeButton = await driver.findElement(By.css("button.btn.btn-secondary[data-bs-dismiss='modal']"));

    // Klik tombol "Tutup"
    await closeButton.click();
    await driver.sleep(2000);

    console.log("View icon history berhasil, ikon diklik, tombol Lihat Riwayat diklik, dan modal ditutup.");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    await driver.quit();
  }
}

viewDocumentHistory();
