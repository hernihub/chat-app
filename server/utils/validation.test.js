var expect = require('expect');
var {isRealString} = require('./validation');

describe('validateCorrectString', () => {
    it('should reject non-string values', () => {
        var message = isRealString(98);

        expect(message).toBe(false);
    });
});

describe('validateIncorrectString', () => {
    it('should reject values with only spaces', () => {
        var str2 = '   ';
        var message2 = isRealString(str2);
        expect(message2).toBe(false);
    });
});

describe('validateNumber', () => {
    it('should allow string with non-space characters', () => {
        var str = '       Herni  ';
        var message = isRealString(str);

        expect(message).toBe(true);
    });
});