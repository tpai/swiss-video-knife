// prepare css
$("head").append("<style type='text/css'>"+
	"#collectButton {"+
	"	background: url('http://i.imgur.com/EdQvbsC.png') no-repeat scroll 0 0 transparent;"+
	"	background-position: -163px -2px;"+
	"	cursor: pointer;"+
	"}"+
	"#collectButton:hover {"+
	"	background-position: -163px -37px;"+
	"}"+
	".immediately_download {"+
	"	height: auto;"+
	"}"
+"</style>")

var collectButton = "<a id='collectButton' class='btn' title='收藏'>收藏</a>"

var video_src = {
	"chi": {
		"tv": [],
		"dvd": [],
		"high-dvd": []
	},
	"arm": {
		"tv": [],
		"dvd": [],
		"high-dvd": []
	},
	"und": {
		"tv": [],
		"dvd": [],
		"high-dvd": []
	}
};

$(document).ready(function() {
	// http://api.funshion.com/ajax/get_webplayinfo/xxxxxx/x/mp4
	var url = "http://api.funshion.com/ajax/get_webplayinfo/"+location.href.split("play/")[1]+"/mp4";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var json = JSON.parse(xhr.responseText)
				var info = json.playinfos
				for(var i=0;i<info.length;i++) {
					// http://jobsfe.funshion.com/query/v1/mp4/[cid].json?bits=[byterate]
					var video_info_url = "http://jobsfe.funshion.com/query/v1/mp4/"+info[i].cid+".json?bits="+info[i].byterate
					get_video_info(video_info_url, info[i].dub_one);
					if(i == info.length - 1) {
						// insert collectButton into navigation bar
						var parent = $("#subscribebtn").parent()
						$("#subscribebtn").remove()
						$(parent).append(collectButton)
						// click event handler
						$("#collectButton").click(function() {
							var html = ""
							var dub = ["國", "粵", "外"]
							var txt = ["流暢", "標準", "高清"]
							var arr = [
								video_src["chi"]["tv"], video_src["chi"]["dvd"], video_src["chi"]["high-dvd"],
								video_src["arm"]["tv"], video_src["arm"]["dvd"], video_src["arm"]["high-dvd"],
								video_src["und"]["tv"], video_src["und"]["dvd"], video_src["und"]["high-dvd"],
							]
							// create html
							for(var i=0;i<txt.length;i++) {
								html += "<h1>"+txt[i]+":</h1> "
								for(var j=0;j<dub.length;j++) {
									var number_of_video = arr[i+3*j].length
									if(number_of_video) {
										html += "<p>["+dub[j]+"] "
										for(var k=0;k<number_of_video;k++) {
											html += "<a href='"+arr[i+3*j][k]+"' target='_blank'>載點("+(k+1)+")</a> ";
										}
									}
								}
								html += "</p>"
							}
							$("#pckhdxiaz").html("<p style='padding: 0px;'>"+html+"</p>")
						})
					}
				}
			} else {
				console.log(xhr.status);
			}
		}
	};
	xhr.open("GET", "http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url="+url, true)
	xhr.send(null)
})

var get_video_info = function(video_info_url, dub_one) {
	var xhr_main = new XMLHttpRequest()
	xhr_main.open("GET", "http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url="+video_info_url, true)
	xhr_main.onreadystatechange = function() {
		if (xhr_main.readyState == 4) {
			if (xhr_main.status == 200) {
				var json_main = JSON.parse(xhr_main.responseText)
				var video_urls = json_main.playlist[0].urls
				for(var j=0;j<video_urls.length;j++) {
					video_src[dub_one][json_main.playlist[0].tname].push(video_urls[j])
				}
			}
		}
	};
	xhr_main.send(null)
};