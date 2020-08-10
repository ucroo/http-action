const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const url  = core.getInput('url');
    const method = core.getInput('method');
    const headers = JSON.parse(core.getInput('headers'));
    const data = JSON.parse(core.getInput('data'));
    data["github"] = github.context;
    data.github.payload.repository = {
        url: data.github.payload.repository.url
    };
    if (github.context.eventName === "pull_request") {
        data.github.payload.pull_request.head = null;
        data.github.payload.pull_request.base = null;
    }
    core.setOutput("response", "processing");
    axios.request({
        url: url,
        method: method,
        data: data,
        headers: headers
    }).then(function(response) {
    });
    const payload = JSON.stringify(data, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
