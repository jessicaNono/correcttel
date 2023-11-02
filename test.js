const { formatPhoneNumber , getMobileOperator } = require('./index');

const phoneNumber = '017621354126';
const formattedNumber = formatPhoneNumber(phoneNumber, 'DE');

const operator = getMobileOperator(phoneNumber,  'DE');

console.log(`Original Number: ${phoneNumber}`);
console.log(`Formatted Number: ${formattedNumber}`);
console.log(`Mobile Operator: ${operator}`);
