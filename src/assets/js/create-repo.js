function createRepository(repoName) {

	var x = document.getElementById("gitform");
	var alertDiv = document.createElement('div');
	//alertDiv.innerHTML = "Repository create successfully"
	alertDiv.setAttribute("id", "alert-div");
	alertDiv.setAttribute("role", "alert");
	alertDiv.classList.add("alert");
	alertDiv.classList.add("alert-success");
	alertDiv.style.display = 'none'; 
	x.appendChild(alertDiv);
	

	var createform = document.createElement('form');
	createform.setAttribute("id", "create-repo"); // Setting method Attribute on form
	x.appendChild(createform);
	var heading = document.createElement('h2'); // Heading of form
	heading.innerHTML = "Create a new repository";
	createform.appendChild(heading);
	var headingDescription = document.createElement('p');
	headingDescription.innerHTML = "A repository contains all the files for your project, including the revision history.";
	createform.appendChild(headingDescription);

	var line = document.createElement('hr'); //giving horizontal row after heading
	createform.appendChild(line);

	var linebreak = document.createElement('br');
	createform.appendChild(linebreak);

	var formgroupDiv = document.createElement('div');
	formgroupDiv.classList.add("form-group");
	createform.appendChild(formgroupDiv);


	var namelabel = document.createElement('label'); // Create Label for name field
	namelabel.setAttribute("for", "reponame");
	namelabel.innerHTML = "Repository Name : "; // Set Field Labels
	formgroupDiv.appendChild(namelabel);

	var inputelement = document.createElement('input'); // Create input field for name
	inputelement.setAttribute("type", "text");
	inputelement.setAttribute("name", "rname");
	inputelement.setAttribute("id", "reponame");
	inputelement.setAttribute("placeholder", "Enter Repository Name");
	inputelement.value = repoName;
	inputelement.classList.add("form-control");
	formgroupDiv.appendChild(inputelement);

	var linebreak = document.createElement('br');
	createform.appendChild(linebreak);

	var formgroupDiv = document.createElement('div');
	formgroupDiv.classList.add("form-group");
	createform.appendChild(formgroupDiv);

	var desclabel = document.createElement('label'); //Create Label for email field
	desclabel.setAttribute("for", "desc");
	desclabel.innerHTML = "Description : ";
	formgroupDiv.appendChild(desclabel);

	var descelement = document.createElement('input'); // Create input field for email
	descelement.setAttribute("type", "text");
	descelement.setAttribute("name", "desc");
	descelement.setAttribute("id", "desc");
	descelement.classList.add("form-control");
	formgroupDiv.appendChild(descelement);

	var descbreak = document.createElement('br');
	createform.appendChild(descbreak);


	// Append Submit Button
	var submitelement = document.createElement('input');
	submitelement.setAttribute("type", "submit");
	submitelement.setAttribute("name", "dsubmit");
	submitelement.classList.add("btn");
	submitelement.classList.add("btn-primary");
	submitelement.setAttribute("value", "Create repository");
	createform.appendChild(submitelement);

}
module.exports = createRepository;