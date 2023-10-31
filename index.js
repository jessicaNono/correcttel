const { PhoneNumberUtil, PhoneNumberFormat } = require('google-libphonenumber');
const NodeCache = require('node-cache');
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

module.exports = {
    formatPhoneNumber
};
