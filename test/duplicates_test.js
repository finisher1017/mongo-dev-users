// const assert = require('assert');
// const User = require('../src/user');

// describe('Duplicates records test', () => {
    
//     beforeEach((done) => {
//         let user = new User({ name: 'Bob'});
//         user.save()
//             .then(() => done()); 
//     });

//     it('Return users named Bob', (done) => {
//         User.find({ name: 'Bob' })
//             .then((users) => {
//                 console.log(users);
//                 done();
//             });

//     });
// });