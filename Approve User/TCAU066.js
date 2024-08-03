const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This script tests the login, navigation to user list, and approving a student
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCAU066
 * Test Objective: Verify that a user can log in, navigate to the user list, and approve a student successfully.
 * Pre-conditions: The user must have valid login credentials and there must be students pending approval.
 * Post-conditions: The student should be approved successfully.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Close any notification modal if present.
 * 5. Navigate to the user list page.
 * 6. Verify the user list page loads successfully.
 * 7. Find a student that needs approval and approve them.
 */

async function approveStudent() {
  // Start the timer for execution
  console.time("Execution Time");

  // Initialize the WebDriver instance
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to the login page
    await driver.get("http://127.0.0.1:8000/login");

    // Step 2: Fill out the login form with valid credentials
    await driver.findElement(By.id("email")).sendKeys("kaprodi@example.com");
    await driver.sleep(1000); // Allow time for the input to be recognized
    await driver.findElement(By.id("password")).sendKeys("kaprodi123", Key.RETURN);

    // Step 3: Verify successful login
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);
    console.log("Login berhasil!");

    // Step 4: Close any notification modal if present
    try {
      let modalCloseButton = await driver.wait(until.elementLocated(By.css(".modal.show .btn-close")), 5000);
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Step 5: Navigate to the user list page
    await driver.get("http://127.0.0.1:8000/list-user");

    // Step 6: Verify the user list page loads successfully
    await driver.wait(until.elementLocated(By.css("table.table")), 10000);
    console.log("Halaman list user berhasil dimuat");

    // Step 7: Find a student that needs approval and approve them
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
    // Detailed error handling and logging
    console.error("Error during approving student:", error);
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
}

approveStudent();
