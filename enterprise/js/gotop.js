define(['jquery'],function(){
	function Gotop(){
		this.$rocket = $("<button>Gotop</button>")
		this.$rocket.css({
			"position":"fixed",
			"bottom": "20px",
			"right": "20px",
			"width": "100px",
			"height": "50px",
			"font-size": "20px"
		})
		this.$rocket.appendTo($("body"))
		this.bind()
	}
	Gotop.prototype.bind = function(){
		this.$rocket.on("click",function(){
			console.log(1)
			$("body").animate({
				scrollTop:0
			},500)
		})
	}
	return Gotop
})