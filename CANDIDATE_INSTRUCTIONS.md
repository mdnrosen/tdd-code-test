# Candidate Instructions for TDD Code Test

## Welcome to the UK Driving License Number Generator Code Test

This repository contains a test suite for a UK driving license number generator. Your task is to implement the functionality following **strict Test Driven Development (TDD)** principles.

## IMPORTANT: Disable GitHub Copilot and AI Assistants!

Before you begin, **please disable GitHub Copilot and any other AI coding assistants**. This exercise is about practicing TDD fundamentals and problem-solving skills.

To disable Copilot in VS Code:

- Click the Copilot icon in the status bar (bottom right)
- Select "Disable Completions"

## IMPORTANT: Have fun.

It's Christmas. Anyone not having fun will be punished accordingly.

## What is TDD?

Test Driven Development follows a simple cycle:

1. **Red**: Write a test that fails
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests passing

## Your Task

Implement the `generateDrivingLicense` function in `src/drivingLicense.ts` that takes personal details and generates a valid UK driving license number.

**You will use TDD throughout this exercise!**

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Understand the Requirements

A UK driving license number is a 16-character code structured as follows:

| Position | Description                                         | Example      |
| -------- | --------------------------------------------------- | ------------ |
| 1-5      | First 5 letters of surname (pad with 9s if shorter) | SMITH        |
| 6        | Decade digit of birth year                          | 9 (for 1990) |
| 7-8      | Month of birth (add 50 for females)                 | 05 or 55     |
| 9-10     | Day of birth                                        | 15           |
| 11       | Last digit of birth year                            | 0 (for 1990) |
| 12-13    | First and middle initials (use 9 if no middle)      | J9           |
| 14       | Computer check digit                                | 9            |
| 15-16    | Computer check digits                               | AA           |

### 3. Understand the Two Test Files

This exercise has TWO test files with different purposes:

#### `tests/drivingLicense.test.ts` - ACCEPTANCE TESTS ✓

These are **10 pre-written tests** that verify your final solution works correctly. Think of these as the "requirements" - your code must pass all of them to be complete. **You cannot modify these tests!**

Run these with:

```bash
npm run check
```

#### `tests/drivingLicense.candidate.test.ts` - YOUR TDD TESTS 🧪

This is YOUR test file where you practice TDD! This is where you write tests FIRST, then implement code to make them pass. Start here and build up your solution incrementally.

Run YOUR tests with:

```bash
npm test
```

Or in watch mode (recommended):

```bash
npm run test:watch
```

### 4. The TDD Workflow

**Start in YOUR test file (`drivingLicense.candidate.test.ts`):**

1. **Write a small test** for one piece of functionality (e.g., "format surname to uppercase")
2. **Run your tests** (`npm test`) - Watch it fail (RED ❌)
3. **Write minimal code** in `src/drivingLicense.ts` to make it pass
4. **Run your tests again** - Watch it pass (GREEN ✅)
5. **Refactor** your code if needed (REFACTOR 🔄)
6. **Repeat** with the next piece of functionality

**Periodically check the acceptance tests:**

```bash
npm run check
```

This shows you how close you are to the final solution!

### 5. Suggested TDD Approach

Break the problem into small, testable pieces. Here's a suggested order:

#### Step 1: Surname Formatting

Write tests in YOUR file for:

- Converting surname to uppercase
- Removing special characters
- Padding short surnames with 9s
- Truncating long surnames to 5 characters

#### Step 2: Date Parsing

Write tests for:

- Parsing DD/MM/YYYY format
- Extracting day, month, year correctly

#### Step 3: Date Components

Write tests for:

- Calculating decade digit
- Calculating year digit
- Handling month adjustment for females
- Padding day/month to 2 digits

#### Step 4: Initials

Write tests for:

- Extracting first initial
- Extracting middle initial (or using '9')
- Converting to uppercase

#### Step 5: Integration

Write tests for:

- Combining all parts into 16-character license
- Full examples (might pass the acceptance tests now!)

#### Step 6: Validation

Write tests for:

- Invalid gender
- Missing fields
- Invalid date formats
- Any other edge cases

**Remember:** Build incrementally! Each step should have multiple small tests. Don't try to write the whole function at once.

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

- **Input format**: DD/MM/YYYY string (e.g., "15/05/1990")
- **Decade digit**: `Math.floor((year % 100) / 10)`
- **Month**: Add 50 if female
- **Day**: Zero-padded to 2 digits
- **Year digit**: Last digit of year

