class ForgotPasswordPage {
    visit() {
      cy.visit('https://app.quickconnect.biz/forgot-password');
    }
  
    enterEmail(email) {
      cy.get('#forgot-password-page > section > div > div > div.content-item > div.input-item.py-20 > input[type=text]')
        .type(email);
    }
  
    submitEmail() {
      cy.get('button[type="submit"]').click(); // Adjust the selector if necessary
    }
  }
  
  export const forgotPasswordPage = new ForgotPasswordPage();
  