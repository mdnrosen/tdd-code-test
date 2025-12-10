import { generateDrivingLicense, parseDateString, PersonDetails } from '../src/drivingLicense';

describe('UK Driving License Generator', () => {
  describe('generateDrivingLicense', () => {
    it('should generate correct license for male with no middle name', () => {
      const details: PersonDetails = {
        firstName: 'John',
        surname: 'Smith',
        dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license).toBe('SMITH905150J99AA');
      expect(license).toHaveLength(16);
    });

    it('should generate correct license for female with middle name', () => {
      const details: PersonDetails = {
        firstName: 'Jane',
        middleName: 'Mary',
        surname: 'Brown',
        dateOfBirth: new Date(1981, 1, 4), // February 4, 1981
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      
      expect(license).toBe('BROWN852041JM9AA');
      expect(license).toHaveLength(16);
    });

    it('should pad short surnames with 9s', () => {
      const details: PersonDetails = {
        firstName: 'Bob',
        surname: 'Lee',
        dateOfBirth: new Date(1995, 11, 25), // December 25, 1995
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license).toBe('LEE99912255B99AA');
      expect(license.substring(0, 5)).toBe('LEE99');
    });

    it('should truncate long surnames to 5 characters', () => {
      const details: PersonDetails = {
        firstName: 'Alexander',
        surname: 'Montgomery',
        dateOfBirth: new Date(1988, 6, 10), // July 10, 1988
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license).toBe('MONTG807108A99AA');
      expect(license.substring(0, 5)).toBe('MONTG');
    });

    it('should add 50 to month for female drivers', () => {
      const details: PersonDetails = {
        firstName: 'Sarah',
        surname: 'Johnson',
        dateOfBirth: new Date(1992, 0, 20), // January 20, 1992
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      
      // Month should be 51 (01 + 50)
      expect(license.substring(6, 8)).toBe('51');
      expect(license).toBe('JOHNS951202S99AA');
    });

    it('should not add 50 to month for male drivers', () => {
      const details: PersonDetails = {
        firstName: 'Michael',
        surname: 'Davis',
        dateOfBirth: new Date(1992, 0, 20), // January 20, 1992
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      // Month should be 01
      expect(license.substring(6, 8)).toBe('01');
      expect(license).toBe('DAVIS901202M99AA');
    });

    it('should handle December correctly for males', () => {
      const details: PersonDetails = {
        firstName: 'Tom',
        surname: 'Wilson',
        dateOfBirth: new Date(1985, 11, 31), // December 31, 1985
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(6, 8)).toBe('12');
      expect(license).toBe('WILSO812315T99AA');
    });

    it('should handle December correctly for females', () => {
      const details: PersonDetails = {
        firstName: 'Emma',
        surname: 'Taylor',
        dateOfBirth: new Date(1985, 11, 31), // December 31, 1985
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(6, 8)).toBe('62'); // 12 + 50
      expect(license).toBe('TAYLO862315E99AA');
    });

    it('should use 9 for missing middle name', () => {
      const details: PersonDetails = {
        firstName: 'Chris',
        surname: 'Martin',
        dateOfBirth: new Date(1980, 5, 15), // June 15, 1980
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(11, 13)).toBe('C9');
      expect(license).toBe('MARTI806150C99AA');
    });

    it('should handle two-digit days correctly', () => {
      const details: PersonDetails = {
        firstName: 'Anna',
        surname: 'White',
        dateOfBirth: new Date(1993, 8, 5), // September 5, 1993
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(8, 10)).toBe('05');
    });

    it('should handle different decades correctly', () => {
      const testCases = [
        { year: 1950, expectedDecade: '5' },
        { year: 1965, expectedDecade: '6' },
        { year: 1979, expectedDecade: '7' },
        { year: 1980, expectedDecade: '8' },
        { year: 1995, expectedDecade: '9' },
        { year: 2000, expectedDecade: '0' },
        { year: 2010, expectedDecade: '1' },
        { year: 2023, expectedDecade: '2' }
      ];

      testCases.forEach(({ year, expectedDecade }) => {
        const details: PersonDetails = {
          firstName: 'Test',
          surname: 'Person',
          dateOfBirth: new Date(year, 0, 1),
          gender: 'M'
        };

        const license = generateDrivingLicense(details);
        expect(license.charAt(5)).toBe(expectedDecade);
      });
    });

    it('should handle year digits correctly', () => {
      const testCases = [
        { year: 1980, expectedDigit: '0' },
        { year: 1985, expectedDigit: '5' },
        { year: 1999, expectedDigit: '9' },
        { year: 2000, expectedDigit: '0' },
        { year: 2007, expectedDigit: '7' }
      ];

      testCases.forEach(({ year, expectedDigit }) => {
        const details: PersonDetails = {
          firstName: 'Test',
          surname: 'Person',
          dateOfBirth: new Date(year, 0, 1),
          gender: 'M'
        };

        const license = generateDrivingLicense(details);
        expect(license.charAt(10)).toBe(expectedDigit);
      });
    });

    it('should convert surname to uppercase', () => {
      const details: PersonDetails = {
        firstName: 'john',
        surname: 'smith',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(0, 5)).toBe('SMITH');
    });

    it('should convert initials to uppercase', () => {
      const details: PersonDetails = {
        firstName: 'john',
        middleName: 'peter',
        surname: 'Smith',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      
      expect(license.substring(11, 13)).toBe('JP');
    });

    it('should handle hyphens and spaces in surnames', () => {
      const details: PersonDetails = {
        firstName: 'Mary',
        surname: 'Smith-Jones',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      
      // Should remove non-letter characters
      expect(license.substring(0, 5)).toBe('SMITH');
    });
  });

  describe('Input validation', () => {
    it('should throw error for missing first name', () => {
      const details = {
        firstName: '',
        surname: 'Smith',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'M' as const
      };

      expect(() => generateDrivingLicense(details)).toThrow('First name must start with a letter');
    });

    it('should throw error for missing surname', () => {
      const details = {
        firstName: 'John',
        surname: '',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'M' as const
      };

      expect(() => generateDrivingLicense(details)).toThrow();
    });

    it('should throw error for invalid gender', () => {
      const details = {
        firstName: 'John',
        surname: 'Smith',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'X' as any
      };

      expect(() => generateDrivingLicense(details)).toThrow('Gender must be "M" or "F"');
    });

    it('should throw error for surname with only special characters', () => {
      const details: PersonDetails = {
        firstName: 'John',
        surname: '---',
        dateOfBirth: new Date(1990, 0, 1),
        gender: 'M'
      };

      expect(() => generateDrivingLicense(details)).toThrow('Surname must contain at least one letter');
    });
  });

  describe('parseDateString helper', () => {
    it('should parse date string correctly', () => {
      const date = parseDateString('1990-05-15');
      
      expect(date.getFullYear()).toBe(1990);
      expect(date.getMonth()).toBe(4); // 0-indexed, so May is 4
      expect(date.getDate()).toBe(15);
    });

    it('should handle single digit months and days', () => {
      const date = parseDateString('2000-01-05');
      
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(5);
    });
  });

  describe('Real-world examples', () => {
    it('should generate correct license for example 1: John Smith born May 15, 1990', () => {
      const details: PersonDetails = {
        firstName: 'John',
        surname: 'Smith',
        dateOfBirth: parseDateString('1990-05-15'),
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      expect(license).toBe('SMITH905150J99AA');
    });

    it('should generate correct license for example 2: Jane Brown born Feb 4, 1981', () => {
      const details: PersonDetails = {
        firstName: 'Jane',
        surname: 'Brown',
        dateOfBirth: parseDateString('1981-02-04'),
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      expect(license).toBe('BROWN852041J99AA');
    });

    it('should generate correct license for example 3: Bob Lee born Dec 25, 1995', () => {
      const details: PersonDetails = {
        firstName: 'Bob',
        surname: 'Lee',
        dateOfBirth: parseDateString('1995-12-25'),
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      expect(license).toBe('LEE99912255B99AA');
    });

    it('should generate correct license for example 4: Sarah Jane Johnson born Jan 20, 1992', () => {
      const details: PersonDetails = {
        firstName: 'Sarah',
        middleName: 'Jane',
        surname: 'Johnson',
        dateOfBirth: parseDateString('1992-01-20'),
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      expect(license).toBe('JOHNS951202SJ9AA');
    });
  });

  describe('Edge cases', () => {
    it('should handle leap year date', () => {
      const details: PersonDetails = {
        firstName: 'Leap',
        surname: 'Year',
        dateOfBirth: new Date(2000, 1, 29), // February 29, 2000
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      expect(license.substring(8, 10)).toBe('29');
    });

    it('should handle first day of year', () => {
      const details: PersonDetails = {
        firstName: 'New',
        surname: 'Year',
        dateOfBirth: new Date(2000, 0, 1), // January 1, 2000
        gender: 'F'
      };

      const license = generateDrivingLicense(details);
      expect(license.substring(6, 10)).toBe('5101'); // Month 51, Day 01
    });

    it('should handle last day of year', () => {
      const details: PersonDetails = {
        firstName: 'End',
        surname: 'Year',
        dateOfBirth: new Date(1999, 11, 31), // December 31, 1999
        gender: 'M'
      };

      const license = generateDrivingLicense(details);
      expect(license.substring(6, 10)).toBe('1231'); // Month 12, Day 31
    });
  });
});
