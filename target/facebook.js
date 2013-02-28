var get_fb_video = function() {
	var obj_arr = document.getElementsByTagName("embed");

	var fbPhotoPageActions = document.getElementById("fbPhotoPageActions");
	var fbPhotoSnowliftActions = document.getElementById("fbPhotoSnowliftActions")
	if(fbPhotoPageActions != null && fbPhotoSnowliftActions != null) {
		obj_arr.pop();
	}

	for(var i=0;i<obj_arr.length;i++) {
		var json = JSON.parse(decodeURIComponent(obj_arr[i].getAttribute("flashvars")).match(/\{[^\}]*\}/)[0])
		console.log("SD: "+json.sd_src)
		console.log("HD: "+json.hd_src)

		var sd = document.createElement("a")
			sd.innerHTML = "收藏影片(一般)";
			sd.setAttribute("href", json.sd_src)
			sd.setAttribute("target", "_blank")

		var hd = document.createElement("a")
			hd.innerHTML = "收藏影片(高清)";
			hd.setAttribute("href", json.hd_src)
			hd.setAttribute("target", "_blank")

		if(fbPhotoPageActions != null) {
			sd.setAttribute("class", "fbPhotosPhotoActionsItem");
			hd.setAttribute("class", "fbPhotosPhotoActionsItem");
			fbPhotoPageActions.appendChild(sd)
			fbPhotoPageActions.appendChild(hd)
		}
		if(fbPhotoSnowliftActions != null) {
			sd.setAttribute("class", "tagButton buttonLink");
			hd.setAttribute("class", "tagButton buttonLink");
			fbPhotoSnowliftActions.appendChild(sd)
			fbPhotoSnowliftActions.appendChild(hd)
		}
	}
};

var number_of_embed = 0;
setInterval(function() {
	if(document.getElementsByTagName("embed").length > number_of_embed) {
		number_of_embed = document.getElementsByTagName("embed").length;
		get_fb_video();
	}
}, 1000)