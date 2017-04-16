        var $ = require("../../lib/jquery-3.1.1.min.js")
	function Gotop(url){
		this.$rocket = $("<img>")
		this.url = url
		this.$rocket.css({
			"position":"fixed",
			"bottom": "30px",
			"right": "20px",
			"width": "100px",
			"height": "100px",
			"border-radius":"50%",
			"box-shadow":"0 0 10px rgba(0,0,0,.9)",
			"display": "none",
			"cursor":"pointer",
			"border":"5px solid #f78004",
			"src":this.url,
			"opacity":".9"
		}).attr("src",this.url)
		  .addClass("rocket")

		this.$rocket.appendTo($("body"))
		this.bind()
	}
	Gotop.prototype.bind = function(){
		var _this = this
		$(window).on("scroll",function(){
			if($(this).scrollTop() >= 500){
				_this.$rocket.fadeIn()
			}else {
				_this.$rocket.fadeOut()
			}
		})
		this.$rocket.on("click",function(){
			console.log(1)
			$("body").animate({
				scrollTop:0
			},500)
		})
	}


	var gotop = new Gotop("./img/rocket.gif")

