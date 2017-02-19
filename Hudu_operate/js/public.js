window.addEventListener("resize", setSize, false);
window.addEventListener("orientationchange", setSize, false);
function setSize() {
	var html = document.getElementsByTagName('html')[0];
	var width = html.getBoundingClientRect().width;
	//当宽度大于540的时候最大宽度为540，否则该是多少就多少。
	width = width > 829 ? 800 : width;
	html.style.fontSize = width / 7 + "px";
}

setSize();