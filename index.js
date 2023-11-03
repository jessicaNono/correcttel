const { PhoneNumberUtil, PhoneNumberFormat } = require('google-libphonenumber');
const NodeCache = require('node-cache');
const mobileOperatorPrefixes = require('./mobileOperators.json');
const fixedPhoneLengths = require('./fixed_lengths.json');
const phoneUtil = PhoneNumberUtil.getInstance();
const phoneCache = new NodeCache();
const operatorCache = new NodeCache();
const countryConfig = require('./lib/countryConfig');
function formatPhoneNumber(number, countryCode) {
  // first check if we already have formatted this number. if so then return the formatted number
  let formattedNumber = phoneCache.get(number);
  if (formattedNumber) {
    return formattedNumber;
  }
  try {
    // Parse and format the phone number
    const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
    formattedNumber = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);

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
    if (countryConfig.COUNTRY_WITH_LEADING_ZERO.includes(parsedCountryCode)) {
      nationalNumber = '0' + nationalNumber;
    }
    // first check if we already know this national number. if so then return the operator
    let operatorName = operatorCache.get(nationalNumber);
    if (operatorName) {
      return operatorName;
    }
    const operatorPrefixes = mobileOperatorPrefixes[parsedCountryCode];

    if (!operatorPrefixes) {
      console.error(`No operator prefixes found for country code: ${parsedCountryCode}`);
      return 'Unknown Country or Operator';
    }

    for (const operator in operatorPrefixes) {
      if (operatorPrefixes[operator].some(prefix => nationalNumber.startsWith(prefix))) {
        operatorCache.set(nationalNumber, operator);
        return operator;
      }
    }

    return 'Unknown Operator';
  } catch (error) {
    console.error('Error getting mobile operator:', error.message);
    return null;
  }
}

function isPhoneNumberValid(number, countryCode){
  try {
      return phoneUtil.isValidNumberForRegion(phoneUtil.parseAndKeepRawInput(number, countryCode), countryCode);
  } catch (error) {
      console.error(error);
      return false;
  }
}

function getPhoneNumberInfo(number, countryCode) {
  const lengthCheck = isPhoneNumberLengthCorrect(number, countryCode);

  // Check the length of the number first
  if (lengthCheck.code == -1) {
    return {
      'number': number,
      'countryCode': countryCode,
      'error': lengthCheck.message,
      'lengthCheck': 'Incorrect', // Indicate that the length check failed
      'success': false
    };
  } else {

    try {
      // Proceed only if the length check is successful
      const formattedNumber = formatPhoneNumber(number, countryCode);
      const operator = getMobileOperator(number, countryCode);

      return {
        'number': number,
        'countryCode': countryCode,
        'formattedNumber': formattedNumber,
        'operator': operator,
        'lengthCheck': lengthCheck.message,
        'success': true
      };
    } catch (error) {
      return {
        'number': number,
        'countryCode': countryCode,
        'error': error.message,
        'success': false
      };
    }

  }

}

function isPhoneNumberLengthCorrect(number, countryCode) {
  const expectedLength = fixedPhoneLengths[countryCode];
  if (!expectedLength) {
    const errorMessage = `No fixed length found for country code: ${countryCode}`;
    console.error(errorMessage);
    return { code: -2, message: errorMessage };
  }

  try {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(number, countryCode);
    const nationalNumber = phoneNumber.getNationalNumber().toString();

    // Check if the national number matches the expected length
    if (nationalNumber.length === expectedLength) {
      return { code: 0, message: 'Phone number length is correct.' };
    } else {
      const errorMessage = `Incorrect phone number length: expected ${expectedLength}, got ${nationalNumber.length}.`;
      console.error(errorMessage);
      return { code: -1, message: errorMessage };
    }
  } catch (error) {
    const errorMessage = `Error validating phone number length: ${error.message}`;
    console.error(errorMessage);
    return { code: -1, message: errorMessage };
  }
}



module.exports = {
  formatPhoneNumber,
  getMobileOperator,
  getPhoneNumberInfo,
  isPhoneNumberValid,
  isPhoneNumberLengthCorrect,
};
