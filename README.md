# Phone Number Formatter and Corrector

A JavaScript library to automatically format and correct phone numbers for international dialing, with a focus on accuracy and ease of use.

## Features
- **Automatic Formatting**: Converts phone numbers into the E.164 standard format, making them ready for international calls.
- **Country Code Correction**: Adds the correct country code if missing or incorrect, defaulting to Cameroon (country code +237).
- **Caching**: Utilizes caching to store previously formatted and corrected phone numbers for quicker access in future requests.
- **Error Handling**: Provides clear error messages for invalid or incorrectly formatted phone numbers.

## Installation
Install the package using npm:

```sh
npm install phone-number-formatter
```

## Usage

```javascript
const { formatPhoneNumber } = require('phone-number-formatter');

const formattedNumber = formatPhoneNumber('677123456', 'CM');
console.log(formattedNumber); // Expected output: +237677123456
```

### API

#### `formatPhoneNumber(number, countryCode)`
- `number` (String): The phone number to be formatted.
- `countryCode` (String) [optional]: The country code to be used if the phone number is not in international format. Default is 'CM' (Cameroon).

## Technologies Used
- **google-libphonenumber**: For parsing, formatting, and validating international phone numbers.
- **node-cache**: For caching previously formatted and corrected phone numbers.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
