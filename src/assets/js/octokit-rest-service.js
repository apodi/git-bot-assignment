const octokit = require('@octokit/rest')();

const token = '<place token here>';
const owner = 'apodi';

octokit.authenticate({
    type: 'oauth',
    token: token
});

module.exports = {octokit : octokit , owner :owner};
