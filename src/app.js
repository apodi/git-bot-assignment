import './assets/scss/app.scss';
import "@octokit/rest";
import 'popper.js';
import "bootstrap";
import './assets/media/logo.png';
const helper = require('./assets/js/recast-service');
const octokit = require('./assets/js/octokit-rest-service');

const createRepo = require('./assets/js/repository/create-repo-view');
const createIssue = require('./assets/js/issue/create-issue-view');

const displayIssue = require('./assets/js/issue/display-issue-view');


const addComment = require('./assets/js/issue/add-comment-view');

const addCollab = require('./assets/js/collaborator/add-collaborator-view');
const closeIssue = require('./assets/js/issue/close-issue-view');
const errorPage = require('./assets/js/error');



//recast command 
$('#command-form').on('submit', function (e) {
    var repoNameElement = $('#command-text');
    e.preventDefault();
    if (!repoNameElement.val()) {
        // Add errors highlight
        repoNameElement.closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        repoNameElement.closest('.form-group').removeClass('has-error').addClass('has-success');
        const obj = {
            "text": repoNameElement.val(),
            "language": "en"
        };
        helper.getIntent('https://api.recast.ai/v2', '/request', obj)
            .then(response => {
                console.log(response.results);
                if ((response.results.intents.length == 1) && response.results.entities.hasOwnProperty('repository')) {
                    if (response.results.intents[0].slug == "git-repository") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        document.getElementById("gitform").innerHTML = createRepo(response.results.entities.repository[0].value);
                    }
                } else if ((response.results.intents.length == 1) && response.results.entities.hasOwnProperty('issue')) {
                    if (response.results.intents[0].slug == "create-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        createIssue(response.results.entities.issue[0].value);
                    }
                } else if (response.results.intents.length == 1) {
                    if (response.results.intents[0].slug == "display-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        displayIssue();
                    }
                    if (response.results.intents[0].slug == "add-collaborator") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        addCollab();
                    }
                    if (response.results.intents[0].slug == "add-comment") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        addComment();
                    }
                    if (response.results.intents[0].slug == "close-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        closeIssue();
                    }

                } else {
                    $('#gitform').empty();
                    errorPage();
                }
            }).catch(error => {
                // Handle error
                // error.message (error text)
                // error.status (HTTTP status or 'REQUEST_FAILED')
                // error.response (text, object or null)
            });
    }
});