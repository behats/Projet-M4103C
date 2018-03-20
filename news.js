var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	var elem = document.getElementById('zone_saisie');
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
	}
}

function supprimer_recherche(e)
{
	var parent = e.parentElement;
	var elem = document.getElementById('recherches-stockees');
	elem.removeChild(parent);
	var rm = recherches.indexOf(parent.firstChild.innerText);
	recherches.splice(rm, 1);
}


function selectionner_recherche(e)
{
	recherche_courante = e.innerText;
	document.getElementById("zone_saisie").value = e.innerText;*
}


function init()
{

}


function rechercher_nouvelles()
{
	
	
}


function maj_resultats(res)
{

	
}


function sauver_nouvelle(e)
{
	
}


function supprimer_nouvelle(e)
{
	
}





	