```typescript
// Male born May 15, 1990 ("15/05/1990"):
// Decade: 9, Month: 05, Day: 15, Year: 0

// Female born May 15, 1990 ("15/05/1990"):
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

### Run YOUR TDD Tests (Start Here!)

```bash
npm test                   # Run your tests once
npm run test:watch         # Run in watch mode (recommended!)
```

### Run Acceptance Tests (Check Progress)

```bash
npm run check              # Run the 10 acceptance tests
```

### Other Commands

```bash
npm run build              # Build TypeScript
npm run clean              # Clean build artifacts
```

## TDD Tips for Success

### Start Simple

Don't try to solve everything at once. Make the first test pass with the simplest possible code, even if it's hardcoded. You'll generalize as you tackle more tests.

### Read the Error Messages

Jest provides excellent error messages. Read them carefully - they tell you exactly what's expected vs. what you're returning.

### One Test at a Time

Resist the urge to skip ahead. TDD works best when you focus on one failing test at a time.

### Refactor Fearlessly

Once tests are green, you can refactor with confidence. The tests act as a safety net.

### Have Fun!

TDD can feel slow at first, but it's a powerful technique. Embrace the process and enjoy the satisfaction of watching tests turn green! 🎉

## Success Criteria

Your implementation is complete when:

- ✅ All 10 acceptance tests pass (`npm run check`)
- ✅ You've written comprehensive tests in YOUR test file using TDD
- ✅ All your TDD tests pass (`npm test`)
- ✅ Code is clean and well-structured
- ✅ You followed strict TDD principles throughout (Red → Green → Refactor)
- ✅ You had fun solving the problem! 😊

## Test Examples You Should Consider Writing

Here are some ideas for additional tests you should write:

### Validation Tests

- Missing or empty first name
- Missing or empty surname
- Invalid gender (not 'M' or 'F')
- Surname with only special characters
- Invalid date format
- Invalid dates (e.g., "32/01/2000", "15/13/2000")

### Edge Case Tests

- Leap year dates (February 29)
- First day of year (January 1)
- Last day of year (December 31)
- Different decades (1950s, 1980s, 2000s, 2010s)
- Different year digits

### Special Character Tests

- Hyphens in surnames (e.g., "Smith-Jones")
- Apostrophes in surnames (e.g., "O'Brien")
- Spaces in surnames

### Case Handling Tests

- Lowercase names
- Mixed case names
- Uppercase names

### Example 1: Basic Male

```typescript
Input: {
  firstName: 'John',
  surname: 'Smith',
  dateOfBirth: '15/05/1990', // DD/MM/YYYY format
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
  dateOfBirth: '04/02/1981', // DD/MM/YYYY format
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
  dateOfBirth: '25/12/1995', // DD/MM/YYYY format
  gender: 'M'
}
Output: 'LEE99912255B99AA'
// Note: "LEE" padded to "LEE99"
```

### Example 4: Female with Middle Name

```typescript
Input: {
  firstName: 'Sarah',
  middleName: 'Jane',
  surname: 'Johnson',
  dateOfBirth: '20/01/1992', // DD/MM/YYYY format
  gender: 'F'
}
Output: 'JOHNS951202SJ9AA'
```

### Example 5: Long Surname

```typescript
Input: {
  firstName: 'Alexander',
  surname: 'Montgomery',
  dateOfBirth: '10/07/1988', // DD/MM/YYYY format
  gender: 'M'
}
Output: 'MONTG807108A99AA'
// Note: "Montgomery" truncated to "MONTG"
```

## Common Mistakes to Avoid

1. **Not Following TDD**: Don't write all the code first! Write one test in YOUR file, make it pass, then move on.
2. **Writing Tests in the Wrong File**: Write YOUR tests in `drivingLicense.candidate.test.ts`, not in the acceptance test file!
3. **Date Parsing**: Remember to parse DD/MM/YYYY format correctly (day first, then month, then year)
4. **Female Month Adjustment**: Don't forget to add 50 to the month for females
5. **String Padding**: Use `.padStart()` or `.padEnd()` for zero-padding
6. **Character Extraction**: Use `.charAt()` or `.substring()` carefully
7. **Validation Order**: Validate early to provide clear error messages
8. **Using Copilot**: Seriously, turn it off! This exercise is about your problem-solving skills.

## Time Estimate

This exercise typically takes 1-2 hours for developers familiar with TypeScript and TDD.

## Getting Help

If you're stuck:

1. Start with YOUR test file - write the smallest possible test
2. Read the test error message carefully
3. Write the simplest code to make it pass (even hardcoding is okay at first!)
4. Check the acceptance tests occasionally to see progress
5. Remember: small steps are better than big leaps in TDD!

## Final Reminder

**Have fun with this!** TDD might feel restrictive at first, but it's actually liberating once you get into the rhythm. Enjoy the dopamine hit of turning red tests green! 🎯

Remember:

- Start in YOUR test file (`drivingLicense.candidate.test.ts`)
- Write tests FIRST, code SECOND
- Check acceptance tests (`npm run check`) to track overall progress

## Good Luck!

Remember the TDD mantra:

1. **Red** - Write a test that fails ❌
2. **Green** - Write minimal code to make it pass ✅
3. **Refactor** - Clean up while keeping tests green 🔄

The goal is to:

- Practice strict TDD principles
- Write comprehensive tests for validation and edge cases
- Write clean, maintainable code
- **Have fun solving the problem!** 🎉

Your ability to follow TDD and identify edge cases is as important as making the provided tests pass. Enjoy the journey!
