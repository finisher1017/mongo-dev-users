const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => { 
        
        const jon = new User({ name: 'Jon' });

        jon.save()
            .then(() => {
                // Has jon been saved successfully?
                assert(!jon.isNew);
                done();
            });
    });
});

