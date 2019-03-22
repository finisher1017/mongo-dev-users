const assert = require('assert');
const User = require('../src/user');



describe('Updating records', () => {
    jimmy = new User({ name: 'Jimmy', likes: 0});
    jimmy.save();
    let jon;

    beforeEach((done) => {
        console.log('Creating user');
        jon = new User({ name: 'Jonathan', postCount: 0 });
        console.log(`User created: ${jon}`);
        console.log(`Saving user: ${jon}`);
        jon.save()
            .then(() => User.find( {name: 'Jonathan'} ))
            .then((user) => {
                console.log(`Initial saved user object: ${user}`);
                done();
            });
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Jonny');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        console.log('instance type using set and save');
        jon.set('name', 'Jonny');
        assertName(jon.save(), done);
            
    });

    it('A model instance can update', (done) => {
        console.log('A model instance can update');
        assertName(jon.updateOne({ name: 'Jonny'}), done);
    });

    it('A model class can update', (done) => {
        console.log('A model class can update');
        assertName(
            User.update({ name: 'Jonathan'}, {name: 'Jonny'}),
            done
        );
    });

    it('A model class can one record', (done) => {
        console.log('A model class can one record');
        assertName(
            User.findOneAndUpdate({ name: 'Jonathan'}, { name: 'Jonny'}),
            done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        console.log('A model class can find a record with an Id and update');
        assertName(
            User.findByIdAndUpdate(jon._id, { name: 'Jonny' }),
            done
        );
    });

    it('A user can have their postcount incremented by 1', (done) => {
        console.log('A user can have their postcount incremented by 1');
        User.updateOne({ name: 'Jonathan'}, { $inc: { likes: 1 } })
            .then(() => User.find( {name: 'Jonathan'} ))
            .then((user) => {
                console.log(user);
                assert(user[0].likes === 1);
                done();
            });
    });


});

