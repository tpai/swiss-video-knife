$(document).ready(function() {
	var embedId = location.pathname.match(/\/video\/(\w{1,})_[^\n]*/)[1]
	$("#video_title").append(
		"<a href='http://www.dailymotion.com/embed/video/"+embedId+"?autoplay=1' class='video_title'>"+
			"【前往下載】"+
		"</a>"+
	"<br />")
})