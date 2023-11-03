const { formatPhoneNumber, getMobileOperator, getPhoneNumberInfo, Errors } = require("./index");

try {
	const phoneNumber = "11645685126";
	const code = "DE";
	const formattedNumber = formatPhoneNumber(phoneNumber, code);

	const operator = getMobileOperator(phoneNumber, code);

	const phoneNumberInfo = getPhoneNumberInfo(phoneNumber, code);

	console.log(`Original Number: ${phoneNumber}`);
	console.log(`Formatted Number: ${formattedNumber}`);
	console.log(`Mobile Operator: ${operator}`);
	console.log(`Phone Number Info: ${JSON.stringify(phoneNumberInfo)}`);
	console.assert(phoneNumberInfo.formattedNumber == formattedNumber);
	console.assert(phoneNumberInfo.countryCode == code);
	console.assert(phoneNumberInfo.operator == operator);
} catch (error) {
	console.log(error.message);
	console.assert(error.message === Errors.UNKNOWN_OPERATOR);
}
