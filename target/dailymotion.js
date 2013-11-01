$(document).ready(function() {
	var embedId = location.pathname.match(/\/video\/(\w{1,})_[^\n]*/)[1]
	get_video_info(embedId)
})

var get_video_info = function(id) {
	var url = "http://www.dailymotion.com/embed/video/"+id;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var result = xhr.responseText
				var json = JSON.parse(result.match(/var info = (\{[^\n]*\}),/)[1])

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
						html += "<a href='"+json[val.index]+"' class='video_title' style='padding: 8px; font-size: 14px; line-height: 22px;'>【"+val.text+"】</a> "
					}
				})

				$(".pl_video_tabs").prepend("<p style='padding-bottom: 20px;'>"+html+"</p>")
			} else {
				console.log(xhr.status)
			}
		}
	};
	xhr.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+url, true);
	xhr.send(null);
};