var arr = location.href.split("/");
var pid = arr[arr.length - 1];
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
		    //console.log(xhr.responseText);
		    var result = xhr.responseText;
		    var url = result.match(/furl=[^&]*/);
			if(url != null) {
				url = url[0].replace(/furl=/g, "");
			}
			else {
				url = result.match(/mp3file=[^&]*/)[0].replace(/mp3file=/g, "");
			}
		    if(url.search("UploadToYoutube") == -1) {
		    	document.getElementsByClassName("heading")[0].innerHTML += "　<span style='background-color: #5C7287; color: white;'>»»»【<a style='color: yellow;' href='"+url+"'>合法收藏</a>】</span>"
		    }
		    else {
		    	document.getElementsByClassName("heading")[0].innerHTML += "　<span style='background-color: #5C7287; color: white;'>»»»【此影音檔位於youtube】</span>"
		    }
		} else {
		    console.log(xhr.status);
		}
	}
};
xhr.open('GET', 'http://mymedia.yam.com/api/a/?pID='+pid, true);
xhr.send(null);