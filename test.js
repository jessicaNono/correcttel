const { formatPhoneNumber, getMobileOperator, getPhoneNumberInfo } = require('./index');

const phoneNumber = '017612814136';
const code = 'DE';
const formattedNumber = formatPhoneNumber(phoneNumber, code);

const operator = getMobileOperator(phoneNumber, code);

const phoneNumberInfo = getPhoneNumberInfo(phoneNumber, code);

console.log(`Original Number: ${phoneNumber}`);
console.log(`Formatted Number: ${formattedNumber}`);
console.log(`Mobile Operator: ${operator}`);
console.log(`Phone Number Info: ${JSON.stringify(phoneNumberInfo)}`);
console.assert(phoneNumberInfo.formattedNumber == formattedNumber)
console.assert(phoneNumberInfo.countryCode == code)
console.assert(phoneNumberInfo.operator == operator)