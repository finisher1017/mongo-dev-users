const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const desmund = new User({
            name: 'Desmund',
            posts: [{title: 'New Post'}]
        });

        desmund.save()
            .then(() => User.findOne({ name: 'Desmund'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});