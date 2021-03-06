function cambiar_login() {
	document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
	document.querySelector('.cont_form_login').style.display = "block";
	document.querySelector('.cont_form_sign_up').style.opacity = "0";

	setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, 400);

	setTimeout(function () {
		document.querySelector('.cont_form_sign_up').style.display = "none";
	}, 200);
	document.getElementById("login").onclick = redirect;
}

function cambiar_sign_up(at) {
	document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
	document.querySelector('.cont_form_sign_up').style.display = "block";
	document.querySelector('.cont_form_login').style.opacity = "0";

	setTimeout(function () {
		document.querySelector('.cont_form_sign_up').style.opacity = "1";
	}, 100);

	setTimeout(function () {
		document.querySelector('.cont_form_login').style.display = "none";
	}, 400);
}

function ocultar_login_sign_up() {
	document.querySelector('.cont_forms').className = "cont_forms";
	document.querySelector('.cont_form_sign_up').style.opacity = "0";
	document.querySelector('.cont_form_login').style.opacity = "0";

	setTimeout(function () {
		document.querySelector('.cont_form_sign_up').style.display = "none";
		document.querySelector('.cont_form_login').style.display = "none";
	}, 500);
}

function readLess() {
	location.reload();
}

function readMore(event) {
	var newdiv = document.createElement("div");
	newdiv.id = "encase";
	
	var parDiv = document.createElement("div");
	parDiv.className = "container";
	parDiv.appendChild(document.createElement("div"))
	parDiv.firstChild.className = "row";
	newdiv.appendChild(parDiv);

	var d = event.target.parentNode.parentNode.parentNode;
	d.className += " blown-up";
	var ele = d.querySelectorAll(".card-content.white-text")[0];
	ele.style = "max-height: none;";
	parDiv.firstChild.appendChild(d);
	ele = d.querySelectorAll(".card.black")[0];
	ele.style = "z-index: 3;"

	newdiv.addEventListener("click", readLess);
	newdiv.appendChild(parDiv);
	document.body.appendChild(newdiv);

	document.getElementById("encase").getElementsByTagName("a")[0].remove();

	if( !d.id.localeCompare("medhist")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID from backend
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Diseases";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = disease;
		d.appendChild(e);

		//for loop here append diseases from backend
	}
	else if( !d.id.localeCompare("treatdet")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID from backend
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Disease";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = disease; //Treat_for from backend
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Prescribed";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = prescribed; //Prescription from backend
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Prescribed By ";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = prescribedBy; //Doctor_id from backend
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("docdet")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID _id from backend
		d.appendChild(e);*/

		e = document.createElement("label");	//from Treating collection
		e.innerHTML = "Doctor ID";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = prescribedBy; //Doctor_id from backend
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("allergies")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID from backend
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Allergic To";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = allergy; 	//Allergy from backend
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("rep")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID from backend
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Report Link : ";
		d.appendChild(e);

		e = document.createElement("a");
		e.href = ""; //Link from backend
		e.innerHTML = "Link"
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("insur")) {
		d = d.querySelectorAll(".card-content.white-text")[0];
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("p");
		e.innerHTML = ""; //patient ID from backend
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Insurance Policy";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = insurance; //_id from backend
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Premium";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = premium; //Premium from backend
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Coverage";
		d.appendChild(e);

		e = document.createElement("p");
		e.innerHTML = coverage; //Coverage from backend
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("dmedhist")) {
		var d = document.getElementById("medhistform")
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "patid";
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Receipt Number";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "rid";
		d.appendChild(e);
	}

		else if( !d.id.localeCompare("dtreating")) {
		var d = document.getElementById("treatingform")
		var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "patid";
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Patient Name";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "p_name";
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Disease";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "disease";
		d.appendChild(e);
	}

	else if( !d.id.localeCompare("dtreatment")) {
		var d = document.getElementById("treatmentform")
		var e = document.createElement("label");
		e.innerHTML = "Disease";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "disease_treat";
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Prescription";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "presc_name";
		d.appendChild(e);
	}

		else if( !d.id.localeCompare("dallergy")) {
		var d = document.getElementById("allergyform")
		var e = document.createElement("label");
		e.innerHTML = "Allergic To";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "allergic_to";
		d.appendChild(e);
	}


	else if( !d.id.localeCompare("drep")) {
		var d = document.getElementById("drepform");
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "patid"
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Link";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "link";
		d.appendChild(e);
	}
	else if( !d.id.localeCompare("dinsur")) {
		var d = document.getElementById("dinsurform");
		/*var e = document.createElement("label");
		e.innerHTML = "Patient ID";
		d.appendChild(e);
		
		e = document.createElement("textarea");
		e.name = "patid"
		d.appendChild(e);*/

		e = document.createElement("label");
		e.innerHTML = "Policy ID";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "polid";
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Premium";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "premium";
		d.appendChild(e);

		e = document.createElement("label");
		e.innerHTML = "Coverage";
		d.appendChild(e);

		e = document.createElement("textarea");
		e.name = "cov";
		d.appendChild(e);
	}
}
