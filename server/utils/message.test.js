var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'tester';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        var from = 'tester';
        var text = 'some text message for loc message test';
        var message = generateLocationMessage(from, '4.6', '-74');
        var url = message.url;

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});