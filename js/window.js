var i = 1;
function minimizeWindow(obj)
    {
    var id = obj.id;
    var parent = obj.parentNode.parentNode.parentNode;
    var x3 = obj.parentNode;
    var a = x3.childNodes[ 1 ]
    parent.style.display = 'none';
    var task_var = 'task_'+a.id;
    document.getElementById( task_var ).style.backgroundColor = 'grey';
    }
function restoreWindow(obj)
    {
    var x2 = obj.parentNode;
    var a = x2.childNodes[ 1 ]
    var b = document.getElementById( 'm'+a.value).parentNode.parentNode.parentNode;
    b.style.display = 'block';
    var task_var = 'task_'+a.value;
    document.getElementById( task_var ).style.backgroundColor = 'black';
    }
function closeWindow(obj) 
    {
    var id = obj.id;
    var x1 = obj.parentNode.parentNode.parentNode;
    x1.parentNode.removeChild( x1 );
    var task_var = 'task_'+id;
    document.getElementById( task_var ).parentNode.removeChild( document.getElementById( task_var ) );
    }
function showWindow(title)
    {
    i += 1;
    var window = document.createElement( 'div' );
    var options_bar = document.createElement( 'div' );
    var window_title = document.createElement( 'span' );
    var buttons = document.createElement( 'div' );
    var clear = document.createElement( 'div' );
    var window_content = document.createElement( 'div' );
    var close = document.createElement( 'img' );
    var minimize = document.createElement( 'img' );
    var task = document.createElement( 'div' );
    var task_ico = document.createElement( 'img' );
    var input = document.createElement( 'input' );
    var titlediv = document.createElement( 'div' );
    var titletext = document.createElement( 'span' );
    
    titlediv.className = "title";
    titlediv.id = "title_"+i;
    titletext.className = "title_text";
    task.className = "icon";
    task_ico.className = "folder_ico";
    window.className = "window";
    options_bar.className = "options_bar";
    window_title.className = "window_title";
    buttons.className = "buttons";
    clear.className = "clear";
    window_content.className = "window_content";
    close.className = "bar_opts";
    close.id = i;
    minimize.id = 'm'+i;
    task.id = 'task_'+i;
    task.style.backgroundColor = "black";
    minimize.className = "bar_opts";
    
    close.setAttribute('src', 'images/close.gif');
    minimize.setAttribute('src', 'images/minimize.gif');
    close.setAttribute('alt', 'close');
    close.setAttribute('onclick', 'closeWindow(this)');
    minimize.setAttribute('onclick', 'minimizeWindow(this)');
    minimize.setAttribute('alt', 'minimize');
    task_ico.setAttribute('src', 'images/folder.png');
    task_ico.setAttribute('alt', 'folder');
    task_ico.setAttribute('onclick', 'restoreWindow(this)');
    task_ico.setAttribute('onmousemove', 'showTitle(this)');
    task_ico.setAttribute('onmouseout', 'hideTitle(this)');
    input.setAttribute('value', i);
    input.setAttribute('type', 'hidden');
    options_bar.setAttribute('onmousedown', 'startDrag(event,this)');

    titletext.appendChild( document.createTextNode( title ) );
    window_content.appendChild( document.createTextNode( title ) );
    window_title.appendChild( document.createTextNode( title ) );
    window.appendChild( window_title );
    window.appendChild( buttons );
    window.appendChild( close );
    window.appendChild( minimize );
    titlediv.appendChild( titletext );
    buttons.appendChild( minimize );
    buttons.appendChild( close );
    document.getElementById( 'tasks' ).appendChild( task );
    document.getElementById( 'tasks' ).appendChild( titlediv );
    task.appendChild( task_ico );
    task.appendChild( input );
    options_bar.appendChild( buttons );
    options_bar.appendChild( window_title );
    options_bar.appendChild( clear );
    window.appendChild( options_bar );
    window.appendChild( window_content );
    document.body.appendChild( window );
    }
function showTitle(obj) 
    {
    var b = obj.parentNode;
    var a = b.childNodes[ 1 ];
    document.getElementById( "title_"+a.value ).style.display = "block";
    }
function hideTitle(obj) 
    {
    var b = obj.parentNode;
    var a = b.childNodes[ 1 ];
    document.getElementById( "title_"+a.value ).style.display = "none";
    }
    
var dragging = false;
var mouseX, mouseY, cssx, cssy, i, o, m;
var cssx1 = new Array();
var cssy1 = new Array();
var windows = document.getElementsByClassName( 'window' );
    
function startDrag( e, obj ) {
    dragging = true;
    objbox = obj.parentNode;
    cssx = objbox.offsetLeft;
    cssy = objbox.offsetTop;
    //alert( cssx );
    mouseX = e.clientX - cssx;
    mouseY = e.clientY - cssy;
    for ( i=0; i < windows.length; ++i ) {
        windows[ i ].style.zIndex = "1";  
    }
    objbox.style.zIndex = "3";
}
function dragWindow( e, obj ) {
    if ( dragging ) {
        x = e.clientX - mouseX;
        y = e.clientY - mouseY;
        objbox.style.left = x + 'px';
        objbox.style.top = y + 'px';
        return false;
    }
    for ( o=0; o < windows.length; ++o ) {
        if ( cssx1 == "" || cssy1 == "" ) {
            cssx1[ o ] = windows[ o ].offsetLeft;
            cssy1[ o ] = windows[ o ].offsetTop;
        }
        //cssy = windows[ o ].offsetTop;
        //alert( cssx );
        mouseX1 = e.clientX - cssx1[ o ];
        mouseY1 = e.clientY - cssy1[ o ];
        document.getElementById( 'xy' ).innerHTML = mouseX1 + ", " + mouseY1;
        if ( mouseX1 < 6 && mouseX1 > 0 && mouseY1 < 439 && mouseY1 > 0 ) {
            document.body.style.cursor = "w-resize";
        }
        else {
            document.body.style.cursor = "default";
        }
        if ( mouseY1 < 6 && mouseY1 > 0 && mouseX1 > 0 && mouseX1 < 411 ) {
            document.body.style.cursor = "n-resize";
        }
        else {
            document.body.style.cursor = "default";
        }
        //else if ( mouseY1 > 6 || mouseY1 < 0 ) {
            
    }
}
function dropWindow( obj ) {
    for ( m=0; m < windows.length; ++m ) {
        cssx1[ m ] = windows[ m ].offsetLeft;
        cssy1[ m ] = windows[ m ].offsetTop;
    }
    dragging = false;
}

document.onmouseup = dropWindow;
document.onmousemove = dragWindow;