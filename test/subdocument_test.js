const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const seubs = new User({ 
            name: 'Seubs', 
            posts: [{ title: 'PostTitle' }]
        });

        seubs.save()
            .then(() => User.findOne({ name: 'Seubs'}))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('Can add subdocuments to an existing record', (done) => {
        const seubs = new User({
            name: 'Seubs',
            posts: []
        });

        seubs.save()
            .then(() => User.findOne({ name: 'Seubs'}))
            .then((user) => {
                user.posts.push({ title: 'New Post'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'Seubs'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const seubs = new User({
            name: 'Seubs',
            posts: [{title: 'New Post'}]
        });

        seubs.save()
            .then(() => User.findOne({ name: 'Seubs'}))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Seubs'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
            
    });
});