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

  bypassRecaptcha(siteKey, pageUrl) {
    const apiKey = 'fe04e06d023956e7e7bb706f3cc6b106'; // Your 2Captcha API key

    // Initiate CAPTCHA solving using fetch
    fetch(`http://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}&json=1`)
      .then(response => response.json())
      .then(data => {
        const taskId = data.request;

        // Poll for the CAPTCHA solution
        const pollCaptcha = () => {
          fetch(`http://2captcha.com/res.php?key=${apiKey}&action=get&id=${taskId}&json=1`)
            .then(res => res.json())
            .then(result => {
              if (result.status === 1) {
                const recaptchaToken = result.request;
                cy.window().then(win => {
                  win.document.querySelector('#g-recaptcha-response').innerHTML = recaptchaToken;
                  console.log('CAPTCHA token injected:', recaptchaToken);
                });
              } else if (result.status === 0) {
                console.log('Waiting for CAPTCHA solution...');
                cy.wait(5000).then(pollCaptcha); // Retry after 5 seconds
              } else {
                throw new Error('Failed to solve CAPTCHA');
              }
            });
        };

        // Start polling
        pollCaptcha();
      })
      .catch(error => {
        console.error('Error fetching CAPTCHA:', error);
      });
  }

  clickSignupButton() {
    this.getSignupButton().click();
  }
}

export default SignupPage;
