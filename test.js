const { formatPhoneNumber, getMobileOperator, getPhoneNumberInfo, isPhoneNumberValid } = require('./index');

const phoneNumber = '17645685126';
const badPhoneNumber = '1764568512';
const code = 'DE';
const goodPhoneNumberList = [
    {   
        'countryCode': 'CM', 
        'numbers': ['696092345', '696092445', '696092545', '677123456']
    }
]

const badPhoneNumberList = [
    {   
        'countryCode': 'CM', 
        'numbers': ['6960923450', '6960924450', '6960925450', '6771234560']
    }
]
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
goodPhoneNumberList.forEach(function(obj){
    obj.numbers.forEach(e => console.assert(isPhoneNumberValid(e, obj.countryCode), `${e}(${obj.countryCode}) is expected to be correct, but failed.`));
});

badPhoneNumberList.forEach(function(obj){
    obj.numbers.forEach(e => console.assert(!isPhoneNumberValid(e, obj.countryCode), `${e}(${obj.countryCode}) is expected to fail.`));
});