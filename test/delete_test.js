const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let jon;

    beforeEach((done) => {
        jon = new User({name: 'Jon'});
        jon.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        jon.remove()
            .then(() => User.findOne({ name: 'Jon'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // Remove a bunch or records with some given criteria
        User.remove({ name: 'Jon'})
            .then(() => User.findOne({ name: 'Jon'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        // Remove a single record with some given criteria
        User.findOneAndRemove({ name: 'Jon' })
            .then(() => User.findOne({ name: 'Jon'}))
            .then((user) => {
                assert(user === null);
                done();
            });

    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(jon._id)
            .then(() => User.findOne({ name: 'Jon'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});