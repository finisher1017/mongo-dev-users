const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let billy, blogPost, comment
    beforeEach((done) => {
        billy = new User({ name: 'Billy' });
        blogPost = new BlogPost({ title: 'Billy\'s first post', content: 'Jon is an idiot!'});
        comment = new Comment({ content: 'Congrats on your first post, Billy'});

        billy.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = billy;
        
        Promise.all([billy.save(), blogPost.save(), comment.save()])
            .then(() => done());

    });

    xit('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Billy' })
            .populate('blogPosts')
            .then((user) => {
                console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'Billy\'s first post');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Billy'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Billy');
                assert(user.blogPosts[0].title === 'Billy\'s first post');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on your first post, Billy');
                assert(user.blogPosts[0].comments[0].user.name === 'Billy');
                assert(user.blogPosts[0].content === 'Jon is an idiot!');
                done();
            });
    });

});
