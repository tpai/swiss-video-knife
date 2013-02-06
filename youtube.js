setTimeout(function() {
	for(var j=0;j<document.scripts.length;j++) {
		if(urls = document.scripts[j].innerHTML.match(/url_encoded_fmt_stream_map=[^\\]*/)) {

			var url_arr = decodeURIComponent(urls.toString().replace(/url_encoded_fmt_stream_map=/g, "")).split(",")
			var each_fmt = decodeURIComponent(document.scripts[j].innerHTML.match(/fmt_list=[^\\]*/).toString().replace(/fmt_list=/g, "")).split(",")

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
					var title = '&title='+document.getElementById('watch-headline-title').innerHTML.replace(/(<([^>]+)>)/ig,"").trim();
					url_arr[i] = "&"+url_arr[i];
					var sig = "&signature="+getParameterByName(url_arr[i], "sig");
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