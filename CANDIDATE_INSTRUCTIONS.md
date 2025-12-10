# Candidate Instructions for TDD Code Test

## Welcome to the UK Driving License Number Generator Code Test

This repository contains a test suite for a UK driving license number generator. Your task is to implement the functionality following **Test Driven Development (TDD)** principles.

## What is TDD?

Test Driven Development follows a simple cycle:
1. **Red**: Write a test that fails
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests passing

## Your Task

Implement the `generateDrivingLicense` function in `src/drivingLicense.ts` that takes personal details and generates a valid UK driving license number.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Understand the Requirements

A UK driving license number is a 16-character code structured as follows:

| Position | Description | Example |
|----------|-------------|---------|
| 1-5 | First 5 letters of surname (pad with 9s if shorter) | SMITH |
| 6 | Decade digit of birth year | 9 (for 1990) |
| 7-8 | Month of birth (add 50 for females) | 05 or 55 |
| 9-10 | Day of birth | 15 |
| 11 | Last digit of birth year | 0 (for 1990) |
| 12-13 | First and middle initials (use 9 if no middle) | J9 |
| 14 | Computer check digit | 9 |
| 15-16 | Computer check digits | AA |

### 3. Read the Tests

Before writing any code, read through `tests/drivingLicense.test.ts` to understand:
- What inputs the function receives
- What outputs it should produce
- Edge cases to handle
- Validation requirements

### 4. Run the Tests (They Should Fail)

```bash
npm test
```

All tests should fail initially. This is expected!

### 5. Start Implementing

Follow the TDD cycle:

#### Iteration 1: Basic Structure
1. Look at the first test: "should generate correct license for male with no middle name"
2. Write minimal code to make this test pass
3. Run `npm test` to verify
4. Refactor if needed

#### Iteration 2: Handle More Cases
1. Look at the next failing test
2. Write code to make it pass
3. Run `npm test` to verify all previous tests still pass
4. Refactor if needed

#### Continue Until All Tests Pass
Keep following the TDD cycle until all 28 tests pass.

## Key Implementation Tips

### Surname Formatting
- Convert to uppercase
- Remove non-letter characters
- Take first 5 characters
- Pad with 9s if shorter than 5 characters

```typescript
// Examples:
"Smith" → "SMITH"
"Lee" → "LEE99"
"Montgomery" → "MONTG"
```

### Date of Birth Handling
- **Decade digit**: `Math.floor((year % 100) / 10)`
- **Month**: Add 50 if female
- **Day**: Zero-padded to 2 digits
- **Year digit**: Last digit of year

```typescript
// Male born May 15, 1990:
// Decade: 9, Month: 05, Day: 15, Year: 0

// Female born May 15, 1990:
// Decade: 9, Month: 55, Day: 15, Year: 0
```

### Initials
- First initial from firstName
- Second initial from middleName, or '9' if no middle name
- Convert to uppercase

### Validation
Your function should throw errors for:
- Missing required fields
- Invalid gender (must be 'M' or 'F')
- Invalid names (must contain letters)

## Running Your Code

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Check Test Coverage
```bash
npm run test:coverage
```

### Build TypeScript
```bash
npm run build
```

### Run Examples
```bash
npx ts-node src/examples.ts
```

## Success Criteria

Your implementation is complete when:
- ✅ All 28 tests pass
- ✅ Test coverage is >95%
- ✅ Code is clean and well-structured
- ✅ Edge cases are handled correctly
- ✅ Validation works as expected

## Example Test Cases to Understand

### Example 1: Basic Male
```typescript
Input: {
  firstName: 'John',
  surname: 'Smith',
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
  gender: 'M'
}
Output: 'SMITH905150J99AA'
```

### Example 2: Female with Middle Name
```typescript
Input: {
  firstName: 'Jane',
  middleName: 'Mary',
  surname: 'Brown',
  dateOfBirth: new Date(1981, 1, 4), // February 4, 1981
  gender: 'F'
}
Output: 'BROWN852041JM9AA'
// Note: Month is 52 (February = 02, +50 for female)
```

### Example 3: Short Surname
```typescript
Input: {
  firstName: 'Bob',
  surname: 'Lee',
  dateOfBirth: new Date(1995, 11, 25), // December 25, 1995
  gender: 'M'
}
Output: 'LEE99912255B99AA'
// Note: "LEE" padded to "LEE99"
```

## Common Mistakes to Avoid

1. **Date Month Indexing**: JavaScript Date months are 0-indexed (January = 0, December = 11)
2. **Female Month Adjustment**: Don't forget to add 50 to the month for females
3. **String Padding**: Use `.padStart()` or `.padEnd()` for zero-padding
4. **Character Extraction**: Use `.charAt()` or `.substring()` carefully
5. **Validation Order**: Validate early to provide clear error messages

## Time Estimate

This exercise typically takes 1-2 hours for developers familiar with TypeScript and TDD.

## Getting Help

If you're stuck:
1. Read the test description carefully
2. Check the error message from Jest
3. Look at similar passing tests
4. Review the README.md for format specifications
5. Run examples to see expected behavior

## Good Luck!

Remember: The goal is not just to make tests pass, but to practice TDD principles and write clean, maintainable code.
