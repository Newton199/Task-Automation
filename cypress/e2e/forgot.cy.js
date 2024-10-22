// Import the Mailosaur library and the page objects
const mailosaur = require('mailosaur');
import { forgotPasswordPage } from '../support/forgotPasswordPage';
import { otpPage } from '../support/otpPage';
const apiKey = Cypress.env('mailosaurApiKey');
const serverId = Cypress.env('mailosaurServerId');
const testEmail = Cypress.env('testEmail');

describe('Forgot Password Flow with OTP', () => {
  const serverId = '9wuppbo5';  // Server ID
  const apiKey = 'UkTThcZyYPUWlkP4JkWj8PMl5fPYyBSO';  // API Key
  const testEmail = 'your_test_email@9wuppbo5.mailosaur.net';  // Replace with your Mailosaur email

  it('should successfully reset password using OTP', () => {
    // Step 1: Visit Forgot Password Page
    forgotPasswordPage.visit();

    // Step 2: Enter Email in the Input Field
    forgotPasswordPage.enterEmail(testEmail);

    // Step 3: Submit the Email
    forgotPasswordPage.submitEmail();

    // Step 4: Wait for the OTP to be received
    cy.wait(5000); // Adjust wait time as needed

    // Step 5: Retrieve the OTP from Mailosaur
    const client = new mailosaur.MailosaurClient(apiKey);
    
    client.messages
      .get(serverId, {
        sentTo: testEmail,
      })
      .then((email) => {
        // Extract the OTP from the email (adjust based on email content)
        const otp = email.text.codes[0]; // Assuming OTP is in the 'codes' part, modify as needed

        // Step 6: Enter the OTP into the OTP field
        otpPage.enterOtp(otp);

        // Step 7: Submit the OTP
        otpPage.submitOtp();
      });
  });
});
