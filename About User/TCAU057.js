const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This script tests the login and navigation to the 'About Me' section of the web application
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCAU057
 * Test Objective: Verify that a user can log in and navigate to the 'About Me' section successfully.
 * Pre-conditions: The user must have valid login credentials.
 * Post-conditions: The user should successfully navigate to the 'About Me' section.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Close any notification modal if present.
 * 5. Click the dropdown menu.
 * 6. Click the 'About Me' link in the dropdown.
 * 7. Verify navigation to the 'About Me' section.
 */

(async function aboutuser() {
  // Start the timer for execution
  console.time("Execution Time");

  // Initialize the WebDriver instance
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to the login page
    await driver.get("http://127.0.0.1:8000/login");

    // Step 2: Wait for the email input field to be located and fill out the login form
    await driver.wait(until.elementLocated(By.id("email")), 10000).sendKeys("sekjur@example.com");
    await driver.wait(until.elementLocated(By.id("password")), 10000).sendKeys("sekjur123", Key.RETURN);

    // Step 3: Verify successful login
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 10000);
    console.log("Login berhasil!");

    // Step 4: Close any notification modal if present
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Step 5: Click the dropdown menu
    await driver.wait(until.elementLocated(By.id("navbarDropdown")), 10000).click();

    // Step 6: Click the 'About Me' link in the dropdown
    await driver.wait(until.elementLocated(By.css("a.dropdown-item[href*='about-me']")), 10000).click();
    console.log("Navigasi ke About Me berhasil!");

    // Step 7: Verify navigation to the 'About Me' section
    await driver.wait(until.urlContains("about-me"), 10000);
    let pageTitle = await driver.getTitle();
    if (pageTitle.includes("About Me")) {
      console.log("Navigasi ke halaman 'About Me' berhasil!");
    } else {
      throw new Error("Gagal navigasi ke halaman 'About Me'");
    }
  } catch (error) {
    // Detailed error handling and logging
    console.error("Terjadi kesalahan:", error);
    let pageSource = await driver.getPageSource();
    console.log("Sumber halaman saat ini:\n");
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
})();
