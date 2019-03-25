const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let jon, jonathan, jonny, seubs;

    beforeEach( (done) => {
        jon = new User({ name: 'jon' });
        jonathan = new User({ name: 'jonathan' });
        jonny = new User({ name: 'jonny' });
        seubs = new User({ name: 'seubs' });

        Promise.all([jon.save(), jonathan.save(), jonny.save(), seubs.save()])
            .then((user) => done());
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

    it.only('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'jonathan');
                assert(users[1].name === 'jonny');
                done();
            });
    });
});