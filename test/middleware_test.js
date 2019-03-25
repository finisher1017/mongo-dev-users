const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let billy, blogPost;
    beforeEach((done) => {
        billy = new User({ name: 'Billy' });
        blogPost = new BlogPost({ title: 'Billy\'s first post', content: 'Jon is an idiot!'});

        billy.blogPosts.push(blogPost);
        
        Promise.all([billy.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', () => {
        billy.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                console.log(count);
                assert(count === 0);
            });
    });
});
