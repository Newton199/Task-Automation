describe('Test sign-up with mocked reCAPTCHA', () => {
    it('should fill out the form and mock the reCAPTCHA', () => {
        // Visit the sign-up page
        cy.visit('https://app.quickconnect.biz/sign-up');

        // Enter email or mobile number
        cy.xpath('//*[@id="signup-page"]/section/div/div/div[1]/div[2]/form/div[1]/div[1]/div[2]/input')
          .type('testuser22@example.com');

        // Enter password
        cy.xpath('//*[@id="signup-page"]/section/div/div/div[1]/div[2]/form/div[1]/div[2]/div[2]/input')
          .type('password123');

        // Mock the reCAPTCHA validation request
        
        cy.intercept('POST', '/captcha/verify', { success: true }).as('captchaVerify');

        // Wait for the button to be visible and click with force option
        
        cy.xpath("//button[normalize-space()='Create Account']")
          .should('be.visible') // Wait until the button is visible
          .click({ force: true });
        
    
    });
});
