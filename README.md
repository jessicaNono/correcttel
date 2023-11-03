# Phone Number Formatter and Corrector

A JavaScript library to automatically format and correct phone numbers for international dialing, with a focus on
accuracy and ease of use.

## Features

- **Automatic Formatting**: Converts phone numbers into the E.164 standard format, making them ready for international
  calls.
- **Country Code Correction**: Adds the correct country code if missing or incorrect.
- **Mobile Operator Detection**: Identifies the mobile operator based on the phone number’s prefix.
- **Phone Number Length Validation**: Validates the length of a phone number to ensure it is correct for the specified
  country.
- **Phone Number Information Retrieval**: Retrieves comprehensive information about a phone number, including
  formatting, country code, operator, and length validation.
- **Caching**: Utilizes caching to store previously formatted and corrected phone numbers for quicker access in future
  requests.
- **Error Handling**: Provides clear error messages for invalid or incorrectly formatted phone numbers.

## Installation

Install the package using npm:

```sh
npm install phone-number-formatter-corrector
```

## Usage

```javascript
const { formatPhoneNumber, getMobileOperator, getPhoneNumberInfo, isNumberValidForRegion } = require("./index");

const phoneNumber = "17645685126";
const code = "DE";
//TODO: we might move this list to a test-config file and import
// if it becomes to long.
// To add more validation, please add an object which has a countryCode key and provide
// the list of good and bad numbers. If tests is failing for you, please create an issue
// in github and we will track it.
const testPhoneNumberList = [
	{
		countryCode: "CM",
		numbers: ["6960923457683", "696092445", "696092545", "677123456"],
		badNumbers: ["6960923450", "6960924450", "6960925450", "6771234560"],
	},
];

try {
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
	console.log(error.message == Errors.UNKNOWN_OPERATOR);
}

testPhoneNumberList.forEach(function (obj) {
	obj.numbers.forEach((e) =>
		console.assert(
			isNumberValidForRegion(e, obj.countryCode),
			`${e}(${obj.countryCode}) is expected to be correct, but failed.`
		)
	);
});

testPhoneNumberList.forEach(function (obj) {
	obj.badNumbers.forEach((e) =>
		console.assert(!isNumberValidForRegion(e, obj.countryCode), `${e}(${obj.countryCode}) is expected to fail.`)
	);
});

// here our tests have passed. We just dummy log the phone number info to operators
// this just shows the importance of the isValid attribut on the phone number info object.
testPhoneNumberList.forEach(function (obj) {
	obj.numbers.forEach((e) => console.log(`${JSON.stringify(getPhoneNumberInfo(e, obj.countryCode))}`));
});

// We see here that we could process a number, but this number is not valid.
console.log("");
testPhoneNumberList.forEach(function (obj) {
	obj.badNumbers.forEach((e) => console.log(`${JSON.stringify(getPhoneNumberInfo(e, obj.countryCode))}`));
});
```

### API

#### `formatPhoneNumber(number, countryCode)`

- `number` (String): The phone number to be formatted.
- `countryCode` (String): The country code to be used if the phone number is not in international format.

#### `getMobileOperator(number, countryCode)`

- `number` (String): The phone number for which the mobile operator will be determined.
- `countryCode` (String): The country code for the provided phone number.

#### `getPhoneNumberInfo(number, countryCode)`

- `number` (String): The phone number to retrieve information for.
- `countryCode` (String): The country code for the provided phone number.
- Returns an object with the phone number information, including the formatted number, country code, mobile operator,
  and length validation.

#### `isPhoneNumberLengthCorrect(number, countryCode)`

- `number` (String): The phone number to validate the length for.
- `countryCode` (String): The country code for the provided phone number.
- Returns an object with the validation result code and message. A result code of `0` indicates the length is correct,
  `-1` indicates incorrect length, and `-2` indicates no fixed length was found for the country.

#### `Errors`

Here are known errors.

|           Errors            |
| :-------------------------: |
|      UNKNOWN_OPERATOR       |
| UNKNOWN_COUNTRY_OR_OPERATOR |

## Technologies Used

- **google-libphonenumber**: For parsing, formatting, and validating international phone numbers.
- **node-cache**: For caching previously formatted and corrected phone numbers.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

```

```
