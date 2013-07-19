setTimeout(function() {
	for(var j=0;j<document.scripts.length;j++) {
		if(matched = document.scripts[j].innerHTML.match(/ytplayer.config = [^<]*/)) {
			var yt = JSON.parse(matched[0].replace(/ytplayer.config = /g, "").replace(/\};/g, "}"));
			var url_arr = yt.args.url_encoded_fmt_stream_map.split(",")
			var each_fmt = yt.args.fmt_list.replace(/\\\//g, "/").split(",")
			var tab = ''+
			'<span><button id="catch" role="button" data-trigger-for="action-panel-download" data-button-toggle="true" onclick=";return false;" class="action-panel-trigger yt-uix-button yt-uix-button-hh-text" type="button"><span class="yt-uix-button-content">'+
			'收藏'+
			'</span></button></span>';

			var panel = ''+
			'<div class="action-panel-content" id="action-panel-download" data-panel-loaded="true" style="display: none;">'+
			'	<div class="watch-playlists-drawer">'+
			'	<ul class="playlist-items">';

			for(var i=0;i<url_arr.length;i++)
			{
				if(each_fmt[i-1] != undefined)
				{
					var title = '&title='+document.getElementById('watch-headline-title').innerHTML.replace(/(<([^>]+)>)/ig,"").trim().replace(/ /g, "+");
					url_arr[i] = "&"+url_arr[i];
					var sig;
					if(url_arr[i].match(/\&sig=\w{0,}.\w{0,}/) != null) {
						sig = "&signature="+getParameterByName(url_arr[i], "sig");
					}
					else if(url_arr[i].match(/\&s=\w{0,}.\w{0,}/) != null) {
						sig = "&signature="+sigHandler(getParameterByName(url_arr[i], "s"));
					}
					var tag = getParameterByName(url_arr[i], "type");
					var url = decodeURIComponent(getParameterByName(url_arr[i], "url")) + sig + title;
					var size = each_fmt[i-1].split('/');
					panel += ''+
					'		<li data-is-private="False" data-title="'+size[1]+'" class="playlist-item">'+
					'			<a href='+url+'><span class="playlist-title">'+size[1]+' ('+tag.match(/[^;]*/)[0]+')</span>'+
					'		</li>';
				}
			}
			panel += ''+
			'	</ul>'+
			'	</div>'+
			'</div>';

			document.getElementById('watch7-secondary-actions').innerHTML = tab + document.getElementById('watch7-secondary-actions').innerHTML;
			document.getElementById('watch7-action-panels').innerHTML += panel;
		}
	}
}, 500);