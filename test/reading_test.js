const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let jon;

    beforeEach((done) => {
        jon = new User({ name: 'jon' });
        jon.save()
            .then(() => done());
    });

    it('finds all users with a name of jon', (done) => {
        User.find( { name: 'jon'} )
            .then((users) => {
                assert(users[0]._id.toString() === jon._id.toString());
                done()
            });
    });

    it('finds a user with a particular id', (done) => {
        User.findOne({ _id: jon._id })
            .then((user) => {
                assert(user.name === 'jon');
                done();
            });
    });
});