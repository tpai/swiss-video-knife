var number_of_embed = 0
// keep detect if any videoStage popup
setInterval(function() {
	if(document.getElementsByTagName("embed").length > number_of_embed) {
		get_fb_video()
	}
	number_of_embed = document.getElementsByTagName("embed").length
}, 1000)

var get_fb_video = function() {

	var obj_arr = document.getElementsByTagName("embed");
	var fbPhotoPageActions = document.getElementById("fbPhotoPageActions")
	var fbPhotoSnowliftActions = document.getElementById("fbPhotoSnowliftActions")

	if(fbPhotoPageActions != null && fbPhotoSnowliftActions != null) {
		obj_arr.pop();
	}

	for(var i=0;i<obj_arr.length;i++) {
		var json = JSON.parse(decodeURIComponent(obj_arr[i].getAttribute("flashvars")).match(/\{[^$]*\}/)[0])
		var sd_src = json.video_data[0].sd_src
		var hd_src = json.video_data[0].hd_src

		var sd = document.createElement("a")
			sd.innerHTML = "收藏(一般畫質)"
			sd.setAttribute("href", sd_src)
			sd.setAttribute("target", "_blank")

		var hd = document.createElement("a")
			hd.innerHTML = "收藏(高清畫質)"
			hd.setAttribute("href", hd_src)
			hd.setAttribute("target", "_blank")

		if(fbPhotoPageActions != null) {
			sd.setAttribute("class", "fbPhotosPhotoActionsItem");
			hd.setAttribute("class", "fbPhotosPhotoActionsItem");
			if(sd_src != null)
				fbPhotoPageActions.appendChild(sd)
			if(hd_src != null)
				fbPhotoPageActions.appendChild(hd)
		}
		if(fbPhotoSnowliftActions != null) {
			sd.setAttribute("class", "tagButton buttonLink");
			hd.setAttribute("class", "tagButton buttonLink");
			if(sd_src != null)
				fbPhotoSnowliftActions.appendChild(sd)
			if(hd_src != null)
				fbPhotoSnowliftActions.appendChild(hd)
		}
	}
};