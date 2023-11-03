const { PhoneNumberUtil, PhoneNumberFormat } = require('google-libphonenumber');
const NodeCache = require('node-cache');
const mobileOperatorPrefixes = require('./mobileOperators.json');
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

/**
 * 
 * @param {*} number the number to validate
 * @param {*} countryCode the country code of the country where we want to validate le number against.
 * @returns true if the number is valid within the selected country refered by countryCode
 */
function isNumberValidForRegion(number, countryCode) {
  try {
    return phoneUtil.isValidNumberForRegion(phoneUtil.parseAndKeepRawInput(number, countryCode), countryCode);
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * 
 * @param {*} number The phone we want to format
 * @param {*} countryCode The country code to format the phone number against.
 * @returns an object that contains the provided number, the formatted number,
 * the operator, a isValid flag that assert that the provided number is valid within
 * the selected country; and a success flag assert that the provided could be formatted an an 
 * operator could be found. This flag doesn't that the number is valid within the selected country.
 * Note: isValid simply mean that the number lenght is correct, is doesn't mean that the number exists.
 */
function getPhoneNumberInfo(number, countryCode) {
  try {
    return {
      'number': number,
      'countryCode': countryCode,
      'formattedNumber': formatPhoneNumber(number, countryCode),
      'operator': getMobileOperator(number, countryCode),
      'isValid': isNumberValidForRegion(number, countryCode),
      'success': true
    }
  } catch (error) {
    return {
      'number': number,
      'countryCode': countryCode,
      'error': error.message,
      'success': false
    }
  }
}

module.exports = {
  formatPhoneNumber,
  getMobileOperator,
  getPhoneNumberInfo,
  isNumberValidForRegion,
};
