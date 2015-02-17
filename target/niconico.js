$(document).ready(function() {
	$("#videoMenuTopList").append("<li class='videoMenuList'><a id='download_btn' href='#' class='myDownloadButton' target='_blank' title='請按右鍵另存'><span></span>下載收藏</a></li>")
	// when click another video
	$(".itemLink").click(function() {
		var url = $(this).prop("href")
		get_video_info(url.match(/watch\/(\w*)/)[1])
	})
	// current video
	get_video_info(location.href.match(/watch\/(\w*)/)[1])
})

var get_video_info = function(video_id) {
	var getflv = "http://flapi.nicovideo.jp/api/getflv/"+video_id
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var result = xhr.responseText
				var url = decodeURIComponent(result).match(/&url=([^&]*)/)[1]
				if(url.search(/\?s=/) != -1) {
					url += "as3"
				}
				$("#download_btn").prop("href", url)
				$("head").append("<style type='text/css'>"+
					"#videoMenuTopList li.videoMenuList a.myDownloadButton span {"+
					"	background-position: -131px -927px;"+
					"}"+
				"</style>")
			} else {
				console.log('%c影音瑞士刀故障了！請立即至chrome應用程式商店回報並附上連結。', 'color: red; font-size: 26px;');
				console.log(">> https://chrome.google.com/webstore/detail/%E5%BD%B1%E9%9F%B3%E7%91%9E%E5%A3%AB%E5%88%80/kgcpkfeieiadioehehbnmgmabfhcbpoc");
			}
		}
	};
	xhr.open("GET", "http://www2.thu.edu.tw/~dataprt/niconico.php?url="+getflv+"&cookie="+encodeURIComponent(document.cookie), true)
	xhr.send(null)
};