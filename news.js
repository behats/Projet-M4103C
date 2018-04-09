var recherches = []; //tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante; // chaine de caracteres correspondant a la recherche courante
var recherche_courante_news = []; // tableau d'objets de type resultats (avec titre, date et url)


function init() {
	var cSearch = getCookie('recherches'); // cookie de recherches

	//Web storage
	//var cSearch = localStorage.getItem('recherches');

	if( cSearch != null){ // si le cookie existe

		//	$("#zone_saisie").autocomplete( {source : recherches})

		recherches = JSON.parse(cSearch); // Le tableau recherches prend la valeur du cookie

		document.getElementById('recherches-stockees').innerHTML;
		recherches.forEach(function(recherche){ // Affiche les recherches stockées dans l'HTML
		document.getElementById('recherches-stockees').innerHTML = document.getElementById('recherches-stockees').innerHTML + '<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'
		+ recherche + '</label><img onclick="supprimer_recherche(this)" src="croix30.jpg" class="icone-croix"/> </p>';
	})
}
}

function ajouter_recherche() {

	var saisie = document.getElementById('zone_saisie').value; // Récupère le contenu de la zone de saisie

	if (recherches.indexOf(saisie) == -1 && saisie.replace(/\s*/g, '') != '') {

		recherches.push(saisie); //On ajoute le contenu de la zone de saisie à la liste des recherches enregistrées
		// On ajoute la saisie dans l'HTML
		document.getElementById('recherches-stockees').innerHTML = document.getElementById('recherches-stockees').innerHTML + '<p class="titre-recherche"><label onclick="selectionner_recherche(this)">' + saisie + '</label><img onclick="supprimer_recherche(this)" src="croix30.jpg" class="icone-croix"/> </p>';

}

setCookie('recherches', JSON.stringify(recherches), 1000); // On stocke les recherches dans un cookie

// WebStorage
//localStorage.setItem('recherches',JSON.stringify(recherches));
}

function supprimer_recherche(e) {
		var recherche = e.parentNode.childNodes[0].innerHTML;
	recherches.splice(recherches.indexOf(recherche), 1);
	e.parentNode.remove();
	setCookie('recherches', JSON.stringify(recherches), 1000);

/*
	//e.parentNode.parentNode.removeChild(e.parentNode)
	alert(e.parentNode.getElementsByTagName('label').value)
	recherches.splice(recherches.indexOf(e.parentNode.getElementsByTagName('label').innerHTML, 1))
	//setCookie('recherches', JSON.stringify(recherches), 1000)
	// sauvegarde les recherches a l'aide d'un cookie
	//Cookie avec WebStorage
	//localStorage.setItem('recherches',JSON.stringify(recherches)); */
}


function selectionner_recherche(e) {
	recherche_courante = e.parentNode.childNodes[0].innerHTML; // Récupère la valeur recherchée
	document.getElementById('zone_saisie').value = recherche_courante; // Modifie le champ de texte
	var Currentcookie = getCookie(recherche_courante);


	//WebStorage
	//var currentCookie = localStorage.getItem(recherche_courante);

	if(currentCookie != null && currentCookie != undefined){
		recherche_courante_news = JSON.parse(currentCookie);
		maj_resultats(currentCookie);
	}
}

function ajax_get_request(url,async,callback){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if ((xhr.readyState==4) && (xhr.status==200)){
			callback(xhr.responseText);
		}
	}
	xhr.open("GET",url,async);
	xhr.send();
}


function rechercher_nouvelles() {

	recherche_courante = document.getElementById('zone_saisie').value;
	if(recherche_courante.replace(/\s*/g, '') != ''){
		var currentCookie = getCookie(recherche_courante);
		if(currentCookie != undefined && currentCookie != null){
			recherche_courante_news = JSON.parse(currentCookie);
		}
		document.getElementById('resultats').innerHTML = '';
		document.getElementById('wait').style.display = 'block';
		ajax_get_request('search.php?data=' + encodeURI(recherche_courante), true, maj_resultats);
	}

/*
		// WebStorage
		var currentCookie = localStorage.getItem(recherche_courante);
		document.getElementById('resultats').innerHTML = '' ;
		document.getElementById('wait').style.display = 'block';
		ajax_get_request('search.php?data=' + encodeURI(recherche_courante), true, maj_resultats); // Requête envoyé au PHP
	}
	*/
}


function maj_resultats(res)
{

	document.getElementById('wait').style.display = 'none';
	document.getElementById('resultats').innerHTML = ''; // Interface résultat vidé
	var resultats = document.getElementById('resultats');

	JSON.parse(res).forEach(function(news){
		var newsElement = '<p class="titre_result"><a class="titre_news" href="' + decodeEntities(news.url) + '" target="_blank">' + decodeEntities(news.titre) + '</a><span class="date_news" alt="' + news.date + '">' + format(news.date) + '</span><span class="action_news" ';

		if(indexOf(recherche_courante_news, news) != -1){ //On vérifie si la news est sauvegardée
			newsElement = newsElement + 'onclick="supprimer_nouvelle(this)"><img src="disk15.jpg"/></span></p>';
		}
		else{
			newsElement = newsElement + 'onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>';
		}
		resultats.innerHTML = resultats.innerHTML + newsElement;
	});
}


function sauver_nouvelle(e) {
	e.getElementsByTagName('img')[0].setAttribute('src', 'disk15.jpg'); // Remplace l'image horloge par un disque de sauvegarde
	e.setAttribute('onclick', 'supprimer_nouvelle(this)') ;
	var newsElement = e.parentNode ;
	var info = {
		titre: newsElement.getElementsByClassName('titre_news')[0].innerHTML,
		date: newsElement.getElementsByClassName('date_news')[0].getAttribute('alt'),
		url: decodeURI(newsElement.getElementsByClassName('titre_news')[0].href)
	}
	if(recherche_courante_news.indexOf(info) == -1){
		recherche_courante_news.push(info);
	}

	setCookie(recherche_courante, JSON.stringify(recherche_courante_news), 1000);
/*
	localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
	//
	*/
}


function supprimer_nouvelle(e) {

	e.getElementsByTagName('img')[0].setAttribute('src', 'horloge15.jpg'); // Remplace l'image horloge par un disque de sauvegarde
	e.setAttribute('onclick', 'sauver_nouvelle(this)');
	$(e).click(function() {
		sauver_nouvelle(this);
	})
	var newsElement = e.parentNode;
	var info = {
		titre: newsElement.getElementsByClassName('titre_news')[0].innerHTML,
		date: newsElement.getElementsByClassName('date_news')[0].getAttribute('alt'),
		url: decodeURI(newsElement.getElementsByClassName('titre_news')[0].href)
	}
	recherche_courante_news.splice(recherche_courante_news.indexOf(info),1);

setCookie(recherche_courante, JSON.stringify(recherche_courante_news), 1000);
//	localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
}



// lance une recherche avec entrée
document.onkeydown = function(e){

	if (e.keyCode==13){ //13 : code de la touche entrer
		rechercher_nouvelles(); // appel fonction
	}
}
