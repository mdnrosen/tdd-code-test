# Candidate Instructions for TDD Code Test

## Welcome to the UK Driving License Number Generator Code Test

This repository contains a test suite for a UK driving license number generator. Your task is to implement the functionality following **strict Test Driven Development (TDD)** principles.

## IMPORTANT: Disable GitHub Copilot and AI Assistants!

Before you begin, **please disable GitHub Copilot and any other AI coding assistants**. This exercise is about practicing TDD fundamentals and problem-solving skills.

To disable Copilot in VS Code:

- Click the Copilot icon in the status bar (bottom right)
- Select "Disable Completions"

## IMPORTANT: Have fun.

Anyone not having fun will be punished according to the employee guidelines.

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
npm run test:watch  # Watch mode (recommended!)
```

### 4. The TDD Workflow

**Start in YOUR test file (`drivingLicense.candidate.test.ts`):**

1. **Write a small test** for one piece of functionality
2. **Run your tests** (`npm test`) - Watch it fail (RED ❌)
3. **Write minimal code** in `src/drivingLicense.ts` to make it pass
4. **Run your tests again** - Watch it pass (GREEN ✅)
5. **Refactor** if needed (REFACTOR 🔄)
6. **Repeat** with the next piece of functionality

**Periodically check the acceptance tests:**

```bash
npm run check
```

## Commands

```bash
npm test              # Run YOUR TDD tests
npm run test:watch    # Run YOUR tests in watch mode
npm run check         # Run the 10 acceptance tests
npm run build         # Build TypeScript
```

## Success Criteria

Your implementation is complete when:

- ✅ All 10 acceptance tests pass (`npm run check`)
- ✅ You've written comprehensive tests in YOUR test file using TDD
- ✅ All your TDD tests pass (`npm test`)
- ✅ You followed strict TDD principles throughout (Red → Green → Refactor)
- ✅ You had fun solving the problem! 😊

## Good Luck!

Remember the TDD mantra:

1. **Red** - Write a test that fails ❌
2. **Green** - Write minimal code to make it pass ✅
3. **Refactor** - Clean up while keeping tests green 🔄

**Have fun!** 🎉
