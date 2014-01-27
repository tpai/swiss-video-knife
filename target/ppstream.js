$(document).ready(function() {
	$(".bhv-download").remove()
	$(".bhv-phone").remove()
	$(".v-safe").remove()
	$(".speedup").remove()

	async.reduce([0, 1, 2, 3], 0, function(memo, item, callback){
		async.nextTick(function(){
			var type = item
			var url = "http://dp.ppstv.com/get_play_url_cdn.php?sid="+location.href.match(/play_(\w{6}).html/)[1]+"&flash_type=1&type="+type
			var xhr = new XMLHttpRequest()
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var result = xhr.responseText
						if(result.search("hd="+type) != -1) {
							//1=高清 2=流暢 3=普通
							var tag
							switch(type) {
								case 0: tag = "普通畫質"; break;
								case 1: tag = "高清畫質"; break;
								case 2: tag = "流暢畫質"; break;
								case 3: tag = "普通畫質"; break;
							}
							$(".behavior-list").append("<li class='bhv-item speedup'><a href='"+result.split("?hd=")[0]+"'>"+tag+"</a></li>")
						}
						callback(null)
					} else {
						console.log(xhr.status)
					}
				}
			}
			xhr.open("GET", "http://tonypai.twbbs.org/file_get_contents.php?url="+encodeURIComponent(url), true)
			xhr.send(null)
		})
	}, function(err, result){
		if(err)throw err
	})
})