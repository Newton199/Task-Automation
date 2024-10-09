const { defineConfig } = require("cypress");


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      this.screenshotOnRunFailure=true;

      
     

    },
    
   
    
    
  },

  
});
