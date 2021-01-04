
if( typeof( App ) == undefined || !App ){
    var App = {};

    var console = window.console || { log:function(){} };
    // App.Events = {
    //     RESIZE : "resize",
    //     SCROLL : "scroll"
    // }
    
    App.init = function()
    {
        App.window = $( window );
        App.body = $( "body" );
        App.html = $( "html, body" );

        App.IsIe8 = getVersionIE();
    }

	// ie8 체크
    function getVersionIE(){
        var agent = navigator.userAgent.toLowerCase();
        var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

        if (agent.indexOf("msie") != -1 && trident[1] == "4.0"){
            App.body.removeClass("orderbrowser");
            App.body.addClass("ie8");
            return true;
        }else{
            App.body.removeClass("ie8");
            App.body.addClass("orderbrowser");
            return false;
        }
    }

    App.OnImagePNG = function(){
        var i;
        for (i in document.images) {
            if (document.images[i].src) {
                var imgSrc = document.images[i].src;
                if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') {
                    document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
                }
            }
        }
    }
}

$( document ).ready( function(){
    App.init();
});