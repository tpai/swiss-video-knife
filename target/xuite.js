var s_url = location.href.split("/")
var vid = s_url[4]
var filename = atob(vid)
var m_filename = filename.match(/\w{1,}-(\d{1,}).flv/)
var media_id = btoa(m_filename[1])

var url = "http://vlog.xuite.net/flash/player?media="+media_id
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var result = xhr.responseText;
			var m_flv_src = result.match(/<property id="Zmx2X3NyYw=="><!\[CDATA\[([^\]]*)/)
			var flv_src = decodeURIComponent(atob(m_flv_src[1]))
			var link = document.createElement("a")
			link.setAttribute("class", "single-video-tool")
			link.setAttribute("href", flv_src)
			link.setAttribute("target", "_blank")
			var text = document.createElement("span")
			text.setAttribute("class", "single-button-text")
			text.setAttribute("style", "padding-left: 0px;")
			text.innerHTML = "下載收藏"
			link.appendChild(text)
			document.getElementById("single-video-operation").appendChild(link)
		} else {
			console.log(xhr.status);
		}
	}
};
xhr.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+encodeURIComponent(url), true);
xhr.send(null);