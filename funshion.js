//<a href="###" id="collectbtn" class="btn" title="收藏" hidefocus="true" style="background-position: -163px -2px;">收藏</a>
var collectbtn = document.createElement("a");
collectbtn.removeAttribute("class");
collectbtn.setAttribute("class", "btn");
collectbtn.setAttribute("title", "收藏");
collectbtn.setAttribute("style", "cursor: pointer;");
collectbtn.setAttribute("id", "collectbtn");
collectbtn.innerHTML = "收藏";
collectbtn.addEventListener("click", function() {
    var html = "";
    var dub = ["國", "粵", "外"];
    var txt = ["流暢", "標準", "高清"];
    var arr = [
        video_src["chi"]["tv"], video_src["chi"]["dvd"], video_src["chi"]["high-dvd"],
        video_src["arm"]["tv"], video_src["arm"]["dvd"], video_src["arm"]["high-dvd"],
        video_src["und"]["tv"], video_src["und"]["dvd"], video_src["und"]["high-dvd"],
    ];
    for(var i=0;i<txt.length;i++) {
        html += "<h1>"+txt[i]+":</h1> ";
        for(var j=0;j<dub.length;j++) {
            html += "<p>["+dub[j]+"] ";
            for(var k=0;k<arr[i+3*j].length;k++)
                html += "<a href='"+arr[i+3*j][k]+"' target='_blank'>載點("+(k+1)+")</a> ";
        }
        html += "</p>";
    }
    //console.log(html);
    document.getElementById("pckhdxiaz").innerHTML = "<p style='padding: 0px;'>"+html+"</p>";
}, false);

var css = ''+
    '#collectbtn {'+
    '   background: url(\'http://i.imgur.com/EdQvbsC.png\') no-repeat scroll 0 0 transparent;'+
    '   background-position: -163px -2px;'+
    '}'+
    '#collectbtn:hover {'+
    '   background-position: -163px -37px;'+
    '}'+
    '.immediately_download {'+
    '   height: auto;'+
    '}',
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

var url = "http://api.funshion.com/ajax/get_webplayinfo/"+location.href.split("play/")[1]+"/mp4";
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            //console.log(xhr.responseText);
            var json = eval('(' + xhr.responseText + ')');
            var info = json.playinfos;
            for(var i=0;i<info.length;i++) {
                var video_info_url = "http://jobsfe.funshion.com/query/v1/mp4/"+info[i].cid+".json?bits="+info[i].byterate;
                load(video_info_url, info[i].dub_one);
                if(i == info.length - 1) {
                    var parent = document.getElementById("subscribebtn").parentNode;
                    parent.removeChild(document.getElementById("subscribebtn"));
                    parent.appendChild(collectbtn);
                }
            }
            console.log("done");
        } else {
            console.log(xhr.status);
        }
    }
};
xhr.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+url, true);
xhr.send(null);

var video_src = {
    "chi": {
        "tv": [],
        "dvd": [],
        "high-dvd": []
    },
    "arm": {
        "tv": [],
        "dvd": [],
        "high-dvd": []
    },
    "und": {
        "tv": [],
        "dvd": [],
        "high-dvd": []
    }
};
var load = function(video_info_url, dub_one) {
    var xhr_main = new XMLHttpRequest();
    xhr_main.open('GET', 'http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url='+video_info_url, true);
    xhr_main.onreadystatechange = function() {
        if (xhr_main.readyState == 4) {
            if (xhr_main.status == 200) {
              //console.log(xhr_main.responseText);
              var json_main = eval('(' + xhr_main.responseText + ')');
              //console.log(json_main.playlist[0].urls);
              var video_urls = json_main.playlist[0].urls;
              for(var j=0;j<video_urls.length;j++) {
                  //console.log(video_urls[j]);
                  video_src[dub_one][json_main.playlist[0].tname].push(video_urls[j]);
              }
            }
        }
    };
    xhr_main.send(null);
};