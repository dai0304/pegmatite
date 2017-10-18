var isCSPDisabled = true;

var onHeadersReceived = function (details) {
	if (!isCSPDisabled) {
		return;
	}

	for (var i = 0; i < details.responseHeaders.length; i++) {
	    // console.log('###',details.responseHeaders[i].name.toLowerCase())
		if ("content-security-policy" === details.responseHeaders[i].name.toLowerCase()) {
			details.responseHeaders[i].value = "";
		}
	}

	return {
		responseHeaders: details.responseHeaders
	};
};


var filter = {
	urls: ["*://*/*"],
	types: ["main_frame", "sub_frame"]
};

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);

