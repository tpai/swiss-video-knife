window.onload = function() {
	
	$("#videoMenuTopList").append("<li class='videoMenuList'><a id='download_btn' href='#' class='myDownloadButton' target='_blank' title='請按右鍵另存'><span></span>下載收藏</a></li>")

	$(".itemLink").click(function() {
		var url = $(this).prop("href")
		getVideo(url.match(/watch\/(\w*)/)[1])
	})
	getVideo(location.href.match(/watch\/(\w*)/)[1])
}

var getVideo = function(video_id) {
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
					if(url.search(/\?s=/) != -1) {
						url += "as3"
					}
					$("#download_btn").prop("href", url)
					$("head").append(css)
			}
		}
	};
	xhr.open('GET', 'http://web.thu.edu.tw/g10049002/www/niconico.php?url='+getflv+'&cookie='+encodeURIComponent(document.cookie), true);
	xhr.send(null);
};