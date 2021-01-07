(function( $window, $document, $, _ ){
    var main = ( function(){

        function Init(){
			create();
			addEvent();
        }

        var _main;
        var _mainSwiperBox;
        var _mainSwiper;
        var _idnexSwiper;
        var _total;
        var _sT;
        var _sections;
        var _isInSections;
        var _btnSend;

		function create(){
            _main = $( ".main" );
            _mainSwiperBox = _main.find( ".visual_wrap" );
            _idnexSwiper = 0;
            _total = $( ".visual_list" ).children( "li" ).length;
            _sections = _main.find( "section" );
            _isInSections = [];
         
            _sections.each( function( $index ){
                _isInSections.push(false);
            })
            _btnSend = $( ".btn_send" );
        }

		function addEvent() {
            console.log( "addevent" );
            resizeEvent( null );
            App.window.on( "reisze", resizeEvent );
            scrollEvent( null );
            App.window.on( "scroll", scrollEvent );
            mainSwiperInit();
            barSlideMotion();
            _btnSend.on( "click", btnSendClick );

        }

        function resizeEvent(){
            _mainSwiperBox.css({
                height : App.window.height()
            });
        }

        function section2Show(){
            var cardList = $( ".port_list" ).find( "li");
            cardList.each( function( index, el ){
              var that = $( this );
              var dimdD = that.find( ".dimd.b" );
              var dimdW = that.find( ".dimd.w" );
              var img = that.find( "img" );
              gsap.set( dimdD, { top: "-100%" });
              gsap.to( dimdD, 1, { top: "100%", ease:Expo.easeIn, delay: index * 0.1 });

              gsap.set( dimdW, { top: "-100%" });
              gsap.to( dimdW, 2,{ top: "100%", ease:Expo.easeOut, delay: index * 0.1 });

              gsap.set( img, { opacity: 0, scale:1.5 });
              gsap.to( img, 2, { opacity: 1, scale:1, ease:Expo.easeIn, delay: index * 0.1 });
            })
        }

        function scrollEvent(){
            _sT = $( this ).scrollTop();
            var sectionThis;
            _sections.each( function( $index ){
                sectionThis = $( this );

                if( _sT > ( sectionThis.offset().top - App.window.height()) + App.window.height() / 2 ){
                    if( _isInSections[ $index ] == true  ) return;

                    switch( $index ){
                        case 0 : console.log( "섹션1" );
                            break;
                        case 1 : section2Show();
                        break;
                        case 2 : 
                            
                        console.log( "섹션3" );
                        break;
                        case 3 : console.log( "섹션4" );
                        break;
                        case 4 : console.log( "섹션5" );
                        break;
                    }
                    _isInSections[ $index ] = true;  
                }
            }) 
        }

        function mainSwiperInit(){
            console.log( "mainSwiperInit" );
            _mainSwiper= new Swiper( ".swiper-container",{
                effect: 'fade',
                autoplay: true,
                loop: true,
                pagination:{
                    watchSlidesProgress: true,
                    autoplay: 5000
                },
                on:{
                    slideChange : function(){
                        _idnexSwiper = this.realIndex ;
                        barSlideMotion();
                        visualTextShow();
                    }
                }
            });
        }
        
        function barSlideMotion(){
            var progressBar  = _main.find( ".progress" );
            gsap.killTweensOf( progressBar );
            gsap.set( progressBar, { width: "0%" });
            gsap.to( progressBar, 5, { width: "100%", ease:Power0.easeIn, onComplete: function(){
                _idnexSwiper++;
                pageSwiper( _idnexSwiper );
                barSlideMotion();
                visualTextShow();
            }});
        }

        function visualTextShow(){
            var textTitle = _main.find( ".title__box" ).find( "strong" );
            var subText = _main.find( ".sub__text-box" ).find( "span" );
            gsap.killTweensOf( textTitle );
            gsap.killTweensOf( subText );

            gsap.set( textTitle, { top: textTitle.height() });
            gsap.to( textTitle, 0.75, { top: 0, ease:Expo.easeInOut });

            gsap.set( subText, { top: subText.height() });
            gsap.to( subText, 1.1, { top: 0, ease:Expo.easeInOut });



        }

        function pageSwiper( $index ){
            if( $index < 0 ){
                _idnexSwiper = 0;
            }else if( _idnexSwiper >= _total ){
                _idnexSwiper = 0;
            }

            _mainSwiper.slideTo( _idnexSwiper );
        }
 

        function btnSendClick(){
            var templateParams = {	
                    userName: $('input[name=name]').val(),
                    userPhone: $('input[name=phone]').val(), 
                    userEmail : $('input[name=email]').val(),
                    message : $('textarea[name=message]').val()
                };

                emailjs.send('heojungwon', 'template_bifmba63', templateParams)
                        .then(function(response) {
                            alert( "메일 보내주셔서 감사합니다." )
                            console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                            console.log('FAILED...', error);
                        });
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