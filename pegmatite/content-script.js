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

[].forEach.call(document.querySelectorAll("pre[lang='uml']"), function(umlElem) {
	var parent = umlElem.parentNode;
	var plantuml = umlElem.querySelector("code").textContent.trim();
	if (plantuml.substr(0, "@start".length) !== "@start") return;

	var url = "https://www.plantuml.com/plantuml/img/" + compress(plantuml);
	var imgElem = document.createElement("img");
	imgElem.setAttribute("src", escapeHtml(url));
	imgElem.setAttribute("title", "");
	parent.replaceChild(imgElem, umlElem);

	imgElem.onclick = function() {
		parent.replaceChild(umlElem, imgElem);
	};
	umlElem.onclick = function() {
		parent.replaceChild(imgElem, umlElem);
	};
});
