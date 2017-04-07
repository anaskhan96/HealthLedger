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
}

(function ($) {
	$(window).scroll(function () {

		$(window).scroll(function () {
			space = $(window).innerHeight() - $('.fab').offsetTop + $('.fab').offsetHeight;
			if (space < 200) {
				$('.fab').css('margin-bottom', '150px');
			}
		})
	});

})(jQuery);