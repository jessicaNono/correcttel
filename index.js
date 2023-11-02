const { PhoneNumberUtil, PhoneNumberFormat } = require('google-libphonenumber');
const NodeCache = require('node-cache');
const mobileOperatorPrefixes = require('./mobileOperators.json');

const phoneUtil = PhoneNumberUtil.getInstance();
const phoneCache = new NodeCache();

function formatPhoneNumber(number, countryCode) {
  try {
    // Parse and format the phone number
    const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
    const formattedNumber = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);

    // Save the formatted number to the cache
    phoneCache.set(number, formattedNumber);
    return formattedNumber;
  } catch (error) {
    console.error('Error formatting phone number:', error.message);
    return null;
  }
}

function getMobileOperator(number, countryCode) {
  try {
    let phoneNumber, parsedCountryCode;

    // Check if the number includes a country code prefix
    if (number.startsWith('+') || number.startsWith('00')) {
      phoneNumber = phoneUtil.parse(number);
      parsedCountryCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
    } else {
      phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
      parsedCountryCode = countryCode;
    }

    let nationalNumber = phoneNumber.getNationalNumber().toString();

    // Re-add leading zero for countries where this is the norm (e.g., Ivory Coast)
    if (parsedCountryCode === 'CI' || parsedCountryCode === 'NG') {
      nationalNumber = '0' + nationalNumber;
    }

    const operatorPrefixes = mobileOperatorPrefixes[parsedCountryCode];

    if (!operatorPrefixes) {
      console.error(`No operator prefixes found for country code: ${parsedCountryCode}`);
      return 'Unknown Country or Operator';
    }

    for (const operator in operatorPrefixes) {
      if (operatorPrefixes[operator].some(prefix => nationalNumber.startsWith(prefix))) {
        return operator;
      }
    }

    return 'Unknown Operator';
  } catch (error) {
    console.error('Error getting mobile operator:', error.message);
    return null;
  }
}


module.exports = {
  formatPhoneNumber,
  getMobileOperator,
};
