(function( $window, $document, $, _ ){
    var header = ( function(){

        var _header;
        var _page;
        var _body;
        var _menuList;



        function Init(){
			create();
			addEvent();
        }

		function create(){
            _header = $( "#header" );
            _page = $( "#main" ); 
            _body = $( "body" );
            _menuList = _header.find( ".menu_list" ).find( "li" );
        }

		function addEvent() {
            console.log( "addevent ");
            _menuList.on( "click", menuListClick );
        }


        function menuListClick(){
            pageLoad();
        }



        function pageLoad(){

            var strDimd = "";
            strDimd += '<div id="dimd"></div>'
            var strSpinner = "";
            strSpinner += '<div class="dimd_content">',
                strSpinner += '<div class="spinner1">',
                strSpinner += '<div class="rect1"></div>',
                strSpinner += '<div class="rect2"></div>',
                strSpinner += '<div class="rect3"></div>',
                strSpinner += '<div class="rect4"></div>',
                strSpinner += '<div class="rect5"></div>',
                strSpinner += '</div>',
            strSpinner += '</div>',
      
            _body.append( strDimd, strSpinner );
            pageEnd();
            
        }

        function pageEnd(){
            setTimeout( function(){
                $( "#dimd" ).remove();
                $( ".dimd_content" ).remove();

            },3000 );
        }

     
        return{
			Init: Init,
        };

    })();

    $( $document ).ready( function(){
        App.header = header;
        App.header.Init();
    });

})( window, document, jQuery );