/**
 * Example usage of the UK Driving License Generator
 * 
 * This file demonstrates how to use the generateDrivingLicense function
 * with various scenarios.
 */

import { generateDrivingLicense, parseDateString, PersonDetails } from './drivingLicense';

console.log('=== UK Driving License Number Generator Examples ===\n');

// Example 1: Male with no middle name
console.log('Example 1: John Smith (Male, born May 15, 1990)');
const example1: PersonDetails = {
  firstName: 'John',
  surname: 'Smith',
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
  gender: 'M'
};
console.log(`License Number: ${generateDrivingLicense(example1)}`);
console.log('Expected: SMITH905150J99AA\n');

// Example 2: Female with middle name
console.log('Example 2: Jane Mary Brown (Female, born February 4, 1981)');
const example2: PersonDetails = {
  firstName: 'Jane',
  middleName: 'Mary',
  surname: 'Brown',
  dateOfBirth: new Date(1981, 1, 4), // February 4, 1981
  gender: 'F'
};
console.log(`License Number: ${generateDrivingLicense(example2)}`);
console.log('Expected: BROWN852041JM9AA');
console.log('Note: Month is 52 (February + 50 for female)\n');

// Example 3: Short surname (padded with 9s)
console.log('Example 3: Bob Lee (Male, born December 25, 1995)');
const example3: PersonDetails = {
  firstName: 'Bob',
  surname: 'Lee',
  dateOfBirth: new Date(1995, 11, 25), // December 25, 1995
  gender: 'M'
};
console.log(`License Number: ${generateDrivingLicense(example3)}`);
console.log('Expected: LEE99912255B99AA');
console.log('Note: Surname padded with 9s (LEE99)\n');

// Example 4: Using parseDateString helper
console.log('Example 4: Sarah Jane Johnson (Female, born January 20, 1992)');
const example4: PersonDetails = {
  firstName: 'Sarah',
  middleName: 'Jane',
  surname: 'Johnson',
  dateOfBirth: parseDateString('1992-01-20'),
  gender: 'F'
};
console.log(`License Number: ${generateDrivingLicense(example4)}`);
console.log('Expected: JOHNS951202SJ9AA');
console.log('Note: Using parseDateString helper for date input\n');

// Example 5: Long surname (truncated to 5 characters)
console.log('Example 5: Alexander Montgomery (Male, born July 10, 1988)');
const example5: PersonDetails = {
  firstName: 'Alexander',
  surname: 'Montgomery',
  dateOfBirth: new Date(1988, 6, 10), // July 10, 1988
  gender: 'M'
};
console.log(`License Number: ${generateDrivingLicense(example5)}`);
console.log('Expected: MONTG807108A99AA');
console.log('Note: Surname truncated to 5 characters (MONTG)\n');

// Example 6: Different time periods
console.log('Example 6: Various decades');
const decades = [
  { name: 'Tom', surname: 'Wilson', year: 1950, month: 5, day: 10 },
  { name: 'Emma', surname: 'Taylor', year: 1975, month: 8, day: 20 },
  { name: 'Chris', surname: 'Martin', year: 2000, month: 3, day: 15 },
  { name: 'Olivia', surname: 'Davis', year: 2010, month: 11, day: 5 }
];

decades.forEach(({ name, surname, year, month, day }) => {
  const details: PersonDetails = {
    firstName: name,
    surname: surname,
    dateOfBirth: new Date(year, month, day),
    gender: 'M'
  };
  const license = generateDrivingLicense(details);
  console.log(`  ${name} ${surname} (born ${year}): ${license}`);
});

console.log('\n=== End of Examples ===');
