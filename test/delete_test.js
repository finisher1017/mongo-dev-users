const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let jon;

    beforeEach( (done) => {
        jon = new User({name: 'Jonny'});
        jon.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        jon.delete()
            .then(() => User.findOne({name: 'Jonny'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // Remove a bunch or records with some given criteria
        User.deleteOne({ name: 'Jonny'})
            .then(() => User.findOne({ name: 'Jonny'}))
            .then((user) => {
                console.log('class method remove');
                console.log(user);
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        // Remove a single record with some given criteria
        User.findOneAndRemove({ name: 'Jonny' })
            .then(() => User.findOne({ name: 'Jonny' }))
            .then((user) => {
                console.log('class method findOneAndRemove');
                console.log(user);
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



// (node:10847) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
// Collections dropped
// (node:10847) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
// Collections dropped
// Collections dropped
// (node:10847) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.