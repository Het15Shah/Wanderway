import { emailRegex } from './regex.js';

export const isValidEmail = (email) => emailRegex.test(email);