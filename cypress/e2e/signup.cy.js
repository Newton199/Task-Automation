import SignupPage from '../support/Signup';

describe('Signup Page Test with reCAPTCHA Bypass', () => {
  const signupPage = new SignupPage();
  const siteKey = '6LfAtWgqAAAAADXKQPZANEzBhK_bcI5h0UM-Qjd2';  // Your reCAPTCHA site key
  const signupUrl = 'https://app.quickconnect.biz/sign-up';     // Signup URL
  const email = 'testuser1@example.com';
  const password = 'Password123!';

  beforeEach(() => {
    cy.visit(signupUrl);
  });

  it('Should fill the signup form, bypass reCAPTCHA, and submit', () => {
    // Input email and password
    signupPage.typeEmail(email);
    signupPage.typePassword(password);

    // Bypass reCAPTCHA
    signupPage.bypassRecaptcha(siteKey, signupUrl);

    // Click on the signup button
    signupPage.clickSignupButton();

    // Verify the expected result after signup
   // cy.url().should('include', '/some-url-after-signup'); // Adjust this to match the expected URL
  });
});
