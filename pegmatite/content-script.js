function encode64(data) {
	for (var r = "", i = 0, n = data.length; i < n; i += 3) {
		r += append3bytes(
			data.charCodeAt(i),
			i + 1 != n ? data.charCodeAt(i + 1) : 0,
			i + 2 != n ? data.charCodeAt(i + 2) : 0);
	}
	return r;
}

function append3bytes(b1, b2, b3) {
	var c1 = b1 >> 2;
	var c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
	var c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
	var c4 = b3 & 0x3F;
	var result =
		encode6bit(c1 & 0x3F) +
		encode6bit(c2 & 0x3F) +
		encode6bit(c3 & 0x3F) +
		encode6bit(c4 & 0x3F);
	return result;
}

function encode6bit(b) {
	if (b < 10) return String.fromCharCode(48 + b);
	b -= 10;
	if (b < 26) return String.fromCharCode(65 + b);
	b -= 26;
	if (b < 26) return String.fromCharCode(97 + b);
	b -= 26;
	if (b == 0) return "-";
	if (b == 1) return "_";
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

[].forEach.call(document.querySelectorAll("div[puml],pre[uml],pre[lang='uml']>code"), function(umlElem) {
	var parent = umlElem.parentNode;
	var plantuml = umlElem.textContent.trim();
	if (plantuml.substr(0, "@start".length) != "@start") return;

	var url = "https://www.plantuml.com/plantuml/svg/" + compress(plantuml);
	var imgElem = document.createElement("object");
	imgElem.setAttribute("type", "image/svg+xml");
	imgElem.setAttribute("data", escapeHtml(url));
	// imgElem.setAttribute("title", plantuml);
	parent.replaceChild(imgElem, umlElem);

	// imgElem.onclick = function() {
	// 	parent.replaceChild(umlElem, imgElem);
	// };
	// umlElem.onclick = function() {
	// 	parent.replaceChild(imgElem, umlElem);
	// };
});
