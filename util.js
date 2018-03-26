// encode(decode) html text into html entity
function decodeHtmlEntity(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

function twodigits(v)
{
	var v2 = v > 9 ? v : '0' + v;
	return(v2);
}


function format(cdate)
{
		var date = new Date(cdate);
        var day = twodigits(date.getDate());
        var month = twodigits(date.getMonth() + 1);
        var year = date.getFullYear();
        var hours = twodigits(date.getHours());
		var minutes = twodigits(date.getMinutes());
		return(" "+day+"/"+month+" "+hours+"h"+minutes);
}

function decodeEntities(encodedString)
{
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return decodeHtmlEntity(textArea.value);
}

// retourne l'index de l'objet o dans le tableau t si présent et -1 sinon
function indexOf(t,o)
{
		var limit = t.length;
		var trouve=false;
		var i=0;
		while( (!trouve) && (i<limit))
		{
			var c=t[i];
			if ((c.titre == o.titre) && (c.date==o.date))
			{
				trouve=true;
			}
			i++;
		}
		if (trouve) {return (i-1);}
		else { return -1; }
}

//-----------------------------PERSO-----------------------------//

function getCookie(cname)
	{
    	var name = cname + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0; i<ca.length; i++)
    	{
        	var c = ca[i];
        	while (c.charAt(0)==' ') c = c.substring(1);
        	if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    	}
    	return "";
	}


function setCookie(cname, cvalue, exDays)
	{
    	var ck = new Date();
    	ck.setTime(ck.getTime() + (exDays*24*60*60*1000));
    	var expires = "expires="+ck.toUTCString();
    	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
	}

  function setCookie(name, value, exDays){
  	let ck = new Date();
  	ck.setTime(ck.getTime() + (exDays*24*60*60*1000));
  	document.cookie = name + '=' + value + ';expires=' + d.toUTCString();
  }

  function getCookie(name){
  	let cookiesArray = decodeURIComponent(document.cookie).split(';')
  	for(i = 0; i< cookiesArray.length; i++){
  		let cookie = cookiesArray[i];
  		let RegExp =  RegExp('^\\s*' + name + '\\s*=', 'g');
  		if(cookie.match(reg)){
  			return cookie.replace(reg, '');
  		}
  	}
  	return null;
  }

  function ajax_get_request(url, async, callback){
  	var xhrv = new XMLHttpRequest();
  	xhrv.onreadystatechange = function(){
  		if(xhrv.readyState==4 && xhrv.status==200){
  			callback(xhrv.responseText);
  		}
  	};
  	xhrv.open('GET', url, async);
  	xhrv.send();
  }
