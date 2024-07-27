const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function approveStudent() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("kaprodi@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("kaprodi123", Key.RETURN);

    // Tunggu hingga login berhasil dan diarahkan ke halaman home
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));

    console.log("Login berhasil!");
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Buka halaman daftar pengguna
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-user");

    await driver.wait(until.elementLocated(By.css("table.table")));

    console.log("Halaman list user berhasil dimuat");

    // Cari baris tabel yang berisi pengguna yang belum disetujui
    let rows = await driver.findElements(By.css("tbody tr"));

    for (let row of rows) {
      let approved = await row.findElement(By.css("td:nth-child(5)")).getText();

      if (approved === "Tidak Diizinkan") {
        let approveButton = await row.findElement(By.css("td:nth-child(6) button.btn-success"));
        await approveButton.click();

        console.log("User berhasil di-approve");
        break;
      }
    }
  } catch (error) {
    console.error("Error during approving student:", error);
  } finally {
    await driver.quit();
  }
}

approveStudent();
