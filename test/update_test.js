const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let jon;

    beforeEach((done) => {
        jon = new User({name: 'Jonathan'});
        jon.save()
            .then(() => done());
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
        
        jon.set('name', 'Jonny');
        assertName(jon.save(), done);
            
    });

    it('A model instance can update', (done) => {
        assertName(jon.update({ name: 'Jonny'}), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({ name: 'Jonathan'}, {name: 'Jonny'}),
            done
        );
    });

    it('A model class can one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Jonathan'}, { name: 'Jonny'}),
            done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(jon._id, { name: 'Jonny'}),
            done
        );
    });


});

