
describe('Test forgot password', () => {
    it('should submit the email for password recovery', () => {
        // Visit the forgot password page
        cy.visit('https://app.quickconnect.biz/forgot-password');

        // Enter the email address into the forgot password form
        cy.xpath('//*[@id="forgot-password-page"]/section/div/div/div[2]/div[1]/input')
          .type('testuser22@example.com'); // Replace this with the email the user typed during sign-up
          

        // Click the submit button
        cy.xpath('//*[@id="forgot-password-page"]/section/div/div/div[2]/div[2]/button')
          .click();
    });
});
