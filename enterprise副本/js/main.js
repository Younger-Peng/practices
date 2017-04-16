requirejs.config({
  baseUrl: "./js",
  paths:{
    'jquery':'../../lib/jquery-3.1.1.min'
  }
})

requirejs(['./carousel'],function(Carousel){
	var carousel = new Carousel($(".carousel"))
	
	$(window).on("resize",function(){
		carousel.$width = $(window).outerWidth() 
		carousel.$node.find('.picture').children().each(function(index,pic){
			$(this).width($(window).outerWidth())
		})	
	})
	console.log("this is carousel");
})

requirejs(['./waterfull'],function(Exposure){
	var loadMore = new Exposure($(".waterfull-container"),10,240)
})

requirejs(['./gotop'],function(Gotop){
	var gotop = new Gotop("./img/rocket.gif")
})