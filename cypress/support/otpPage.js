class OtpPage {
    enterOtp(otp) {
      cy.get('input[type="text"].otp-input')  // Replace the selector with the correct one for the OTP field
        .type(otp);
    }
  
    submitOtp() {
      cy.get('button[type="submit"]').click(); // Adjust the selector if necessary
    }
  }
  
  export const otpPage = new OtpPage();
  