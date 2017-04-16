        var $ = require("../../lib/jquery-3.1.1.min.js")
	function Exposure($node,$num,$width){
		this.$node = $node
		this.$num = $num
		this.heightArr = []
		this.isLoad = true
		this.count = 0
		this.$width = $width
		this.$pictures = this.$node.find('.pictures')
		this.$invisible = this.$node.find('.exposure')
		this.init()
		this.bind()
	}

	Exposure.prototype = {
		init: function(){
			var totalWidth = this.$node.find('.pictures').width(),
				rowNum = Math.floor(totalWidth/this.$width),
				_this = this;
				console.log(totalWidth)//看一下总宽度是多少
				console.log(rowNum)//看一下一行有多少个图片
			for(var i=0;i<rowNum;i++){
				this.heightArr[i] = 10
			}
			console.log(this.heightArr)
		},

		bind: function(){
			var _this = this
			// if(this.check(this.$invisible)){
				// if(_this.isLoad){
					var urls = this.getImgUrls(this.$num)
					this.render(urls)
				// }

			// }

			// $(window).on('scroll',function(){
			// 	if(_this.check(_this.$invisible) && _this.isLoad){
			// 		console.log('chuxianle')//the invisible ele has shown
			// 		var urls = _this.getImgUrls(_this.$num)
			// 		_this.render(urls)
			// 	}
			// })

			this.$invisible.on("click",function(){
				var urls = _this.getImgUrls(_this.$num)
				_this.render(urls)
			})

		},

		check: function($invis){
			var windowHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			var offsetTop = $invis.offset().top
			var height = $invis.outerHeight()
			if(windowHeight+scrollTop>offsetTop){
				if(scrollTop<offsetTop+height){
					return true
				}
			}
		},

		getImgUrls: function(num){
			var color,height,urls = []
			for(var i=0;i<num;i++){
				color = Math.random().toString(16).substring(2,8)
				height = Math.floor(Math.random()*300 + 300)
				urls.push("http://placehold.it/" + this.$width + "x" + height + "/" + color + "/fff")
			}
			// console.log(urls)//看看生成的urls都是什么
			return urls
		},

		render: function(urls){	
			var _this = this
			_this.isLoad = false
			$(urls).each(function(index,url){
				// console.log(url)//看一下该图片的url是什么
				var $img = $('<img>')
				$img.attr('src',url)
				


				$img.on('load',function(){
					_this.count++
					if(_this.count%_this.$num === 0){
						_this.isLoad = true
					}
					var height = this.height
					var minNum = Math.min.apply(null,_this.heightArr)
					var minIndex = _this.heightArr.indexOf(minNum)
					_this.$pictures.append($(this))
					$(this).css('top',minNum)
					$(this).css('left',_this.$width*minIndex+5*minIndex)
					_this.heightArr[minIndex] += height+5

					var maxHeight = Math.max.apply(null,_this.heightArr)
					console.log(maxHeight)
					_this.$pictures.height(maxHeight)
				})


			})

		}
	}


var loadMore = new Exposure($(".waterfull-container"),10,240)