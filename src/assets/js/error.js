function errorPage(){
    var x = document.getElementById("gitform");
	var alertDiv = document.createElement('div');
	alertDiv.innerHTML = "You Entered a wrong Command"
	alertDiv.setAttribute("id", "alert-div");
	alertDiv.setAttribute("role", "alert");
	alertDiv.classList.add("alert");
	alertDiv.classList.add("alert-warning");
	x.appendChild(alertDiv);

}

module.exports = errorPage;