window.onload = function() {
	var video_id = location.href.match(/watch\/(\w*)/)[1]
	var getflv = "http://flapi.nicovideo.jp/api/getflv/"+video_id
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var result = xhr.responseText
					var url = decodeURIComponent(result).match(/&url=([^&]*)/)[1]
					var css = '<style>'+
						'#videoMenuTopList li.videoMenuList a.myDownloadButton span {'+
						'	background-position: -131px -64px;'
						'}'+
						'</style>'
					$("#videoMenuTopList").append("<li class='videoMenuList'><a href='"+url+"' class='myDownloadButton' target='_blank' title='請按右鍵另存'><span></span>下載收藏</a></li>")
					$("head").append(css)
			}
		}
	};
	xhr.open('GET', 'http://web.thu.edu.tw/g10049002/www/niconico.php?url='+getflv, true);
	xhr.send(null);
}