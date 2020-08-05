const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const url  = core.getInput('url');
    const method = core.getInput('method');
    const headers = JSON.parse(core.getInput('headers'));
    const data = JSON.parse(core.getInput('data'));

    axios.request({
        url: url,
        method: method,
        data: data,
        headers: headers
    }).then(function(response) {
        console.log(response.data);
    });
    const payload = JSON.stringify(data, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
