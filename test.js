const { formatPhoneNumber, getMobileOperator } = require('./index');

const phoneNumber = '017612814136';
const code = 'DE';
const formattedNumber = formatPhoneNumber(phoneNumber, code);

const operator = getMobileOperator(phoneNumber, code);

console.log(`Original Number: ${phoneNumber}`);
console.log(`Formatted Number: ${formattedNumber}`);
console.log(`Mobile Operator: ${operator}`);
