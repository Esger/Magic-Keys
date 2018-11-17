// JavaScript Document
$(function () {
	
	(function MagicKeyPad () {
		
		this.mainKeyPad = $('#mainkeys');
		
		this.mainKeys = function() {
			return $('#mainkeys .key');
		}
		
		this.aKey = $('.key');
		
		this.outputArea = $('#typed');
				
		this.prevKeyStroke = 'space';
		
		this.capsLock = false;
		
		this.numLock = false;
		
		this.keySetToShow = 0;
				
		this.cookieSaveInterval = 10;
		this.cookieSaveCounter = 0;
		
		this.nextKeySet = function(keySet) {
			return keySet++
		}
				
		this.highLightKey = function(key) {
			$('#'+key).addClass('highlight');
			this.capsLock = true
		}
		
		this.lowLightKey = function(key) {
			$('#'+key).removeClass('highlight');
			this.capsLock = false
		}
		
		this.drawKey = function(charn) {
			var character;
			switch (charn) {
				case 'space' : character = ' ';
				break;
				default		 : character = charn; 
					if (this.capsLock) {
						charn = charn.toUpperCase()
						capslock = false;
					}
					this.mainKeyPad.append('<div class="key" id="'+charn+'"><a href="#">'+charn+'</a></div>');
				break;
			}			
		}
		
		this.$clearFixHtml = '<div class="clearFix"></div>';
		
		this.defaultPrevKeys = function() {
			return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','space');
		}
		
		this.defaultNextKeys = function() {
			return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		}
		this.alphaKeys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		
		this.nonAlphaKeys = ['0','1','2','3','4','5','6','7','8','9','nul','punt','komma','return','space'];

		this.allNextKeys = [];
		
		this.emptyKeyBoard = function() {
			this.mainKeyPad.children().remove();
		}
		
		this.drawAllMagicKeys = function(keyOrder,keySet) {
			var firstKey = keySet * 9;
			var lastKey = firstKey + 8;
			var j;

			emptyKeyBoard();
			if (lastKey === 26){
				lastKey = 25;
			}
			for (j = firstKey; j <= lastKey; j++) {
				this.drawKey(keyOrder[j]);
			}
			if (keySet === 2){
				this.drawKey(keyOrder[0]);
			}
			this.mainKeyPad.append(this.clearFixHtml);
		}
		
		
		this.replaceMagicKeys = function(keyOrder,keySet) {
			var firstKey = keySet*9;
			var lastKey = (keySet+1)*9;
			var aKey;
			var replacementKeys = [];

			function markKeysToKeep() {
				for (var j = firstKey; j < lastKey; j++) {
					aKey = keyOrder[j]
					if ($('#mainkeys #'+ aKey).length) {
						$('#mainkeys #'+ aKey).addClass('keep');
					}
					else {
						replacementKeys.push(keyOrder[j]);
					}
				}
			}

			function replaceOtherKeys() {
				var keyToReplace, replacingKey;
				for (var j in replacementKeys) {
					keyToReplace = this.mainKeys().not('.keep').get(0);
					$(keyToReplace).wrap('<div class="temp" />');
					raplacingKey = '<div class="key keep" id="'+replacementKeys[j]+'"><a href="#">'+replacementKeys[j]+'</a></div>';
					$(keyToReplace).replaceWith(raplacingKey).unwrap('<div class="temp" />');
				}
			}
			
			markKeysToKeep();
			replaceOtherKeys();
			
			this.mainKeys().removeClass('keep');
			if (keySet === 2){
				drawKey(keyOrder[0]);
			}
		}
		
		this.setAllDefaultKeys = function() {
			var i;
			for (i = 0; i < 27; i++) {
				this.allNextKeys[i] = this.defaultNextKeys();
			}
			console.log('default keys set')
		}
		
		this.readKeyAIfromCookie = function() {
			var i;
			this.allNextKeys = $.cookie('MagicKeys').split('|')
			for (i = 0; i < 27; i++) {
				this.allNextKeys[i] = this.allNextKeys[i].split(',');
			}
			console.log('cookie read')
		}
		
		this.cookieIsSet = function() {
			return !($.cookie('MagicKeys') === null)
		}
		
		this.saveKeysAItoCookie = function() {
			var i, toCookie = '', keyRow = '';
			for (i = 0; i < 27; i++) {
				keyRow = this.allNextKeys[i].join() + '|';
				toCookie = toCookie + keyRow;
			}
			toCookie = toCookie.slice(0, -1);
			$.cookie('MagicKeys', toCookie, { expires: 365 });
			console.log('cookie saved')
		}
		
		this.initKeys = function() {
			var ff = this.cookieIsSet()
			if (ff) {
				this.readKeyAIfromCookie();
			} else {
				this.setAllDefaultKeys();
			}
		}
		
		this.init = function() {
			this.initKeys();
			this.drawAllMagicKeys(defaultNextKeys(),0);
		}
		
		this.outputKey = function(char) {
			if (this.capsLock){
				char = char.toUpperCase();
			}
			this.outputArea.append(char);
		}
		
		this.deleteLastChar = function() {
			this.outputArea.html(this.outputArea.html().slice(0,-1))
		}
		
		this.drawKeyBoardNum = function(lastChar, keySet) {
			if (this.numLock) {
				emptyKeyBoard();
				for (var j=1;j<10;j++) {
					drawKey(j+'');
				}
				$('#space').wrap('<div class="temp" />').replaceWith('<div class="key" id="nul"><a href="#">0</a></div>').unwrap('<div class="temp" />');
			}
		}

		this.toggleNumlock = function(){
			var $numlockkey = $('#num a');
			this.numLock = !(this.numLock);
			if (this.numLock) {
				$numlockkey.text('abc');
			} else {
				$('#botkeys div:first').wrap('<div class="temp" />').replaceWith('<div class="key int" id="space"><a href="#"> </a></div>').unwrap('<div class="temp" />');
				$numlockkey.text('123');
			}
		}
	
		this.key2Screen = function(k, mk){
			switch (k) {
				case 'space' :
					this.outputKey(' ');
				break;
				case 'punt' :
					this.outputKey('.');
				break;
				case 'komma' :
					this.outputKey(',');
				break;
				case 'nul':
					this.outputKey('0');
				break;
				case 'return':
					this.outputKey('\n');
				break;
				case 'backsp':
					this.deleteLastChar();
				break;
				default :
					if (!mk) {
						this.outputKey(k)
					}
				break;
			}
		}
		
		// Draw the new set of non moderator keys
		this.drawKeyboard = function(k){
			switch (k) {
				case 'backsp':
					replaceMagicKeys(allNextKeys[this.defaultPrevKeys().indexOf(this.prevKeyStroke)],this.keySetToShow);
				break;
				case 'shift':
					this.highLightKey(k);
				break;
				case 'num':
					toggleNumlock();
					if (!numLock) {
						drawAllMagicKeys(allNextKeys[this.defaultPrevKeys().indexOf(this.prevKeyStroke)],this.keySetToShow);
					} else {
						drawKeyBoardNum();
					}
				break;
				case 'nextset':
					if (!numLock) {
						this.keySetToShow = (this.keySetToShow+1) % 3;
						drawAllMagicKeys(allNextKeys[this.defaultPrevKeys().indexOf(this.prevKeyStroke)],this.keySetToShow);
					}
				break;
				default :
					this.keySetToShow = 0;
					if (this.numLock) {
						drawKeyBoardNum();
					} else {
						replaceMagicKeys(allNextKeys[this.defaultPrevKeys().indexOf(k)],this.keySetToShow)
					}
					lowLightKey('shift');
				break;
			}
		}
		
		// Remember this key typed after the previous key
		this.learn = function(thisKey, mkey) {
			var i, j, temp;
			
			i = this.defaultPrevKeys().indexOf(this.prevKeyStroke);
			j = allNextKeys[i].indexOf(thisKey);
			
			if (j > 0) {
				temp = allNextKeys[i][j-1];
				allNextKeys[i][j-1] = allNextKeys[i][j];
				allNextKeys[i][j] = temp;
				//console.log('learned something')
			}
		}
		
		// Remember the last keystroke in order to learn possible next keys
		this.rememberKey = function(k) {
			var lastCharOnScreen;
			if (this.nonAlphaKeys.indexOf(k) >= 0) {
				return 'space' 
			} else {
				switch (k) {
					case 'shift':
						return this.prevKeyStroke
					break;
					case 'num':
						return this.prevKeyStroke
					break;
					case 'backsp':
						lastCharOnScreen = $('#typed').val().substr(-1);
						if (this.alphaKeys.indexOf(lastCharOnScreen) >= 0) {
							return lastCharOnScreen.toLowerCase()
						} else {
							return 'space'
						}
					break;
					default :
						if (k != 'nextset') {
							return k
						} else {
							return this.prevKeyStroke
						}
					break;
				}
			}
		}
		
		// Main function
		this.aKey.live('click', function() {
			var key = $(this).attr('id'),
			modKey = $(this).hasClass('mod');
			intKey = $(this).hasClass('int');
			
			if (!intKey && !modKey && !numLock) {
				learn(key.toLowerCase(), modKey);
			}
			
			key2Screen(key, modKey);
			
			if (key === 'backsp'){
				prevKeyStroke = rememberKey(key, modKey);
			}
			
			drawKeyboard(key.toLowerCase());
			
			prevKeyStroke = rememberKey(key.toLowerCase());
			
			if (cookieSaveCounter === cookieSaveInterval) {
				saveKeysAItoCookie();
			}
			cookieSaveCounter = (cookieSaveCounter+1) % (cookieSaveInterval +1);

		});
		
		
		
		// Eat a lot of text to learn from
		this.eatBaseText = function() {
			var preText;
			
			outputArea.load('nl_tekst.php', function() {
				preText = outputArea.html();
				for (var i in preText) {
					if (preText[i] === ' ') {
						k = 'space'
					} else {
						k = preText[i].toLowerCase()
					}
					console.log(k);
					learn(rememberKey(k),false);
					prevKeyStroke = rememberKey(k);
				}
				outputArea.html(' ');
				saveKeysAItoCookie();
			});

		}
		
		this.init();
		
		this.eatBaseText();
		
	}());
		
});

// capslock kan niet uit; meer in het geheugen werken i.p.v. op het scherm; cursor zodat je ook middden in de tekst kunt wijzigen.