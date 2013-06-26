setTimeout(function() {

	var urltype_arr = ["ldURL", "sdURL", "hqURL", "hdURL", "hd720URL", "hd1080URL"];
	var urltxt_arr = ["低畫質", "中等畫質", "普通畫質", "高畫質", "高畫質(720p)", "高畫質(1080p)", ];

	var html = ""
	var layerList = JSON.parse(
		decodeURIComponent(
			$("param[name='flashvars']").prop("value").match(/\&sequence=([^\&]*)/)[1]
		)
	).sequence[0].layerList[0].sequenceList[2].layerList

	for(var i=0;i<layerList.length;i++) {
		if(layerList[i].name == "video") {
			for(var j=0;j<urltype_arr.length;j++) {
				var url = layerList[i].param[urltype_arr[j]]
				var txt = urltxt_arr[j]
				if(url != undefined)
					html += "<a href='"+url+"' class='video_title' style='padding: 10px; font-size: 16px; line-height: 22px;'>【"+txt+"】</a> "
			}
		}
	}

	$(".pl_video_tabs").prepend("<p style='padding-bottom: 20px;'>"+html+"</p>")

}, 500);