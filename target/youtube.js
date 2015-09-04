$(window).load(function() {
	chk ()
})

var chk = function () {
	var job = setInterval(function() {
		
		if (!$("#vsknife").length)
		
		for(var j=0;j<document.scripts.length;j++) {
			if(matched = document.scripts[j].innerHTML.match(/ytplayer.config = [^@]*/)) {
				var yt = JSON.parse(matched[0].replace(/ytplayer.config = /g, "").replace(/;ytplayer.load[^$]*/, ""))
				var map = decodeURIComponent(yt.args.url_encoded_fmt_stream_map)
				
				var result = []
				var type_arr = map.match(/type=[^,;&]*/ig)
				var url_arr = map.match(/url=[^,]*/ig)
				var s_arr = map.match(/s=[a-z,.,0-9]{10,}/ig)
				$.each (type_arr, function(key, val) {
					result.push({id: key, type: val.substr(5).match(/\/([a-z,1-9,-]{1,})/)[1], url: ""})
				})
				$.each (url_arr, function(key, val) {
					$.each (result, function(k, v) {
						if (v.id == key)
							v.url = val.substr(4)
					})
				})
				if (s_arr != null) {
					$.each (s_arr, function(key, val) {
						$.each (result, function(k, v) {
							if (v.id == key) {
								v.url += "&signature="+SigHandlerAlternative(val.substr(2))
							}
						})
					})
				}
				var title = $("#eow-title").text().trim().replace(/'/ig, "")
				var html = ""
				$.each (result, function(key, val) {
					html += "<a href='"+val.url+"&title="+title+"' target='_blank' style='color: #167ac6;'>"+val.type+"</a>"
					if (key != result.length - 1)html += " | "
				})
				$("#eow-title").append("<div id='vsknife'>"+html+"</div>")
			}
		}
	}, 1000)
}

// Thanks to Kej, I can't fix the signature problem without him.

var swap = function(sArray, location) {
    var ref;
    location = location % sArray.length;
    ref = [sArray[location], sArray[0]], sArray[0] = ref[0], sArray[location] = ref[1];
    return sArray;
}

var SigHandlerAlternative = function(s) {
    var code, j, len, sArray, scode;
    sArray = s.split("");
    scode = [68, -3, 66, -1, 0];
    for (j = 0, len = scode.length; j < len; j++) {
        code = scode[j];
        if (code > 0) {
            sArray = this.swap(sArray, code);
        } else if (code === 0) {
            sArray = sArray.reverse();
        } else {
            sArray = sArray.slice(-code);
        }
    }
    return sArray.join("");
}