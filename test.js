const { formatPhoneNumber, getMobileOperator } = require('./index');

const phoneNumber = '01765563626';
const code = 'DE';
const formattedNumber = formatPhoneNumber(phoneNumber, code);

const operator = getMobileOperator(phoneNumber, code);

console.log(`Original Number: ${phoneNumber}`);
console.log(`Formatted Number: ${formattedNumber}`);
console.log(`Mobile Operator: ${operator}`);
