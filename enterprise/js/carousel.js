       
        define(['jquery'],function($){

             function Carousel($node){
                // this._this = this
                this.$node = $node
                this.$clock
                this.$width = $(window).outerWidth()
                this.init()
                this.bind()
            }

            Carousel.prototype = {
                init: function(){ 
                    this.$btnPre = this.$node.find('.btn-pre')
                    this.$btnNext = this.$node.find('.btn-next')
                    this.index = 1
                    this.isShow = false
                    this.$picNum = this.$node.find('.picture').children().length
                    this.$lastItem = this.$node.find('.picture').children().last().clone()
                    this.$firstItem = this.$node.find('.picture').children().first().clone()
                    this.$node.find('.picture').prepend(this.$lastItem)
                    this.$node.find('.picture').append(this.$firstItem)
                    this.$node.find('.picture').css('margin-left','-'+this.$width+'px')               
                },

                bind: function(){
                    var _this = this
                    this.$btnPre.on('click',function(){
                        _this.showPre(1)
                    })
                    this.$btnNext.on('click',function(){ 
                        _this.showNext(1)
                    })
                    this.$node.find('.index-bar').on('click','li',function(){
                        var index = $(this).siblings('.active').index()//点击前，状态条的位置
                        var indexClick = $(this).index()//被点击时的状态条的位置
                        if(indexClick<index){
                            _this.showPre(index-indexClick)
                        }else if(indexClick>index){
                            _this.showNext(indexClick-index)
                        }                   
                    })
                    this.$clock = setInterval(function(){
                        _this.showNext(1)
                    },2000)
                    // setInterval(function(){
                    //     _this.showPre(1)
                    // },2000)
                },

                showPre: function(n){
                    var _this = this
                    clearInterval(_this.$clock)
                    if(!_this.isShow){
                        _this.isShow = true
                        _this.$node.find('.picture').animate({'margin-left':'+='+_this.$width*n+'px'},function(){
                            if(_this.$node.find('.picture').css('margin-left') === '0px'){//当图片播放到最前面的克隆元素后，瞬间切换到最后一张图片
                                _this.$node.find('.picture').css('margin-left','-'+_this.$picNum*_this.$width+'px')
                            }
                            _this.index = _this.index - n
                            _this.changeBar(_this.index)
                        })    
                    }
                },

                showNext: function(n){                
                    var _this = this
                     if(!_this.isShow){
                        _this.isShow = true
                        _this.$node.find('.picture').animate({'margin-left':'-='+_this.$width*n+'px'},function(){
                            if(_this.$node.find('.picture').css('margin-left') === "-"+(_this.$picNum+1)*_this.$width+"px"){//当图片播放到最后面的克隆元素后，瞬间切换到第一张图片
                                _this.$node.find('.picture').css('margin-left',"-"+_this.$width+'px')
                            }
                            _this.index = _this.index + n
                            
                            _this.changeBar(_this.index)
                        })               
                    }               
                },

                changeBar: function(k){
                    var _this = this
                    if(k === 0){//当状态条的index值减到0时，瞬间切换到最后一个状态条
                        _this.index = 5
                    }else if(k === 6){//当状态条的index值增加到6时，瞬间切换到第一个状态条
                                _this.index = 1
                    }
                    _this.$node.find('.bar').each(function(){
                        $(this).removeClass('active')
                    })
                    _this.$node.find('.bar').eq(_this.index-1).addClass('active')
                    _this.isShow = false 
                    console.log(_this.index)              
                }
            }
            return Carousel           
        })
