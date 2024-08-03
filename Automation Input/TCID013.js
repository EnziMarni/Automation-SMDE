const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

/**
 * This script tests the login and document input functionality of the web application
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCID013
 * Test Objective: Verify that a user can log in and input a document successfully.
 * Pre-conditions: The user must have valid login credentials.
 * Post-conditions: The document should be successfully inputted.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Close any notification modal if present.
 * 5. Navigate to the document input page.
 * 6. Select a document type.
 * 7. Fill out the document input form.
 * 8. Submit the form.
 */

(async function input() {
  // Start the timer for execution
  console.time("Execution Time");

  // Initialize the WebDriver instance
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to the login page
    await driver.get("http://127.0.0.1:8000/login");

    // Step 2: Fill out the login form
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");
    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    // Step 3: Verify successful login
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    // Step 4: Close any notification modal if present
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Step 5: Navigate to the document input page
    await driver.get("http://127.0.0.1:8000/input-dokumen");
    await driver.wait(until.urlIs("http://127.0.0.1:8000/input-dokumen"));

    // Step 6: Select a document type
    await driver.wait(until.elementLocated(By.css(".card-header")));
    let pageTitle = await driver.findElement(By.css(".card-header")).getText();

    if (pageTitle === "Pilih Tipe Dokumen") {
      await driver.findElement(By.id("inputType")).sendKeys(Key.ARROW_DOWN, Key.ENTER);
      await driver.sleep(1000);

      let inputType = await driver.findElement(By.id("inputType")).getAttribute("value");
      await driver.sleep(3000);

      await driver.findElement(By.id("submitInputType")).click();
      await driver.sleep(1000);

      // Step 7: Verify the correct document input page is loaded
      if (inputType === "file") {
        await driver.wait(until.urlContains("http://127.0.0.1:8000/input-dokumen/file"), 3000);
        console.log("Berhasil mengakses halaman Input Dokumen File!");
      } else if (inputType === "link") {
        await driver.wait(until.urlContains("input-dokumen-link"), 10000);
        console.log("Berhasil mengakses halaman Input Dokumen Link!");
      } else {
        throw new Error("Tipe dokumen tidak valid!");
      }

      // Step 8: Fill out the document input form
      await driver.findElement(By.name("judul_dokumen")).sendKeys("Dokumen Sertifikat");
      await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Sertifikat Magang Merdeka_Batch 5");

      await driver.findElement(By.name("kategori_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER);
      await driver.findElement(By.name("validasi_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER);
      await driver.findElement(By.name("tahun_dokumen")).sendKeys("2023");
      await driver.sleep(1000);

      let filePath = path.resolve("D:\\SERTIFIKAT ENZI MARNI\\Sertifikat-MSIB-5 [TTD]-Enzi Marni.pdf");
      await driver.findElement(By.id("formFile")).sendKeys(filePath);
      await driver.sleep(1000);

      let checkboxAll = await driver.findElement(By.css('input.form-check-input[value="All"]'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", checkboxAll);
      await driver.sleep(1000);
      await checkboxAll.click();

      await driver.findElement(By.id("tags")).sendKeys("sertifikat, MSIB", Key.RETURN);
      await driver.sleep(1000);

      console.log("Form berhasil dikirim!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Pilih Tipe Dokumen!");
    }
  } catch (error) {
    // Detailed error handling and logging
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
})();
