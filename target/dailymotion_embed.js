$(document).ready(function() {
	get_video_info()
})

var get_video_info = function() {
	var json = JSON.parse(decodeURIComponent($("#player").find("embed").attr("flashvars").split("&")[0].substr(7)))
	$("#iframe-embed").css("height", "80%").css("position", "fixed").css("top", "15%")

	var html = ""
	$.each(json.metadata.qualities, function(key, val) {
		if (key != "auto") {
			html += "<a href='"+val[0].url+"' style='font-size: 35px; line-height: 45px; text-decoration: none;' title='按右鍵另存' target='_blank'>【"+key+"p】</a> "
		}
	})

	$("body").prepend("<p style='z-index: 99; background-color: white; padding: 10px; text-align: center;'>"+html+"</p>")
};