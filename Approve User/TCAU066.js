const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function approveStudent() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);
    await driver.sleep(1000);
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/list-user");
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.css("table.table")), 10000);
    await driver.sleep(1000);
    console.log("Halaman list user berhasil dimuat");

    // Cari baris tabel yang berisi user dengan jabatan Mahasiswa dan belum disetujui
    let rows = await driver.findElements(By.css("tbody tr"));
    await driver.sleep(1000);
    for (let row of rows) {
      let jabatan = await row.findElement(By.css("td:nth-child(3)")).getText();
      await driver.sleep(1000);
      let approved = await row.findElement(By.css("td:nth-child(4)")).getText();
      await driver.sleep(1000);

      if (jabatan === "Mahasiswa" && approved === "Tidak Diizinkan") {
        let approveButton = await row.findElement(By.css("td:nth-child(5) button.btn-success"));
        await driver.sleep(1000);
        await approveButton.click();
        console.log("User Mahasiswa berhasil di-approve");
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
