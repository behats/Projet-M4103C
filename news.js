var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	/*var elem = document.getElementById('zone_saisie');
	if(elem.value && (recherches.indexOf(elem.value)==-1)){

		var recherche = document.getElementById('recherches-stockees');
		var paragraphe = document.createElement('p');

		var label = document.createElement('label');
		label.innerText = elem.value;
		label.setAttribute('onClick', 'selectionner_recherche(this)');

		var cx = document.createElement('img');
		cx.src = "croix30.jpg";
		cx.class = 'icone-croix';
		cx.setAttribute('onClick', 'supprimer_recherche(this)');

		paragraphe.appendChild(label);
		paragraphe.appendChild(cx);
		recherche.appendChild(paragraphe);

		recherches.push(elem.value);
	}*/

	let saisie = document.getElementById('zone_saisie').value;
		if (recherches.indexOf(saisie) == -1 && saisie.replace(/\s*/g, '') != ''){
			recherches.push(saisie);
			document.getElementById('recherches-stockees').innerHTML += '<p class="titre-recherche"><label onclick="selectionner_recherche(this)">' + saisie + '</label><img onclick="supprimer_recherche(this)" src="croix30.jpg" class="icone-croix"/> </p>';
		}
		setCookie('recherches', JSON.stringify(recherches), 1000);
}

function supprimer_recherche(e)
{
	/*var parent = e.parentElement;
	var elem = document.getElementById('recherches-stockees');
	elem.removeChild(parent);
	var rm = recherches.indexOf(parent.firstChild.innerText);
	recherches.splice(rm, 1);*/

	let recherche = e.parentNode.childNodes[0].innerHTML;
		recherches.splice(recherches.indexOf(recherche), 1);
		e.parentNode.remove();
		setCookie('recherches', JSON.stringify(recherches), 1000);
}


function selectionner_recherche(e)
{
	recherche_courante = e.parentNode.childNodes[0].innerHTML;
	document.getElementById('zone_saisie').value = recherche_courante;
	let nouveauCookie = getCookie(recherche_courante);
	if(nouveauCookie != null && nouveauCookie != undefined){
		recherche_courante_news = JSON.parse(nouveauCookie);
		maj_resultats(nouveauCookie);
	}
}



function init()
{
	let cookieRecherches = getCookie('recherches');
	if(cookieRecherches != null){
		recherches = JSON.parse(cookieRecherches);
		let recherchesStockees = document.getElementById('recherches-stockees');
		recherches.forEach(function(recherche){
			recherchesStockees.innerHTML += '<p class="titre-recherche"><label onclick="selectionner_recherche(this)">' + recherche + '</label><img onclick="supprimer_recherche(this)" src="croix30.jpg" class="icone-croix"/> </p>';
		})
	}
}


function rechercher_nouvelles()
{
	recherche_courante = document.getElementById('zone_saisie').value;
	if(recherche_courante.replace(/\s*/g, '') != ''){
		let nouveauCookie = getCookie(recherche_courante);
		if(nouveauCookie != undefined && nouveauCookie != null){
			recherche_courante_news = JSON.parse(nouveauCookie);
		}
		document.getElementById('resultats').innerHTML = '';
		document.getElementById('wait').style.display = 'block';
		ajax_get_request('search.php?data=' + encodeURI(recherche_courante), true, maj_resultats);
	}
}


function maj_resultats(res)
{
	document.getElementById('wait').style.display = 'none';
	document.getElementById('resultats').innerHTML = '';
	let resultats = document.getElementById('resultats');
	JSON.parse(res).forEach(function(news){
		let ElemNouv= '<p class="titre_result"><a class="titre_news" href="' + decodeEntities(news.url) + '" target="_blank">' + decodeEntities(news.titre) + '</a><span class="date_news" alt="' + news.date + '">' + format(news.date) + '</span><span class="action_news" ';
		//console.log(news);
		if(indexOf(recherche_courante_news, news) != -1){
			ElemNouv += 'onclick="supprimer_nouvelle(this)"><img src="disk15.jpg"/></span></p>';
		}else{
			ElemNouv += 'onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>';
		}
		resultats.innerHTML += ElemNouv;
	});
}


function sauver_nouvelle(e)
{
	e.getElementsByTagName('img')[0].setAttribute('src', 'disk15.jpg');
	e.setAttribute('onclick', 'supprimer_nouvelle(this)');
	let ElemNouv = e.parentNode;
	let news = {
		titre: ElemNouv.getElementsByClassName('titre_news')[0].innerHTML,
		date: ElemNouv.getElementsByClassName('date_news')[0].getAttribute('alt'),
		url: decodeURI(ElemNouv.getElementsByClassName('titre_news')[0].href)
	};
	console.log(news);
	if(recherche_courante_news.indexOf(news) == -1){
		recherche_courante_news.push(news);
	}
	setCookie(recherche_courante, JSON.stringify(recherche_courante_news), 1000);
}


function supprimer_nouvelle(e)
{
	e.getElementsByTagName('img')[0].setAttribute('src', 'horloge15.jpg');
	e.setAttribute('onclick', 'sauver_nouvelle(this)');
	let ElemNouv = e.parentNode;
	let news = {
		titre: ElemNouv.getElementsByClassName('titre_news')[0].innerHTML,
		date: ElemNouv.getElementsByClassName('date_news')[0].innerHTML,
		url: ElemNouv.getElementsByClassName('titre_news')[0].href
	};
	if(recherche_courante_news.indexOf(news) != -1){
		recherche_courante_news.split(recherche_courante_news.indexOf(news), 1);
	}
	setCookie(recherche_courante, JSON.stringify(recherche_courante_news), 1000);
}
