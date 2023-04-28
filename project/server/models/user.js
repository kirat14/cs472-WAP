
const users = [
    { id: 1, firstname: 'tarik', lastname: 'Moumini', username: 'tarik', password: 'azerty' }
]

module.exports = class User {

    constructor(id, username, password, firstname, lastname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    static login(username, password) {
        const foundUsers = users.filter(u => u.username === username);
        if (foundUsers.length === 0) {
            throw new Error(`User doesn't exist!`);
        }
        const foundUser = foundUsers.find(u => u.password === password);
    
        if (foundUser) {
            foundUser.accessToken = `${foundUser.id}-${foundUser.username}-${Date.now().toString()}`;
            return foundUser.accessToken;
        } else {
            throw new Error(`Incorrect password!`);
        }
    }

    static verify(accessToken) {
        return users.find(u => u.accessToken === accessToken);
    }
}