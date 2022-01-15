"use strict";

(function ( window ){
	
	var elExp = /\w+/,
	htmlExp = /^<\w+>/,
	valExp = /<[^>]+>/g,
	events = {},
	document = window.document,
	LGZZK = function( selector ){
		return new LGZZK.fn.init( selector );
	};
	
	LGZZK.fn = LGZZK.prototype = {
		
		constructor: LGZZK,
		
		init: function ( selector ){
			
			var elem,
			i = 0,
			selectorType = typeof selector;
			// HANDLE: (""), (null), (undefined), (false)
			if( !selector ){
				return this;
			}
			this.length = 0;
			selector = selectorType !== "string" ? selector : selector.trim();
			if( selectorType === "string" ){
				if( htmlExp.exec( selector ) ){ 
					try{
						this[ 0 ] = document.createElement( elExp.exec( selector ) );
						this[ 0 ].innerText = selector.replace( valExp, "" );
					}catch(exception){
						console.log(exception.message);
					}
					this.length = 1;
					return this;
				}else{
					elem = document.querySelectorAll( selector );
					addElem( this, elem );
				}
			}else {
				switch( LGZZK.toRawType( selector ) ){
					case LGZZK: 
					case NodeList: {
						elem = selector;
						addElem( this, elem );
						break ;
					}
					case HTMLElement: {
						this[ 0 ] = selector;
						this.length = 1;
						return this;
						break ;
					}
					case Function: {
						if( document.readyState !== "complete" ){
							document.addEventListener( "DOMContentLoaded", complete( selector ) );
						}
					}
				}
			}
			return this;
		},
		first: function (){
			return this.eq( 0 );
		},
		last: function (){
			return this.eq( this.length - 1 );
		},
		eq: function ( i ){
			return new LGZZK.fn.init( this[ i ] );
		},
		attr: function ( name, value ){
			if( !name && !value ) return ;
			if( !value ){
				if( typeof key === "object" ){
					LGZZK.each( this, function ( i ){
						for( let i in key ){
							this.style[ i ] = key[ i ];
						}
					} );
				}
				if( typeof key === "string" ){
					return this[ 0 ].getAttribute( name );
				}
			}else{
				LGZZK.each( this, function (){
					this.setAttribute( name, value );
				} )
			}
		},
		css: function ( key,val ){
			if( !key && !val ) return ;
			if( !val ){
				if( typeof key === "object" ){
					LGZZK.each( this, function ( i ){
						for( let i in key ){
							this.style[ i ] = key[ i ];
						}
					} );
				}
				if( typeof key === "string" ){
					return this[ 0 ].style[ key ];
				}
			}else{
				LGZZK.each( this, function (){
					this.style[ key ] = val;
				});
			}
		},
		text: function ( value ){
			if( arguments.length == 0 ){
				let str = "";
				LGZZK.each( this, function (){
					str += this.innerText;
				});
				return str;
			}else{
				LGZZK.each( this, function (){
					this.innerText = value;
				});
			}
		},
		html: function ( value ){
			if( arguments.length == 0 ){
				let str = "";
				LGZZK.each( this, function (){
					str += this.innerHTML;
				});
				return str;
			}else{
				LGZZK.each( this, function (){
					this.innerHTML = value;
				});
			}
		},
		val: function ( value ){
			if( arguments.length == 0 ){
				return this[ 0 ].value;
			}else{
				this[ 0 ].value = value;
			}
		},
		each: function ( callback ){
			LGZZK.each( this, callback );
		},
		click: function( callback ){
			addEvent( "click", callback, this );
		},
		dblclick: function( callback ){
			addEvent( "dblclick", callback, this );
		},
		mouseenter: function ( callback ){
			addEvent( "mouseenter", callback, this );
		},
		mouseleave: function ( callback ){
			addEvent( "mouseleave", callback, this );
		},
		hover: function ( callback1, callback2 ){
			this.mouseenter( callback1 );
			this.mouseleave( callback2 );
		},
		focus: function ( callback ){
			addEvent( "focus", callback, this );
		},
		blur: function ( callback ){
			addEvent( "blur", callback, this );
		},
		addClass: function ( value ){
			var cls = value.split( " " );
			LGZZK.each( this, function (){
				for(let i of cls){
					this.classList.add( i );
				}
			} );
		},
		removeClass: function ( value ){
			var cls = value.split( " " );
			LGZZK.each( this, function (){
				for(let i of cls){
					this.classList.remove( i );
				}
			} );
		},
		append: function ( value ){
			var val = LGZZK( value );
			LGZZK.each( this, function (){
				for( let i = 0; i<val.length; i++ ){
					this.appendChild( val[ i ]);
				}
			} );
		},
		remove: function (){
			LGZZK.each( this, function (){
				this.parentNode.removeChild( this );
			} );
		},
		empty: function (){
			LGZZK.each( this, function (){
				this.innerHTML = "";
			} );
		}
	}
	
	function complete( callback ){
		document.removeEventListener( "DOMContentLoaded", complete );
		callback();
	}
	function addElem( obj, elem ){
		LGZZK.each( elem, function ( i ){
			obj[ i ] = this;
		} );
		obj.length = elem.length;
	}
	function addEvent( selector, callback, that ){
		LGZZK.each( that, function (){
			this.addEventListener( selector, callback );
		} )
	}
	
	LGZZK.each = function ( obj, callback ){
		if( LGZZK.toRawType( obj ) === LGZZK ) {
			for(let i = 0; i < obj.length; i++ ){
				callback.call( obj[ i ], i, obj[ i ] );
			}
		}else{
			for(let i in obj ){
				callback.call( obj[ i ], i, obj[ i ] );
			}
		}
	}
	LGZZK.isType = function ( obj, type ){
		return obj instanceof type;
	}
	LGZZK.toRawType = function ( obj ){
		var types = [ NodeList, HTMLElement, LGZZK, Function ];
		for( let i of types ){
			if(obj instanceof i) return i;
		}
	}
	LGZZK.ajax = function ( options ){
		var xhr,
		res,
		type = options.type.toLowerCase(),
		dataType = options.dataType.toLowerCase();
		
		if( window.XMLHttpRequest ){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
		xhr.onreadystatechange = function (){
			if( xhr.readyState == 4 ){
				if( xhr.status >= 200 && status < 300 || status == 304 ){
					if( dataType === "text" ){
						res = xhr.responseText;
					}else if( dataType === "xml" ){
						 res = XMLDocument.parse( xhr.responseXML );
					}else{
						res = JSON.parse( xhr.responseText );
					}
					options.success( res );
				}else{
					options.error();
				}
			}
		}
		xhr.open( type, options.url, true );
		if( type === "post" ){
			xhr.setRequestHeader( "Content-type","application/x-www-form-urlencoded" );
			xhr.send( options.data );
		}else{
			xhr.send();
		}
	}
	LGZZK.toHTTPS = function (){
		if(location.protocol=="http:"){
			location.protocol="https:";
		}
	}
	LGZZK.loadImg = function ( url ){
		let hide=document.createElement("div");
		for(var i=0;i<url.length;i++){
			let img=document.createElement("img");
			img.src=url[i].url;
			hide.appendChild(img);
		}
		document.body.appendChild(hide);
		// document.body.removeChild(hide);
	}
	LGZZK.random = function (a,b){
		return Math.floor(Math.random()*(b+1)+a);
	},
	
	LGZZK.prototype.init.prototype = LGZZK.prototype;
	window.Z = window.LGZZK = LGZZK;
	
})(this);