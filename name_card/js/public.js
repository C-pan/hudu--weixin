window.addEventListener("resize", setSize, false);
window.addEventListener("orientationchange", setSize, false);
function setSize() {
	var html = document.getElementsByTagName('html')[0];
	var height = html.getBoundingClientRect().height;
	//当宽度大于540的时候最大宽度为540，否则该是多少就多少。
	//height = height > 800 ? 800 : height;
	html.style.fontSize = height / 13 + "px";
}

setSize();

document.onreadystatechange = PageLoaded;

//当页面加载完成后执行 loading动画
var deg_num = 0,isTransform = true
function PageLoaded() {
	var timer3 = setInterval(function(){
		deg_num += 1
		if(deg_num >= 36){
			deg_num = 0
		}
		if(isTransform){
			document.getElementById('loading').style.transform = 'rotate('+deg_num*-10+'deg)'
		}
	},50)

	if (document.readyState == "complete") {
		document.getElementById('section').style.display = 'block'
		document.getElementById('footer').style.display = 'block'

		var num1 = 0
		var timer1 = setInterval(function(){

			document.getElementById('bg').style.opacity = 1 - num1/10
			num1 += 1
			if(num1 >= 10){
				clearInterval(timer1)
				isTransform = false
				$('#bg').css('display','none')
				$('#bg_box').css('left',0)
				$('.section_header').css('left',0)
				$('.section_main').css('right',0)
				$('.recommended').css('right',0)
				$('#footer').css({right: 0,opacity: 1})
				$('.banner>img').css({opacity: 1,transform: 'translate(0,0)'})
				$('.section_header_logo img').css({opacity: 1,transform: 'translate(0,0)'})
				$('.banner_li1 > img').css({opacity: 1,transform: 'translate(0,0)'})
				$('#section').css({opacity: 1})
			}
		},100)
	}
}
// 判断手机 竖屏或者是横屏状态
function hengshuping(){ 
  if(window.orientation==180||window.orientation==0){
	$('#model-box-landscape').css('display','none')
  }
if(window.orientation==90||window.orientation==-90){
	$('#model-box-landscape').css('display','table')
  }
 }
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 
// 放大二维码
var codeDom = $('#code')
codeDom.on('click', function(){
	$('#model-box-code').css('display','table')
})
$('#model-box-code').on('click', function(){
	$('#model-box-code').css('display','none')
})