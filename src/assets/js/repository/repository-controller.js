const {octokit} = require('../octokit-rest-service');

module.exports = (e) => {
    console.log('asdasdasdasdasdasd');
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
}