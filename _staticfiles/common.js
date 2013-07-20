function showl(){
    var l = $('#login_form');
    var r = $('#reg_form');

    if ( r.is(":visible") )
        r.hide(500);

    if ( l.is(":visible") )
        l.hide(500);
    else
        l.show(500);

    $('#login_form input').eq(0).focus();
}
function showr(){
    var l = $('#login_form');
    var r = $('#reg_form');

    if ( l.is(":visible") )
        l.hide(500);

    if ( r.is(":visible") )
        r.hide(500);
    else
        r.show(500);

    $('#reg_form input').eq(0).focus();
}

function getPos(type, point){
    if(!Array.indexOf){
      Array.prototype.indexOf = function(obj){
       for(var i=0; i<this.length; i++){
     if(this[i]==obj){
      return i;
     }
       }
       return -1;
      }
    }
    return (TYPE.indexOf(type)) + ((point-100)/100)*5 ;
}

function show(type, point){
    $('.in.quest').eq( getPos(type, point) ).addClass('lime');

    for (var i=0; i<QUESTION.length; i++){
        var q = QUESTION[i];
        if ( q.type == type && q.point == point  )
            break;
    }

    
    // cType hidden
    $( "input[name='cType']" )[0].value = type;
    $( '.cInfo' ).html( type );

    // cPoint hidden
    $( "input[name='cPoint']" )[0].value = point;
    $( '.point' ).html( point );

    // clear 
    $( '.response' ).html( '' );
    $( '.content.inner' ).html( '' );
    $( "input[name='key']" )[0].value = '';
    
    // insert content
    $( '.content .inner' ).html( q.content );
    
    // Enable or Disable Link
    if ( q.link != '' ){
        $( '.link' ).show();
        var _link = q.link;
        if ( _link.substr(0, 4) != 'http' ){
            _link = _link.split('/').pop();
            $( '.link h5' ).html( $('<a>').attr({'href': 'files/' + q.link, 'target': '_blank'}).text( _link ) );
        } else {
            $( '.link h5' ).html( $('<a>').attr({'href': q.link, 'target': '_blank'}).text( _link ) );
        }
    }else{
        $( '.link h5' ).html('');
        $( '.link' ).hide();
    }
    
    // Enable or Disable Hint1
    $( '.hint1 h5').html( q.hint1 );

    if (q.hint1 != ''){
        $( '.hint1').show();
    }else{
        $( '.hint1' ).hide();
    }
    
    // Enable or Disable Hint2
    $( '.hint2 h5' ).html( q.hint2 );
    if ( q.hint2 != '' ){
        $( '.hint2' ).show();
    }else{
        $( '.hint2' ).hide(); 
    }
    
    // Enable or Disable Hint3
    $( '.hint3 h5' ).html( q.hint3 );    
    if ( q.hint3 != '' ){
        $( '.hint3' ).show();
    }else{    
        $( '.hint3' ).hide();
    }
}


function sendKey(){
    var cType  = document.send.cType.value;
    var cPoint = document.send.cPoint.value;
    var key    = document.send.key.value;
    
    var callback = function(data){
        if (data.search("<script>") != -1){
            $(".response").html(data);

        } else if (data.search("Matched") != -1){
            setTimeout( function(){window.location.reload()}, 1000 );
        }
        $( '.response' ).html( data );
        document.send.key.value = '';
    };
    
    $.post( 'ajax/keyCheck.php', 
            {'cType':cType, 'cPoint':cPoint, 'key':key}, 
            callback, 
            'text' );
}


function reg(form){
    var uid        = form.uid.value;
    var pwd        = form.pwd.value;
    var pwd2       = form.pwd2.value;
    var ticketCode = form.ticketCode.value;

    if ( uid && pwd && pwd2){
        if (pwd == pwd2){
            $.post( 'ajax/reg.php', 
                    {'uid':uid, 'pwd':pwd, 'pwd2':pwd2, 'ticketCode':ticketCode}, 
                    function(data){ 
                        $( '#reg_form .errorMsg' ).text(data);
                        if (data.search('created') != -1)
                            window.location.reload();                            
                    }, 
                    'text' );
        } else {
            $( '#reg_form .errorMsg' ).text( 'The second password isn\'t as same as the first' );
        }
    } else {
        $( '#reg_form .errorMsg' ).text( 'Fields isn\'t completed.' );
    }

} 

function login(form){
    var uid = form.uid.value;
    var pwd = form.pwd.value;    

    if ( uid && pwd ){
        $.post( 'ajax/login.php', 
                {'uid':uid, 'pwd':pwd}, 
                function(data){ 
                    $( '#login_form .errorMsg' ).text(data);
                    if (data.search('success') != -1)
                        window.location.reload();
                }, 
                'text' );
    } else {
        $( '#login_form .errorMsg' ).text( 'Fields isn\'t completed' );
    }
  
} 
