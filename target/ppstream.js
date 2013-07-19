$(document).ready(function() {
	(function() {
		async.reduce([0, 1, 2, 3], 0, function(memo, item, callback){
			// pointless async:
			async.nextTick(function(){
				var type = item
				var url = "http://dp.ppstv.com/get_play_url_cdn.php?sid="+location.href.match(/_[^.]*/)[0].replace(/_/g, "")+"&flash_type=1&type="+type
				var xhr = new XMLHttpRequest()
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							var result = xhr.responseText
							if(result.search("hd="+type) != -1) {
								//1=高清 2=流暢 3=普通
								var txt
								switch(type) {
									case 0: txt = "普通1"; break;
									case 1: txt = "高清"; break;
									case 2: txt = "流暢"; break;
									case 3: txt = "普通2"; break;
								}
								$(".behavior-list").append(''+
									'<li class="bhv-item trans">'+
									'	<a href="'+result.split("?hd=")[0]+'" class="ta">'+
									'		<span class="tai">'+
									'			<b class="ico-collect"></b>'+
									'		</span>'+
									'		<span class="tas">'+txt+'</span>'+
									'	</a>'+
									'</li>')
							}
							callback(null)
						} else {
							console.log(xhr.status)
						}
					}
				}
				xhr.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+encodeURIComponent(url), true)
				xhr.send(null)
			})
		}, function(err, result){
			if(err)throw err
			$(".ico-collect")
				.css("width", "16px")
				.css("height", "17px")
				.css("display", "inline-block")
				.css("overflow", "hidden")
				.css("line-height", "0")
				.css("font-size", "0")
				.css("color", "transparent!important")
				.css("background-image", "url(http://i.imgur.com/jDdFx8q.png)")
				.css("background-repeat", "no-repeat")
				.css("background-position", "-69px -114px")
				.css("cursor", "pointer")
				.css("vertical-align", "top")
			
			$(".bhv-download").remove()
			$(".bhv-phone").remove()
		});
	})()
})