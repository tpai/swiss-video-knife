var server = "tonypai.twbbs.org";
var backup = "www2.thu.edu.tw/~dataprt";
var domain = server;

$(document).ready(function() {
	xhrRequest()
})

var xhrRequest = function () {
	var s_url = location.href.split("/")
	var vid = s_url[4]
	var filename = atob(vid)
	var m_filename = filename.match(/\w{1,}-(\d{1,}).flv/)
	var media_id = btoa(m_filename[1])
	
	var url = "http://vlog.xuite.net/flash/player?media="+media_id
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var result = xhr.responseText;
				var m_flv_src = result.match(/<property id="Zmx2X3NyYw=="><!\[CDATA\[([^\]]*)/)
				var flv_src = decodeURIComponent(atob(m_flv_src[1]))
				$("#single-video-operation").append("<a href='"+flv_src+"' class='single-video-tool' target='_blank'><span class='single-button-text' style='padding-left: 0px;'>下載收藏</span></a>")
			} else {
				domain = backup
				xhrRequest()
				console.log(xhr.status);
			}
		}
	};
	xhr.open("GET", "http://"+domain+"/file_get_contents.php?url="+encodeURIComponent(url), true)
	xhr.send(null)
};