var done = false
$(window).load(function() {
	chk ()
})

$("a[rel='spf-prefetch']").click(function() {
	chk ()
})

var chk = function () {
	var job = setInterval(function() {
		for(var j=0;j<document.scripts.length;j++) {
			if(matched = document.scripts[j].innerHTML.match(/ytplayer.config = [^@]*/)) {
				var yt = JSON.parse(matched[0].replace(/ytplayer.config = /g, "").replace(/;ytplayer.load[^$]*/, ""))
				var map = decodeURIComponent(yt.args.url_encoded_fmt_stream_map)
				var url_arr = map.match(/url=[^,]*/ig)
				var result = []
				var type_arr = map.match(/type=[^,;&]*/ig)
				$.each (type_arr, function(key, val) {
					result.push({id: key, type: val.substr(5).match(/\/([a-z,1-9,-]{1,})/)[1], url: ""})
				})
				$.each (url_arr, function(key, val) {
					$.each (result, function(k, v) {
						if (v.id == key)
							v.url = val.substr(4)
					})
				})
				var title = $("#eow-title").text()
				$("#eow-title").append("<br />")
				$.each (result, function(key, val) {
					$("#eow-title").append("<a href='"+val.url+"&title="+title+"' target='_blank' style='color: #167ac6;'>"+val.type+"</a>")
					if (key != result.length - 1)$("#eow-title").append(" | ")
				})
				done = true
			}
		}
		if (done)clearInterval(job)
	}, 1000)
}