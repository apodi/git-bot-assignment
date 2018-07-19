import './assets/scss/app.scss';
import "@octokit/rest";
import 'popper.js';
import "bootstrap";
import './assets/media/logo.png';
const helper = require('./assets/js/helper');
const octokit = require('@octokit/rest')();
const createRepo = require('./assets/js/create-repo');
const createIssue = require('./assets/js/create-issue');
const displayIssue = require('./assets/js/display-issue');
const issueList = require('./assets/js/issue-list');
const addComment = require('./assets/js/add-comment');
const addCollab = require('./assets/js/add-collaborator');
const issueOptionList = require('./assets/js/issue-option-list');
const closeIssue = require('./assets/js/close-issue');
const errorPage = require('./assets/js/error');

const owner = 'apodi';
const token = '<place token here>'

octokit.authenticate({
    type: 'oauth',
    token: token
});

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
                        createRepo(response.results.entities.repository[0].value);
                    }
                } else if ((response.results.intents.length == 1) && response.results.entities.hasOwnProperty('issue')) {
                    if (response.results.intents[0].slug == "create-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        createIssue(octokit, response.results.entities.issue[0].value, owner);
                    }
                } else if (response.results.intents.length == 1) {
                    if (response.results.intents[0].slug == "display-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        displayIssue(octokit, owner);
                    }
                    if (response.results.intents[0].slug == "add-collaborator") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        addCollab(octokit, owner);
                    }
                    if (response.results.intents[0].slug == "add-comment") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        addComment(octokit, owner);
                    }
                    if (response.results.intents[0].slug == "close-issue") {
                        $('#gitform').empty();
                        $("#alert-div").html("");
                        $("#alert-div").hide();
                        closeIssue(octokit, owner);
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

//create repository
$(document).on('submit', '#create-repo', function (e) {
    var repoNameElement = $('#reponame');
    e.preventDefault();
    if (!repoNameElement.val()) {
        // Add errors highlight
        repoNameElement.closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        repoNameElement.closest('.form-group').removeClass('has-error').addClass('has-success');
        const obj = {
            name: repoNameElement.val(),
            description: $('#desc').val()
        };
        octokit.repos.create(obj).then(result => {
            if (result.status == 201) {
                $(this).closest('form').find("input[type=text], textarea").val("");
                $("#alert-div").html("Repository created successfully!");
                $("#alert-div").show();
            }
        }).catch(error => {
            $("#alert-div").html("Error");
            $("#alert-div").show();
        });
    }
});

//create issue
$(document).on('submit', '#create-issue', function (e) {
    var titleElement = $('#issuetitle');
    e.preventDefault();
    if (!titleElement.val()) {
        // Add errors highlight
        titleElement.closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        titleElement.closest('.form-group').removeClass('has-error').addClass('has-success');

        const obj = {
            owner: owner,
            repo: $("#repository-list option:selected").text(),
            title: titleElement.val(),
            body: $('#comment').val()
        };
        octokit.issues.create(obj).then(result => {
                if (result.status == 201) {
                    $(this).closest('form').find("input[type=text], textarea").val("");
                    $("#alert-div").html("Issue created successfully!");
                    $("#alert-div").show();
                }
            })
            .catch(error => {
                $("#alert-div").html("Error");
                $("#alert-div").show();
            });
    }
});

//display issues
$(document).on('change', '#repository-list-issue', function () {
    $('#issue-listing').empty();
    var obj = {
        owner: owner,
        repo: this.value,
        sort: 'comments'
    };
    issueList(octokit, obj);
})

//add collaborator

$(document).on('submit', '#add-collaborator', function (e) {
    var nameCollaborator = $('#collaborator').val();
    var reponame = $('#repository-list').find(":selected").text();
    e.preventDefault();
    if (!nameCollaborator) {
        // Add errors highlight
        $('#collaborator').closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        $('#collaborator').closest('.form-group').removeClass('has-error').addClass('has-success');

        const obj = {
            owner: owner,
            repo: reponame,
            username: nameCollaborator
        };
        console.log(obj);
        octokit.repos.addCollaborator(obj).then(result => {
                if (result.status == 201) {
                    $(this).closest('form').find("input[type=text], textarea").val("");
                    $("#alert-div").html("collaborator added successfully!");
                    $("#alert-div").show();
                }
            })
            .catch(error => {
                $("#alert-div").html("Error");
                $("#alert-div").show();
            });
    }
});

//add comment
$(document).on('change', '#repository-list', function () {
    if (this.value != "#") {
        $('#issue-listing').empty();
        var obj = {
            owner: owner,
            repo: this.value,
            sort: 'comments'
        };
        issueOptionList(octokit, obj);
    }
})

//create issue
$(document).on('submit', '#add-comment', function (e) {
    var repoName = $("#repository-list option:selected").val();
    e.preventDefault();
    if (repoName == '#') {
        // Add errors highlight
        $("#repository-list option:selected").closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        $("#repository-list option:selected").closest('.form-group').removeClass('has-error').addClass('has-success');

        const obj = {
            owner: owner,
            repo: $("#repository-list option:selected").text(),
            number: $("#issue-list-comment option:selected").val(),
            body: $('#comment').val()
        };
        octokit.issues.createComment(obj).then(result => {
                console.log(result);
                if (result.status == 201) {
                    $(this).closest('form').find("input[type=text], textarea").val("");
                    $("#alert-div").html("Comment added successfully!");
                    $("#alert-div").show();
                }
            })
            .catch(error => {
                $("#alert-div").html("Please add comment");
                $("#alert-div").show();
            });
    }
});

//close issue
$(document).on('submit', '#close-issue', function (e) {
    var repoName = $("#repository-list option:selected").val();
    e.preventDefault();
    if (repoName == '#') {
        // Add errors highlight
        $("#repository-list option:selected").closest('.form-group').removeClass('has-success').addClass('has-error');
    } else {
        // Remove the errors highlight
        $("#repository-list option:selected").closest('.form-group').removeClass('has-error').addClass('has-success');

        const obj = {
            owner: owner,
            repo: $("#repository-list option:selected").text(),
            number: $("#issue-list-comment option:selected").val(),
            state: 'closed'
        };
        console.log(obj);
        octokit.issues.edit(obj).then(result => {
                console.log(result);
                if (result.status == 200) {
                    $(this).closest('form').find("input[type=text], textarea").val("");
                    $("#alert-div").html("Issue closed successfully!");
                    $("#alert-div").show();
                }
            })
            .catch(error => {
                $("#alert-div").html("Please add comment");
                $("#alert-div").show();
            });
    }
});