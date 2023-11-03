const { formatPhoneNumber, getMobileOperator, getPhoneNumberInfo, isNumberValidForRegion } = require('./index');

const phoneNumber = '17645685126';
const code = 'DE';
//TODO: we might move this list to a test-config file and import 
// if it becomes to long.
// To add more validation, please add an object which has a countryCode key and provide
// the list of good and bad numbers. If tests is failing for you, please create an issue 
// in github and we will track it.
const testPhoneNumberList = [
    {   
        'countryCode': 'CM', 
        'numbers': ['696092345', '696092445', '696092545', '677123456'],
        'badNumbers': ['6960923450', '6960924450', '6960925450', '6771234560']
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



testPhoneNumberList.forEach(function(obj){
    obj.numbers.forEach(e => console.assert(isNumberValidForRegion(e, obj.countryCode), `${e}(${obj.countryCode}) is expected to be correct, but failed.`));
});

testPhoneNumberList.forEach(function(obj){
    obj.badNumbers.forEach(e => console.assert(!isNumberValidForRegion(e, obj.countryCode), `${e}(${obj.countryCode}) is expected to fail.`));
});

// here our tests have passed. We just dummy log the phone number info to operators
// this just shows the importance of the isValid attribut on the phone number info object.
testPhoneNumberList.forEach(function(obj){
    obj.numbers.forEach(e => console.log(`${JSON.stringify(getPhoneNumberInfo(e, obj.countryCode))}`));
});

// We see here that we could process a number, but this number is not valid.
console.log("");
testPhoneNumberList.forEach(function(obj){
    obj.badNumbers.forEach(e => console.log(`${JSON.stringify(getPhoneNumberInfo(e, obj.countryCode))}`));
});