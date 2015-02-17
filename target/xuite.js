$(document).ready(function() {
	$("#single-video-operation").append(a_tag("loading", "#", "影音瑞士刀解析中請稍待..."))
	xhrRequest()
})

var xhrRequest = function () {
	var s_url = location.href.split("/")
	var vid = s_url[4].replace(/#/ig, "")
	var filename = atob(vid)
	var m_filename = filename.match(/\w{1,}-(\d{1,}).flv/)
	var media_id = btoa(m_filename[1])
	
	var url = "http://vlog.xuite.net/flash/player?media="+media_id
	var xhr = new XMLHttpRequest()

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				$("#loading").remove()
				var result = xhr.responseText;
				var m_flv_src = result.match(/<property id="Zmx2X3NyYw=="><!\[CDATA\[([^\]]*)/)
				var flv_src = decodeURIComponent(atob(m_flv_src[1]))
				$("#single-video-operation").append(a_tag("target", flv_src, "下載收藏"))
			} else {
				console.log('%c影音瑞士刀故障了！請立即至chrome應用程式商店回報並附上連結。', 'color: red; font-size: 26px;');
				console.log(">> https://chrome.google.com/webstore/detail/%E5%BD%B1%E9%9F%B3%E7%91%9E%E5%A3%AB%E5%88%80/kgcpkfeieiadioehehbnmgmabfhcbpoc");
			}
		}
	};
	xhr.open("GET", "http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url="+encodeURIComponent(url), true)
	xhr.send(null)
};

var a_tag = function (id, url, text) {
	return "<a id='"+id+"' href='"+url+"' class='single-video-tool'><span class='single-button-text' style='padding-left: 0px;'>"+text+"</a>"
};