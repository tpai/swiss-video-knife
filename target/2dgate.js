var server = "tonypai.twbbs.org";
var backup = "www2.thu.edu.tw/~dataprt";
var domain = server;
var html = "<h1>下載收藏</h1><hr>";

$(document).ready(function() {

	$(".intro").append("<span id='loading'><center><h1>影片來源分析中 請稍待...</h1><img src='http://i.imgur.com/fi2tfxt.gif' /></center></span>")
	
	// get each tab which have video player
	var tabs = $(".ui-tabs-panel:not(:has(ul[role='tablist']))")
	if(tabs.length > 0) {
		async.forEachSeries(tabs, function(tab, callback) {
			var id = $(tab).prop("id").match(/tab-\w{1,}-(\d{1,})/)[1]
			// gplayer
			var gd = $(tab).find(".gd_thumb")
			// jwplayer
			var jwp = tab.getElementsByTagName("object")
			if(gd.length > 0) {
				var docid = tab.innerHTML.match(/'[^)]*/g)[0].replace(/'/g, "")
				if(docid != null) {
					get_video_info(id, docid, callback)
				}
			}
			else if(jwp.length > 0) {
				var params = jwp[0].getElementsByTagName("param");
				for(var j=0;j<params.length;j++) {
					if(params[j].name == "flashvars") {
						create_link(id, "", params[j].value.match(/file=[^&]*/)[0].replace(/file=/g, ""))
						html += "\n\n<br /><br />"
						callback(null)
						break
					}
				}
			}
			else {
				callback(null)
			}
		}, function(err) {
			if(err)throw err
			$("#loading").remove()
			$(".intro").append(html)
		})
	}
})

var get_video_info = function(id, docid, callback) {
	var url = 'http://docs.google.com/get_video_info?docid='+docid
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var result = xhr.responseText
				var video_fmts = 
					decodeURIComponent(
						result.match(/fmt_list=[^&]*/g)[0].replace(/fmt_list=/g, '')
					).match(/[0-9]{3,4}x[0-9]{3,4}/g)

				var video_urls_complex = 
					decodeURIComponent(
						result.match(/url_encoded_fmt_stream_map=[^&]*/g)[0].replace(/url_encoded_fmt_stream_map=/g, '')
					).match(/url=[^&]*/g)
				
				for(var i=0;i<video_urls_complex.length;i++) {
					create_link(id, '('+video_fmts[i]+')', video_urls_complex[i].replace(/url=/g, ''))

					if(i == video_urls_complex.length - 1) {
						html += "\n\n<br /><br />"
						callback(null)
					}
				}
			} else {				
				domain = backup
				get_video_info(id, docid, callback)
				console.log(xhr.status)
			}
		}
	};
	xhr.open('GET', 'http://'+domain+'/file_get_contents.php?url='+url, true)
	xhr.send(null)
};

var create_link = function(id, format, href) {
	if(href != "()") {
		var ep = parseInt(id, 10)+1;
		var link = "<a href='"+decodeURIComponent(href)+"' target='_blank' style='font-size: 14px; padding: 3px;'>"+("EP"+((ep<10)?"0"+ep:ep)+" "+format)+"</a>";
		html += link;
	}
};