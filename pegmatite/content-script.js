/* global chrome */

function encode64(data) {
	for (var r = "", i = 0, n = data.length; i < n; i += 3) {
		r += append3bytes(
			data.charCodeAt(i),
			i + 1 !== n ? data.charCodeAt(i + 1) : 0,
			i + 2 !== n ? data.charCodeAt(i + 2) : 0);
	}
	return r;
}

function append3bytes(b1, b2, b3) {
	var c1 = b1 >> 2;
	var c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
	var c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
	var c4 = b3 & 0x3F;
	return encode6bit(c1 & 0x3F) +
		encode6bit(c2 & 0x3F) +
		encode6bit(c3 & 0x3F) +
		encode6bit(c4 & 0x3F);
}

function encode6bit(b) {
	if (b < 10) return String.fromCharCode(48 + b);
	b -= 10;
	if (b < 26) return String.fromCharCode(65 + b);
	b -= 26;
	if (b < 26) return String.fromCharCode(97 + b);
	b -= 26;
	if (b === 0) return "-";
	if (b === 1) return "_";
	return "?";
}

function compress(s) {
	s = unescape(encodeURIComponent(s));
	return encode64(deflate(s));
}

function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function replaceElement(umlElem, srcUrl) {
	var parent = umlElem.parentNode;
	var imgElem = document.createElement("img");
	imgElem.setAttribute("src", escapeHtml(srcUrl));
	imgElem.setAttribute("title", "");
	parent.replaceChild(imgElem, umlElem);

	imgElem.ondblclick = function() {
		parent.replaceChild(umlElem, imgElem);
	};
	umlElem.ondblclick = function() {
		parent.replaceChild(imgElem, umlElem);
	};
}

var siteProfiles = {
	"default": {
		"selector": "pre[lang='uml'], pre[lang='puml'], pre[lang='plantuml']",
		"extract": function (elem) {
			return elem.querySelector("code").textContent.trim();
		}
	},
	"gitpitch.com": {
		"selector": "pre code.lang-uml",
		"extract": function (elem) {
			return elem.innerText.trim();
		}
	}
};

chrome.storage.local.get("baseUrl", function(config) {
	var siteProfile = siteProfiles[window.location.hostname] || siteProfiles["default"];
	var baseUrl = config.baseUrl || "https://www.plantuml.com/plantuml/img/";
	[].forEach.call(document.querySelectorAll(siteProfile.selector), function (umlElem) {
		var plantuml = siteProfile.extract(umlElem);
		if (plantuml.substr(0, "@start".length) !== "@start") return;
		var plantUmlServerUrl = baseUrl + compress(plantuml);
		if (plantUmlServerUrl.lastIndexOf("https", 0) === 0) { // if URL starts with "https"
			replaceElement(umlElem, plantUmlServerUrl);
		} else {
			// to avoid mixed-content
			chrome.runtime.sendMessage({ "action": "plantuml", "url": plantUmlServerUrl }, function(dataUri) {
				replaceElement(umlElem, dataUri);
			});
		}
	});
});
