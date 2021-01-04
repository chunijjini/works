(function( $window, $document, $, _ ){
    var main = ( function(){

        function Init(){
			create();
			addEvent();
        }
		var _w;
		var _controller;	
		var _body;
		var _scrollBar;
		var _animateds;

		function create(){
			_w = $(window);
			_controller = new ScrollMagic.Controller({
				refreshInterval: 0
			});
			_body = $( "body" )[0];
			// _scrollBar = Scrollbar.init( _body );
			_animateds = $( ".animated" );
        }

		function addEvent() {
			console.log( "addEvent" );
			// $( window ).on( "load",  animatedShow() );
			window.addEventListener( "wheel", mouseWheelEvent, {passive: false} );
		}
		var _wheelIndex = 0;
		function mouseWheelEvent( event ){

			/* For IE */
			if (!event) event = window.event;
					
			if (event.wheelDelta) delta = event.wheelDelta / 120; /* IE/Chrome/Opera */
			else if (event.detail) delta = -event.detail/3; /* Mozilla case */
			
			event.preventDefault();

			var scrollTime = 1.2; //Scroll time
			var scrollDistance = 300; //Distance. Use smaller value for shorter scroll and greater value for longer scroll 170
			var delta = event.wheelDelta / 120 || -event.originalEvent.detail / 3;
			
			var scrollLeft = _w.scrollLeft();
			var finalScroll = scrollLeft - parseInt(delta * scrollDistance);
		
			console.log( typeof($( ".intro__video").css( "left" )) , typeof( -($( ".intro__video" ).width()) + "px"));
			if( event.deltaY < 0 ){
				if( _wheelIndex <= 0 ) return;
				_wheelIndex--;
				console.log( _wheelIndex, "====>", (delta * _wheelIndex ) * 120 );
				TweenMax.to( $( ".intro__video" ), scrollTime, { css: { left: "-" + (delta * _wheelIndex ) * 120  }});
			}else if( event.deltaY > 0 ){
				if( $( ".intro__video").css( "left" ) >= -($( ".intro__video" ).width()) + "px"  ){
					_scrollBar = Scrollbar.init( _body );
				}
				_wheelIndex++;
				TweenMax.to( $( ".intro__video" ), scrollTime, { css: { left: "+=" + (delta * _wheelIndex ) * 120  }});
				console.log( _wheelIndex );
			}

			// TweenMax.to( $( ".intro__video" ), scrollTime, { css: { left: "+=" + delta * 120  }});

			// var mainWidth = $( "#contents" ).width();
			// var videoMove = TweenMax.to( $( ".intro__video" ), 0, { css: { left: finScroll + "vw" }});
			// var videoMoveScene = new ScrollMagic.Scene({ triggerElement: ".contents__area", dyration: mainWidth })
			// .setTween( videoMove )
			// .addIndicators()
			// .addTo(_controller);

		}
		function animatedShow(){
			_animateds.each( function(){
				var that = $( this);
				var thatHeight = that.height();
				var scene = new ScrollMagic.Scene({
					triggerElement: that[0], duration: thatHeight
				})
				.addIndicators()
				.addTo(_controller);
				scene.triggerHook(0.3);
				scene.refresh();

			})
		}

		function mainAnimate(){
			
		}


        return{
			Init: Init,
        };

    })();

    $( $document ).ready( function(){
        App.main = main;
        App.main.Init();
    });

})( window, document, jQuery );