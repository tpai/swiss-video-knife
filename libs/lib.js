var getParameterByName = function(url, name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};

var sigHandler = function(s){
	var sArray = s.split("")
	var tmpA, tmpB

	tmpA = sArray[0]
	tmpB = sArray[52]

	sArray[0] = tmpB
	sArray[52] = tmpA

	tmpA = sArray[83]
	tmpB = sArray[62]

	sArray[83] = tmpB
	sArray[62] = tmpA

	sArray = sArray.slice(3)
	sArray = sArray.reverse()
	sArray = sArray.slice(3)

	return sArray.join("")
};