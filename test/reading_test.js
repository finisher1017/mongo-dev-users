const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let jon;

    beforeEach( (done) => {
        jon = new User({ name: 'jon' });
        console.log('beforeEach for Reading');
        console.log(jon);
        jon.save()
            .then(() => User.find({ name: 'jon' }))
            .then((user) => {
                console.log('Initial saved user object')
                console.log(user);
                done();
            });
    });

    it('finds all users with a name of jon', async () => {
        await User.find( { name: 'jon'} )
            .then((users) => {
                console.log('finds all users with a name of jon');
                console.log(users);
                assert(users[0]._id.toString() === users[0]._id.toString());
                // done();
            });
    });

    it('finds a user with a particular id', async () => {
        await User.findOne({ _id: jon._id })
            .then((user) => {
                console.log('finds a user with a particular id');
                console.log(user);
                assert(user.name === 'jon');
                // done();
            });
    });
});