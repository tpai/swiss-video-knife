setTimeout(function() {
	var li = document.createElement("li");
		li.setAttribute("id", "videoDownloader");
	//<button id='ilikeit' class='tool_addto icn_right button action:toggleOrUpdate' title='I like it!' onclick='dm_menuToggle()'>合法收藏</button>
	var btn = document.createElement("button");
		btn.setAttribute("id", "ilikeit");
		btn.setAttribute("class", "tool_addto icn_right button action:toggleOrUpdate");
		btn.setAttribute("title", "I like it!");
		btn.appendChild(document.createTextNode("合法收藏"));
			//<span class='icn_wrap'>
			var dropdown = document.createElement("span"); 
			dropdown.setAttribute("class", "icn_wrap");
			//<span class='icn icon_select'>
			var select_icon = document.createElement("span");
			select_icon.setAttribute("class", "icn icon_select");
			dropdown.appendChild(select_icon);
		btn.appendChild(dropdown);
			//<div id='ilikeit_container' style='display: none; position: relative;'>
			var container = document.createElement("div");
			container.setAttribute("id", "ilikeit_container");
			container.setAttribute("style", "display: none; position: relative;");
				//<div class='dmco_html dmpi_video_tools_shareselect dmco_select foreground2 light_border background' style='position: absolute; top: -4px; left: 1px; border: 1px solid #DDD; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 0 1px; -moz-box-shadow: rgba(0,0,0,0.3) 0 0 1px; margin-right: 0; padding: 8px 0 4px;'>
				var inside = document.createElement("div");
				inside.setAttribute("class", "dmco_html dmpi_video_list_moveto dmco_select chrome_options foreground2 light_border background");
				inside.setAttribute("style", "position: absolute; top: -4px; left: 1px; border: 1px solid #DDD; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 0 1px; -moz-box-shadow: rgba(0,0,0,0.3) 0 0 1px; margin-right: 0; padding: 8px 0 4px;");
					var urltype_arr = ["ldURL", "sdURL", "hqURL", "hdURL", "hd720URL", "hd1080URL"];
					var urltxt_arr = ["低畫質", "中等畫質", "普通畫質", "高畫質", "高畫質(720p)", "高畫質(1080p)", ];
					var flashvars = decodeURIComponent(document.getElementsByName("flashvars")[0].value);
					for(var j=0;j<urltype_arr.length;j++) {
						var json = flashvars.match('"'+urltype_arr[j]+'":[^,]*', 'g');
						if(json != null) {
							json = json.toString().replace(/\\\//g, "/")
							src_url = JSON.parse("{"+json+"}")[urltype_arr[j]];
							var dom = document.createElement("a");
							dom.setAttribute("class", "dmco_simplelink dmpi_video_tools_addbookmark foreground foreground tool_moveto_bookmark dmco_link action:popup");
							dom.setAttribute("href", src_url);
							dom.appendChild(document.createTextNode(urltxt_arr[j]));
							inside.appendChild(dom);
						}
					}
			container.appendChild(inside);
	li.appendChild(btn);
	li.appendChild(container);
	document.getElementById("sd_video_tools").appendChild(li);

	btn.addEventListener("click", function() {
		document.getElementById('ilikeit_container').style.top = document.getElementById('ilikeit').style.top;
		document.getElementById('ilikeit_container').style.left = document.getElementById('ilikeit').style.left;
		var display = document.getElementById('ilikeit_container').style.display;
		if(display == 'inline')document.getElementById('ilikeit_container').style.display = 'none';
		else document.getElementById('ilikeit_container').style.display = 'inline';
	}, false);
}, 500);