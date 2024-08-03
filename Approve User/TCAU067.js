const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This script tests the login, navigation to user list, and cancelling an approved user
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCAU067
 * Test Objective: Verify that a user can log in, navigate to the user list, and cancel an approved user successfully.
 * Pre-conditions: The user must have valid login credentials and there must be approved users.
 * Post-conditions: The approved user should be cancelled successfully.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Navigate to the user list page.
 * 5. Verify the user list page loads successfully.
 * 6. Find an approved user and cancel them.
 */

async function cancelApprovedUser() {
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

    // Step 4: Navigate to the user list page
    await driver.get("http://127.0.0.1:8000/list-user");

    // Step 5: Verify the user list page loads successfully
    await driver.wait(until.elementLocated(By.css("table.table")), 10000);
    console.log("Halaman list user berhasil dimuat");

    // Step 6: Find an approved user and cancel them
    let rows = await driver.findElements(By.css("tbody tr"));

    for (let row of rows) {
      let approved = await row.findElement(By.css("td:nth-child(5)")).getText();

      if (approved === "Diizinkan") {
        let cancelButton = await row.findElement(By.css("td:nth-child(6) button.btn-danger"));
        await cancelButton.click();
        console.log("User berhasil di-cancel");
        break;
      }
    }
  } catch (error) {
    // Detailed error handling and logging
    console.error("Error during cancelling approved user:", error);
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
}

cancelApprovedUser();
