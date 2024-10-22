import axios from 'axios';

const API_KEY = 'fe04e06d023956e7e7bb706f3cc6b106'; // Your actual 2Captcha API key

export async function solveRecaptcha(siteKey, pageUrl) {
  try {
    // Request a CAPTCHA solving task from 2Captcha
    const taskIdResponse = await axios.get(`http://2captcha.com/in.php?key=${API_KEY}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}&json=1`);

    if (taskIdResponse.data.status !== 1) {
      throw new Error('Failed to submit CAPTCHA solving task');
    }

    const taskId = taskIdResponse.data.request;
    console.log('Task ID:', taskId);

    // Wait for the solution
    let tokenResponse;
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking

      tokenResponse = await axios.get(`http://2captcha.com/res.php?key=${API_KEY}&action=get&id=${taskId}&json=1`);

      if (tokenResponse.data.status === 1) {
        break; // reCAPTCHA solved successfully
      }

      attempts++;
    }

    if (tokenResponse.data.status !== 1) {
      throw new Error('Failed to solve CAPTCHA');
    }

    const recaptchaToken = tokenResponse.data.request;
    console.log('reCAPTCHA Token:', recaptchaToken);

    return recaptchaToken; // Return the solved token
  } catch (error) {
    console.error('Error solving reCAPTCHA:', error);
    throw error;
  }
}
