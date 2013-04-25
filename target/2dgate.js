window.onload = function() {

	var get_video_info = function(id, docid, callback) {
		var url = 'http://docs.google.com/get_video_info?docid='+docid;
		var xhr = new XMLHttpRequest();
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
						if(i == 0 && id != 0) {
							list.innerHTML += "\n<br>"
						}

						create_list(id, '('+video_fmts[i]+')', video_urls_complex[i].replace(/url=/g, ''))
						
						if(i == video_urls_complex.length - 1) {
							callback(null)
						}
					}
				} else {
					console.log(xhr.status)
				}
			}
		};
		xhr.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+url, true);
		xhr.send(null);
	};

	var create_list = function(id, format, href) {
		if(href != "()") {
			var link = document.createElement("a");
			link.setAttribute("target", "_blank");
			link.setAttribute("href",
				decodeURIComponent(
					href
				)
			);
			link.setAttribute("style", "font-size: 16px; padding: 5px;");
			var ep = id+1;
			link.innerHTML = "EP"+((ep<10)?"0"+ep:ep)+" "+format;
			list.appendChild(link);
		}
	};

	var loading = document.createElement("span");
	loading.innerHTML = "<center><h1>影片來源分析中 請稍待...</h1><img src='http://i.imgur.com/fi2tfxt.gif' /></center>";
	document.getElementsByClassName("intro")[0].appendChild(loading);

	var list = document.createElement("span");

	var title = document.createElement("h1");
	title.innerHTML = "下載收藏";

	var hr = document.createElement("hr");

	list.appendChild(title);
	list.appendChild(hr);

	var tabs = document.getElementsByClassName("ui-tabs-panel")
	if(tabs.length > 0) {
		var count = 0;
		async.forEachSeries(tabs, function(tab, callback) {
			var gd = tab.getElementsByClassName("gd_thumb")
			var jwp = tab.getElementsByTagName("object")
			if(gd.length > 0) {
				get_video_info(count, gd[0].onclick.toString().match(/'[^)]*/g)[0].replace(/'/g, ""), callback)
			}
			else if(jwp.length > 0) {
				var params = jwp[0].getElementsByTagName("param");
				for(var j=0;j<params.length;j++) {
					if(params[j].name == "flashvars") {
						if(count != 0)list.innerHTML += "\n<br />";
						create_list(count, "", params[j].value.match(/file=[^&]*/)[0].replace(/file=/g, ""))
						callback(null)
						break
					}
				}
			}
			else {
				callback(null)
			}
			count ++;
		}, function(err) {
			if(err)throw err
			document.getElementsByClassName("intro")[0].removeChild(loading)
			document.getElementsByClassName("intro")[0].appendChild(list)
		})
	}
	
	var btns = document.getElementsByClassName("jw-btn")
	if(btns.length == 1) {
		var jwpId = btns[0].getElementsByTagName("button")[0].onclick.toString().match(/jwplayer\('([^']*)'\)/)[1]
		var jwp = document.getElementById(jwpId)
		var params = jwp.getElementsByTagName("param")
		for(var j=0;j<params.length;j++) {
			if(params[j].name == "flashvars") {
				var str = decodeURIComponent(params[j].value).match(/\[\[JSON\]\]([^$]*\])/)[1]
				var objs = JSON.parse(str)
				var counter = 0
				async.forEachSeries(objs, function(obj, callback) {
					if(obj.file.match(/http:\/\//) != null || obj.file.match(/https:\/\//) != null) {
						if(counter != 0)list.innerHTML += "\n<br />";
						create_list(counter, "", obj.file)
						counter++
						callback(null)
					}
					else {
						callback(null)
					}
				}, function(err) {
					if(err)throw err
					document.getElementsByClassName("intro")[0].removeChild(loading)
					document.getElementsByClassName("intro")[0].appendChild(list)
				})
			}
		}
	}
};