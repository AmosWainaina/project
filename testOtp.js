import { handleEmailValidationAndOTP } from './lib/validation';

const testEmail = 'gavinmasese911@gmail.com';

handleEmailValidationAndOTP(testEmail)
    .then((otp) => console.log('OTP sent:', otp))
    .catch((err) => console.error('Error:', err));
