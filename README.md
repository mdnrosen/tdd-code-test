# TDD Code Test: UK Driving License Number Generator

A TypeScript application for generating UK driving license numbers from personal details. This repository is designed for Test Driven Development (TDD) code tests where candidates write tests first, then implement the functionality.

## Overview

The UK driving license number is a 16-character code algorithmically generated from:
- Surname (first 5 characters)
- Date of birth (year, month, day)
- Gender
- First and middle initials

## UK Driving License Format

The 16-character license number is structured as follows:

| Position | Description | Example |
|----------|-------------|---------|
| 1-5 | First 5 letters of surname (padded with 9s if shorter) | SMITH |
| 6 | Decade digit of birth year | 9 (for 1990) |
| 7-8 | Month of birth (add 50 for females) | 05 (male), 55 (female) |
| 9-10 | Day of birth | 15 |
| 11 | Last digit of birth year | 0 (for 1990) |
| 12-13 | First and middle initials (9 if no middle name) | J9 |
| 14 | Computer check digit | 9 |
| 15-16 | Computer check digits | AA |

### Example

**John Smith, born May 15, 1990 (Male)**
- Result: `SMITH905159J99AA`

**Jane Brown, born February 4, 1981 (Female, no middle name)**
- Result: `BROWN852041J99AA`
- Note: Month is 52 (February + 50 for female)

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```typescript
import { generateDrivingLicense, PersonDetails } from './src';

const details: PersonDetails = {
  firstName: 'John',
  surname: 'Smith',
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
  gender: 'M'
};

const license = generateDrivingLicense(details);
console.log(license); // Output: SMITH905159J99AA
```

### With Middle Name

```typescript
const details: PersonDetails = {
  firstName: 'Sarah',
  middleName: 'Jane',
  surname: 'Johnson',
  dateOfBirth: new Date(1992, 0, 20), // January 20, 1992
  gender: 'F'
};

const license = generateDrivingLicense(details);
console.log(license); // Output: JOHNS951202SJ9AA
```

### Using Date Helper

```typescript
import { generateDrivingLicense, parseDateString } from './src';

const details = {
  firstName: 'Bob',
  surname: 'Lee',
  dateOfBirth: parseDateString('1995-12-25'),
  gender: 'M' as const
};

const license = generateDrivingLicense(details);
console.log(license); // Output: LEE99912255B99AA
```

## Scripts

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Build TypeScript
npm run build

# Clean build artifacts
npm run clean
```

## Running Tests

```bash
npm test
```

The test suite includes:
- Basic functionality tests
- Edge case handling
- Input validation
- Real-world examples
- Gender-specific logic (month adjustment for females)
- Surname padding and truncation
- Initial handling with and without middle names

## Test Coverage

Run tests with coverage report:

```bash
npm run test:coverage
```

## For TDD Code Test Candidates

### Your Task

Implement the `generateDrivingLicense` function in `src/drivingLicense.ts` following TDD principles:

1. **Start by reading and understanding the tests** in `tests/drivingLicense.test.ts`
2. **Run the tests** to see them fail: `npm test`
3. **Implement the function** incrementally, one test at a time
4. **Run tests frequently** to ensure each piece works
5. **Refactor** your code while keeping tests green

### TDD Workflow

1. **Red**: Write a test that fails
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests passing

### Key Rules to Implement

- Surname: Take first 5 characters, uppercase, pad with 9s if shorter
- Decade digit: `Math.floor((year % 100) / 10)`
- Month: For females, add 50 to the month number
- Day: Always 2 digits, zero-padded
- Year digit: Last digit of the year
- Initials: First and middle initials, use '9' if no middle name
- Check digits: Use '9' and 'AA' for positions 14-16

### Validation Requirements

Your implementation should:
- Validate that required fields are present
- Handle missing middle names
- Convert names to uppercase
- Remove non-letter characters from surnames
- Throw appropriate errors for invalid inputs

## Project Structure

```
tdd-code-test/
├── src/
│   ├── drivingLicense.ts   # Main implementation
│   └── index.ts            # Exports
├── tests/
│   └── drivingLicense.test.ts  # Unit tests
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## License

ISC
