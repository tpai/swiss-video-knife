$(document).ready(function() {
	for(var j=0;j<document.scripts.length;j++) {
		if(matched = document.scripts[j].innerHTML.match(/ytplayer.config = [^@]*/)) {
			var yt = JSON.parse(matched[0].replace(/ytplayer.config = /g, "").replace(/;ytplayer.load[^$]*/, ""));
			
			var url_arr = yt.args.url_encoded_fmt_stream_map.split(",")
			var each_fmt = yt.args.fmt_list.replace(/\\\//g, "/").split(",")
			var panel = ''
			
			for(var i=0;i<url_arr.length;i++)
			{
				if(each_fmt[i-1] != undefined)
				{
					var title = '&title='+document.getElementById('watch-headline-title').innerHTML.replace(/(<([^>]+)>)/ig,"").trim().replace(/ /g, "+");
					var tag = getParameterByName("&"+url_arr[i], "type");
					var url = decodeURIComponent(url_arr[i].match(/url=([^$]*)/)[1]) + title;
					var size = each_fmt[i-1].split('/');
					panel += ''+
					'<span>'+
					'  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon action-panel-trigger   yt-uix-button-opacity yt-uix-tooltip" type="button" onclick=";return false;" title="" data-trigger-for="action-panel-share" data-button-toggle="true">'+
					'	<span class="yt-uix-button-content">'+
					'	<a href='+url+' title='+tag.match(/[^;]*/)[0].replace(/video\//g, "")+'>'+size[1]+'</a>'+
					'	</span>'+
					'  </button>'+
					'</span>';
				}
			}
			document.getElementById('watch8-secondary-actions').innerHTML += panel;
		}
	}
})