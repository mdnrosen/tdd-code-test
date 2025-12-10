/**
 * Represents a person's details for generating a UK driving license number
 */
export interface PersonDetails {
  firstName: string;
  middleName?: string;
  surname: string;
  dateOfBirth: Date;
  gender: 'M' | 'F';
}

/**
 * Generates a UK driving license number from person details
 * 
 * UK Driving License Format (16 characters):
 * - Positions 1-5: First 5 characters of surname (padded with 9s if shorter)
 * - Position 6: Decade digit of birth year
 * - Positions 7-8: Month of birth (add 50 for females)
 * - Positions 9-10: Day of birth
 * - Position 11: Year digit of birth year
 * - Positions 12-13: Initials (first and middle, use 9 if no middle name)
 * - Position 14: Computer check digit (arbitrary, usually 9)
 * - Positions 15-16: Computer check digits (arbitrary, usually AA)
 * 
 * @param details - Person's details including name, DOB, and gender
 * @returns UK driving license number (16 characters)
 * 
 * @example
 * ```typescript
 * const license = generateDrivingLicense({
 *   firstName: 'John',
 *   surname: 'Smith',
 *   dateOfBirth: new Date('1990-05-15'),
 *   gender: 'M'
 * });
 * // Returns: SMITH905150J99AA
 * ```
 */
export function generateDrivingLicense(details: PersonDetails): string {
  const { firstName, middleName, surname, dateOfBirth, gender } = details;

  // Validate inputs
  if (!dateOfBirth) {
    throw new Error('Missing required fields');
  }

  if (!gender || (gender !== 'M' && gender !== 'F')) {
    throw new Error('Gender must be "M" or "F"');
  }

  // Validate and format names (these will throw specific errors)
  const surnameSection = formatSurname(surname);
  const initialsSection = formatInitials(firstName, middleName);

  // 2. Decade digit (position 6)
  const year = dateOfBirth.getFullYear();
  const decadeDigit = Math.floor((year % 100) / 10).toString();

  // 3. Month section (positions 7-8)
  const month = dateOfBirth.getMonth() + 1; // getMonth() is 0-indexed
  const adjustedMonth = gender === 'F' ? month + 50 : month;
  const monthSection = adjustedMonth.toString().padStart(2, '0');

  // 4. Day section (positions 9-10)
  const day = dateOfBirth.getDate();
  const daySection = day.toString().padStart(2, '0');

  // 5. Year digit (position 11)
  const yearDigit = (year % 10).toString();

  // 6. Computer check digit (position 14)
  const checkDigit = '9';

  // 7. Computer check digits (positions 15-16)
  const checkDigits = 'AA';

  return (
    surnameSection +
    decadeDigit +
    monthSection +
    daySection +
    yearDigit +
    initialsSection +
    checkDigit +
    checkDigits
  );
}

/**
 * Formats the surname to 5 characters, padding with 9s if necessary
 * @param surname - Person's surname
 * @returns 5-character surname section
 */
function formatSurname(surname: string): string {
  const cleaned = surname.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleaned.length === 0) {
    throw new Error('Surname must contain at least one letter');
  }

  if (cleaned.length >= 5) {
    return cleaned.substring(0, 5);
  }
  
  return cleaned.padEnd(5, '9');
}

/**
 * Formats the initials to 2 characters
 * @param firstName - Person's first name
 * @param middleName - Person's middle name (optional)
 * @returns 2-character initials section
 */
function formatInitials(firstName: string, middleName?: string): string {
  const firstInitial = firstName.toUpperCase().charAt(0);
  
  if (!firstInitial || !/[A-Z]/.test(firstInitial)) {
    throw new Error('First name must start with a letter');
  }

  let secondInitial = '9';
  if (middleName && middleName.length > 0) {
    const middleInitial = middleName.toUpperCase().charAt(0);
    if (/[A-Z]/.test(middleInitial)) {
      secondInitial = middleInitial;
    }
  }

  return firstInitial + secondInitial;
}

/**
 * Helper function to parse a date string in YYYY-MM-DD format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object
 */
export function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}
