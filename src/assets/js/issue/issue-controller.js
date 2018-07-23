const {octokit,owner} = require('../octokit-rest-service');

const issueList = require('./display-issue-partial-view');
const issueOptionList = require('./add-comment-partial-view');

module.exports = {
    createIssueHandler: (e) => {
        console.log('asdasdasdasdasdasd');
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
    },
    displayIssueHandler: (e) => {
        $('#issue-listing').empty();
        var obj = {
            owner: owner,
            repo: e.target.value,
            sort: 'comments'
        };
        issueList(octokit, obj);
    },
    addCommentPartialHandler: (e) => {
        if (e.target.value != "#") {
            $('#issue-listing').empty();
            var obj = {
                owner: owner,
                repo: e.target.value,
                sort: 'comments'
            };
            issueOptionList(octokit, obj);
        }
    },
    addCommentHandler: (e) => {
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
    },
    closeIssueHandler: (e) =>{
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
    }
}