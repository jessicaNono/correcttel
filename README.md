# Phone Number Formatter and Corrector

A JavaScript library to automatically format and correct phone numbers for international dialing, with a focus on
accuracy and ease of use.

## Features

- **Automatic Formatting**: Converts phone numbers into the E.164 standard format, making them ready for international
  calls.
- **Country Code Correction**: Adds the correct country code if missing or incorrect.
- **Mobile Operator Detection**: Identifies the mobile operator based on the phone number’s prefix.
- **Phone Number Information Retrieval**: Retrieves comprehensive information about a phone number, including
  formatting, country code, and operator.
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
const {
	formatPhoneNumber,
	getMobileOperator,
	getPhoneNumberInfo,
	Errors,
} = require("phone-number-formatter-corrector");

const formattedNumber = formatPhoneNumber("677123456", "CM");
console.log(formattedNumber); // Expected output: +237677123456

try {
	const operator = getMobileOperator("677123456", "CM");
	console.log(operator); // Expected output: MTN (or the appropriate operator for this number)

	const phoneNumberInfo = getPhoneNumberInfo("677123456", "CM");
	console.log(`Phone Number Info: ${JSON.stringify(phoneNumberInfo)}`);
	// Assertions to validate the phone number information
	console.assert(phoneNumberInfo.formattedNumber == formattedNumber);
	console.assert(phoneNumberInfo.countryCode == "CM");
	console.assert(phoneNumberInfo.operator == operator);
} catch (error) {
	console.log(error.message);
	console.log(error.message === Errors.UNKNOWN_OPERATOR);
}
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
- Returns an object with the phone number information, including the formatted number, country code, and mobile
  operator.

#### `Error handling`

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
