$(document).ready(function() {
	var embedId = location.pathname.match(/\/video\/(\w{1,})_[^\n]*/)[1]
	$(".pl_video_tabs").prepend("<p style='padding-bottom: 20px;'>"+
		"<a href='http://www.dailymotion.com/embed/video/"+embedId+"?autoplay=1' class='video_title' style='font-size: 34px; line-height: 42px;'>"+
			"【前往下載】"+
		"</a>"+
	"</p>")
})