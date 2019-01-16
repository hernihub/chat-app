var expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
    var users;

    // initializes data
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'node course'
        }, {
            id: '2',
            name: 'Alex',
            room: 'react course'
        },{
            id: '3',
            name: 'Herni',
            room: 'node course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'Herni',
            room: 'Space'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toMatchObject([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('node course');

        expect(userList).toMatchObject(['Mike', 'Herni']);
    });

    it('should find a user', () => {
        var user = users.getUser('1');

        expect(user.name).toBe('Mike');
    });

    it('should not find a user', () => {
        var user = users.getUser('31');

        expect(user).toBeFalsy();
    });

    it('should remove a user', () => {
        var user = users.removeUser('1');

        expect(user.name).toBe('Mike');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('31');

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
});