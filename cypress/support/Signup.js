class SignupPage {
    // Locators
    getEmailField() {
      return cy.get("input[placeholder='Enter email or mobile number']");
    }
  
    getPasswordField() {
      return cy.xpath("//input[@placeholder='*********']");
    }
  
    getSignupButton() {
      return cy.get('#signup-page > section > div > div > div:nth-child(1) > div.form-wrapper > form > div.common-button.py-40 > button');
    }
  
    // Methods to interact with the elements
    typeEmail(email) {
      this.getEmailField().type(email);
    }
  
    typePassword(password) {
      this.getPasswordField().type(password);
    }
  
    async bypassRecaptcha(siteKey, pageUrl) {
      // Solve the reCAPTCHA using the 2Captcha API and inject the token into the hidden field
      cy.task('solveRecaptcha', { siteKey: '6LfAtWgqAAAAADXKQPZANEzBhK_bcI5h0UM-Qjd2', pageUrl : 'https://app.quickconnect.biz/sign-up', apiKey: 'fe04e06d023956e7e7bb706f3cc6b106' })  // Use your API key
        .then((recaptchaToken) => {
          cy.window().then((win) => {
            // Inject the solved reCAPTCHA token into the hidden response field
            win.document.querySelector('#g-recaptcha-response').innerHTML = recaptchaToken;
          });
        });
    }
  
    clickSignupButton() {
      this.getSignupButton().click();
    }
  }
  
  export default SignupPage;
  