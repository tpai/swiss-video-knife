$(window).load(function() {
	var embedId = location.pathname.match(/\/video\/(\w{1,})/)[1]
	get_video_info(embedId)
})

var get_video_info = function(id) {
	var result = $("body").html()
	var json = JSON.parse(result.match(/var info = (\{[^\n]*\}),/)[1])
	$("#iframe-embed").css("height", "80%").css("position", "fixed").css("top", "15%")
	var html = ""
	var data = [
		{ text: "中等清晰度", index: "stream_h264_url" },
		{ text: "低清晰度", index: "stream_h264_ld_url" },
		{ text: "普通清晰度", index: "stream_h264_hq_url" },
		{ text: "高清720P", index: "stream_h264_hd_url" },
		{ text: "最佳1080P", index: "stream_h264_hd1080_url" }
	];

	$.each(data, function(key, val) {
		if(json[val.index] != null) {
			html += "<a href='"+json[val.index]+"' style='font-size: 35px; line-height: 45px; text-decoration: none;' title='按右鍵另存' target='_blank'>【"+val.text+"】</a> "
		}
	})

	$("body").prepend("<p style='z-index: 99; background-color: white; padding: 10px; text-align: center;'>"+html+"</p>")
};