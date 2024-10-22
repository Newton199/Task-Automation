const axios = require('axios');

module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  
  
  
  
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Define the task to solve reCAPTCHA using 2Captcha
      on('task', {
        solveRecaptcha({ siteKey, pageUrl, apiKey }) {
          return axios.get(`http://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}&json=1`)
            .then(response => {
              const taskId = response.data.request;

              return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                  axios.get(`http://2captcha.com/res.php?key=${apiKey}&action=get&id=${taskId}&json=1`)
                    .then(result => {
                      if (result.data.status === 1) {
                        clearInterval(interval);
                        resolve(result.data.request);
                      } else if (result.data.status === 0) {
                        console.log('Waiting for CAPTCHA solution...');
                      } else {
                        clearInterval(interval);
                        reject(new Error('Failed to solve CAPTCHA'));
                      }
                    })
                    .catch(err => {
                      clearInterval(interval);
                      reject(err);
                    });
                }, 5000); // Check every 5 seconds
              });
            })
            .catch(error => {
              throw new Error('Error solving CAPTCHA: ' + error);
            });
        }
      });
    },
    baseUrl: 'https://app.quickconnect.biz', // Add the base URL if needed
  },
};
