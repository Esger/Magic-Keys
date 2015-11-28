// JavaScript Document

$(function () {
		
	(function () {
			
		// The Screen interface
		var screenInterface = {
			$outputArea : $('#typed'),
			$langFlags : $('.flags a'),
			$title : $('h2 span.text'),
			$try : $('#typed'),
			$good : $('p.good span.text'),
			$bad : $('p.bad span.text'),
			$total : $('p.total span.text'),
			lastChar : '',
			placeholder : true,
			deleteLastChar : function () {
				if (this.$outputArea.html().length > 0) {
					this.$outputArea.html(this.$outputArea.html().slice(0,-1));
					this.lastChar = this.$outputArea.html().substr(-1,1);
					keyBoardModel.key = this.lastChar;
				} else {
					keyBoardModel.key = 'space';
				}
				keyBoardModel.alphaKey = (keyBoardModel.alphaKeys.indexOf(this.lastChar) >= 0);
			},
			outputLength : function () {
				return this.$outputArea.html().length;
			},
			clear : function () {
				this.$outputArea.html('');
				this.placeholder = false;
			},
			lang : 'nl',
			i18n_dict : {
				en : {
					title : 'System effectivity',
					good : 'Correct predictions',
					bad : 'Extra clicks needed',
					total: 'Total clicks',
					trythis: 'Try the automagic keys below (on a touch screen)'
				},
				nl : {
					title : 'Systeem effectiviteit',
					good : 'Goede voorspellingen',
					bad : 'Extra kliks nodig',
					total: 'Totaal tekens',
					trythis: 'Probeer de automagische toetsen hieronder eens! (op een touchscreen)'
				}
			},
			char2screen : function (kar) {
				if (this.placeholder) {
					this.clear();
				}
				switch (kar) {
					case 'shift'	: break;
					case 'num'		: break;
					case 'nextset'	: break;
					case 'nextpun'	: break;
					case 'interp'	: break;
					case 'interp2'	: break;
					case 'nul' : 
						this.$outputArea.append('0');
						break;
					case 'een' : 
						this.$outputArea.append('1');
						break;
					case 'twee' : 
						this.$outputArea.append('2');
						break;
					case 'drie' : 
						this.$outputArea.append('3');
						break;
					case 'vier' : 
						this.$outputArea.append('4');
						break;
					case 'vijf' : 
						this.$outputArea.append('5');
						break;
					case 'zes' : 
						this.$outputArea.append('6');
						break;
					case 'zeven' : 
						this.$outputArea.append('7');
						break;
					case 'acht' : 
						this.$outputArea.append('8');
						break;
					case 'negen' : 
						this.$outputArea.append('9');
						break;
					case 'punt':
						this.$outputArea.append('.');
						break;
					case 'punt2':
						this.$outputArea.append('.');
						break;
					case 'komma':
						this.$outputArea.append(',');
						break;
					case 'komma2':
						this.$outputArea.append(',');
						break;
					case 'vraag':
						this.$outputArea.append('?');
						break;
					case 'uitroep':
						this.$outputArea.append('!');
						break;
					case 'at':
						this.$outputArea.append('@');
						break;
					case 'dpunt':
						this.$outputArea.append(':');
						break;
					case 'puntk':
						this.$outputArea.append(';');
						break;
					case 'dquot':
						this.$outputArea.append('"');
						break;
					case 'slash':
						this.$outputArea.append('/');
						break;
					case 'pipe':
						this.$outputArea.append("|");
						break;
					case 'amp':
						this.$outputArea.append("&amp;");
						break;
					case 'hash':
						this.$outputArea.append('#');
						break;
					case 'curr':
						this.$outputArea.append('$');
						break;
					case 'perc':
						this.$outputArea.append('%');
						break;
					case 'haako':
						this.$outputArea.append('(');
						break;
					case 'haaks':
						this.$outputArea.append(')');
						break;
					case 'accoo':
						this.$outputArea.append('{');
						break;
					case 'accos':
						this.$outputArea.append('}');
						break;
					case 'bracko':
						this.$outputArea.append('[');
						break;
					case 'bracks':
						this.$outputArea.append(']');
						break;
					case 'klein':
						this.$outputArea.append('&lt;');
						break;
					case 'groot':
						this.$outputArea.append('&gt;');
						break;
					case 'plus':
						this.$outputArea.append('+');
						break;
					case 'min':
						this.$outputArea.append('-');
						break;
					case 'ster':
						this.$outputArea.append('*');
						break;
					case 'is':
						this.$outputArea.append('=');
						break;
					case 'space' : 
						this.$outputArea.append(' ');
						break;
					case 'backsp':
						this.deleteLastChar();
						break;
					case 'return':
						this.$outputArea.append('<br/>');
						break;
					default :
						if (keyBoardInterface.capsLock){
							kar = kar.toUpperCase();
						}
						this.$outputArea.append(kar);
						keyBoardInterface.resetCapsLock();
					break;
				}
			},
			langSwitch : function () {
				this.$langFlags.toggleClass('en');
				if (this.$langFlags.hasClass('en')) {
					this.$title.text(this.i18n_dict.en.title);
					this.$good.text(this.i18n_dict.en.good);
					this.$bad.text(this.i18n_dict.en.bad);
					this.$total.text(this.i18n_dict.en.total);
					this.$try.text(this.i18n_dict.en.trythis);
				} else {
					this.$title.text(this.i18n_dict.nl.title);
					this.$good.text(this.i18n_dict.nl.good);
					this.$bad.text(this.i18n_dict.nl.bad);
					this.$total.text(this.i18n_dict.nl.total);
					this.$try.text(this.i18n_dict.nl.trythis);
				}
			}
		};
		
		// The keyboard Interface
		var keyBoardInterface = {
			mainKeyPad : $('#mainkeys'), // The actual keyboard
			numLock : false,
			capsLock : false,
			interpLock : false,
			interp2Lock : false,
			$capslockkey : $('#shift'),
			$numlockkey : $('#num a'),
			$interplockkey : $('#interp a'),
			$interp2lockkey : $('#interp2 a'),
			$pressedKey : $('#keyboard .key'),
			charOfThisKey : function (k) {
				return $(k).attr('id');
			},
			touchOrClick : 'click',
			initTouchDevice : function () {
				if ('ontouchstart' in document.documentElement) {
					this.touchOrClick = 'touchstart'; // This responds faster on touchdevices
				}
			},
			switchKeys : function (kind) {
				$('#mainblocks>div').hide();
				switch (kind) {
					case 'num' :
						if (this.numLock) {
							this.$numlockkey.text('123');
							$('#mainkeys, #botkeys').show();
						} else {
							this.$numlockkey.text('abc');
							$('#numkeys, #numbotkeys').show();
							this.$interplockkey.text('...');
							this.$interp2lockkey.text('()');
							this.interpLock = false;
							this.interp2Lock = false;
						}
						this.numLock = !(this.numLock);
					break;
					case 'interp' :
						if (this.interpLock) {
							this.$interplockkey.text('...');
							$('#mainkeys, #botkeys').show();
						} else {
							this.$interplockkey.text('abc');
							$('#interpkeys, #interpbotkeys').show();
							this.$numlockkey.text('123');
							this.$interp2lockkey.text('()');
							this.numLock = false;
							this.interp2Lock = false;
						}
						this.interpLock = !(this.interpLock);
					break;
					case 'interp2' :
						if (this.interp2Lock) {
							this.$interp2lockkey.text('()');
							$('#mainkeys, #botkeys').show();
						} else {
							this.$interp2lockkey.text('abc');
							$('#interp2keys, #interp2botkeys').show();
							this.$numlockkey.text('123');
							this.$interplockkey.text('...');
							this.interpLock = false;
							this.numLock = false;
						}
						this.interp2Lock = !(this.interp2Lock);
					break;
					default :
					break;
				}
			},
			setCapsLock : function () {
				this.$capslockkey.addClass('highlight');
				this.capsLock = true;
			},
			resetCapsLock : function () {
				this.$capslockkey.removeClass('highlight');
				this.capsLock = false;
			},
			pressCapsLock : function () {
				if (this.capsLock) { 
					this.resetCapsLock();
				} else { 
					this.setCapsLock();
				}
			},
			drawKey : function (key) {
				this.mainKeyPad.append('<div class="key alpha" id="'+key+'"><a href="#">'+key+'</a></div>');
			},
			drawMagicKeySet : function(keySet) {
				this.mainKeyPad.children().remove();
				for (var j in keySet) {
					this.drawKey(keySet[j]);
				}				
			}
		};
		
		// The keyboard Model
		var keyBoardModel = {
			initialising : true,
			typedString : '',
			key : 'space', // The current or last keystroke
			alphaKey : false,
			cookieSaveInterval : 10,
			cookieSaveCounter : 0,
			// for showing efficiency
			counterGood : 1,
			counterBad : 0,
			ratio : 1,
			nextSetClicked : false,
			$goodCount : $('span.good'),
			$badCount : $('span.bad'),
			$ratio : $('span.ratio'),
			$total : $('span.total'),
			defaultPrevKeys : function () {
				return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','space');
			},
			defaultNextKeys : function () {
				return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
			},
			alphaKeys : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			nonAlphaKeys : ['1','2','3','4','5','6','7','8','9','nul','punt','komma','return','space','shift','num'],
			numKeys : ['0','1','2','3','4','5','6','7','8','9'],
			allNextKeys : [], // All next keys for all keys
			nextKeys : [], // The keyset to draw next
			currentKeys : [], // Keyset subset of 9 keys of 26 0, 1 or 2 charnr 26 can be copy of charnr 0
			prevKey : 'space',
			prevPrevKey : 'space',
			prevCombo : 'spacespace',
			outputChar : ' ', // The character to be output
			keySetToShow : 0,

			// Eliminate duplicate elements from array
			eliminateDuplicates : function (arr) {
				var i,
					len=arr.length,
					out=[],
					obj={};
				
				for (i=0;i<len;i++) {
					obj[arr[i]]=0;
				}
				for (i in obj) {
					out.push(i);
				}
				return out;
			},

			nextKeySet : function () {
				this.keySetToShow = (this.keySetToShow + 1) % 3;
			},
			
			// Return true if cookie is set.
			cookieIsSet : function (cookieNumber) {
				var cookieName = 'MagicKeys04_'+cookieNumber;
				var noSuchCookie = ($.cookie(cookieName) === null);
				return !noSuchCookie;
			},
			
			readKeyAIfromCookie : function () {
				var i, allCookies = '', cookieNumber = 0, elements = [], comboElements = [], singleElements = [], key = '';
				while (this.cookieIsSet(cookieNumber)) { // merge all cookies into one string
					allCookies = allCookies + $.cookie('MagicKeys04_'+cookieNumber);
					cookieNumber += 1;
				}
				
				elements = allCookies.split('0'); // put combos and singles in separate strings
				comboElements = elements[1].split('-'); // put each combo in a string
				singleElements = elements[2].split('-'); // put eacht single in a string
				
				for (var el in singleElements) {
					key = singleElements[el].slice(0,1);
					singleElements[el] = singleElements[el].slice(1);
					key = key.split('_').join('space'); // this does search and replace
					this.allNextKeys[key] = singleElements[el].slice().split('');
				}
				
				for (el in comboElements) {
					key = comboElements[el].slice(0,2);
					comboElements[el] = comboElements[el].slice(2);
					key = key.split('_').join('space'); // this does search and replace
					this.allNextKeys[key] = comboElements[el].slice().split('');
				}
				
			},
			
			saveKeyAItoCookie : function () {
				var toCookie = [], keyRow = '', comboString = '0', singleString = '0', keyString = '', lastCookieNumber = 0; // '0' = separator
				toCookie[lastCookieNumber] = '';
				for (var elements in this.allNextKeys) {
					keyString = elements.split('space').join('_'); // this does search and replace
					if (keyString.length === 1) {
						singleString = singleString + '-' + keyString + this.allNextKeys[elements].join('').substring(0,18); // '-' = separator
					} else {
						comboString = comboString + '-' + keyString + this.allNextKeys[elements].join('').substring(0,18); // '-' = separator
					}
				}
				toCookie[lastCookieNumber] = comboString + singleString; // Combine everything in 1 string
				while (toCookie[lastCookieNumber].length > 4000) { // Split the string in chunks of 4000 bytes max cookie sie
					toCookie[lastCookieNumber+1] = '';
					toCookie[lastCookieNumber+1] = toCookie[lastCookieNumber].slice(4000);
					toCookie[lastCookieNumber] = toCookie[lastCookieNumber].slice(0,4000);
					lastCookieNumber+=1;
				}
				for (var cookieNumber in toCookie) { // save the numbered cookies
					$.cookie('MagicKeys04_'+cookieNumber, toCookie[cookieNumber], { expires: 365 });
				}
			},
			
			setAllDefaultKeys : function () {
				var i;
				for (i = 0; i < 27; i++) {
					this.allNextKeys[i] = this.defaultNextKeys();
				}
				//console.log('default keys set')
			},
			
			// Update statistics
			updateStats : function () {
				if (this.key === 'nextset') {
					this.counterBad+=1;
				} else {
					if (this.alphaKey) {
						this.counterGood+=1;
					}
				}
				this.$badCount.html(this.counterBad);
				this.$goodCount.html(this.counterGood);
				this.ratio = (this.counterGood/(this.counterGood + this.counterBad)).toFixed(2);
				this.$ratio.html(100*this.ratio + ' %');
				this.$total.html(this.counterBad + this.counterGood);
			},
			
			// Read language textfile for base knowledge
			setLanguage : function () {
				this.setAllDefaultKeys();
				if ($('.flags a').hasClass('en')) {
					this.eatBaseText('en');
				} else {
					this.eatBaseText('nl');
				}
			},
			
			// Determine the classes and id of pressed the key
			determineKey : function (pressedKey) {
				this.key = $(pressedKey).attr('id');
				this.alphaKey = ($(pressedKey).hasClass('alpha') || (this.key === 'space'));
			},
			
			// Save knowledge in cookie
			saveKeyAI : function () {
				if (this.cookieSaveCounter === 0) {
					this.saveKeyAItoCookie();
				}
				this.cookieSaveCounter = (this.cookieSaveCounter+1) % (this.cookieSaveInterval);
			},
			
			// Shift the current to the previous keystroke
			rememberKey : function () {
				if (this.alphaKey) {
					this.prevPrevKey = this.prevKey;
					this.prevKey = this.key;
				}
				this.prevCombo = this.prevPrevKey + this.prevKey;
			},
			
			// Eat a lot of text to learn from
			eatBaseText : function (lang) {
				var $temp = $('#toAnalyse');
				var preText, langFile = '';
				if (lang === 'en') {
					langFile = 'en_tekst.php';
				} else {
					langFile = 'nl_tekst.php';
				}
				$temp.load(langFile, function () {
					preText = $temp.text();
					preText = preText.replace(/[^a-zA-Z /s]+/g,'');
					keyBoardModel.alphaKey = true;
					//console.log('text loaded');
					for (var i in preText) {
						if (preText[i] === ' ') {
							keyBoardModel.key = 'space';
						} else {
							keyBoardModel.key = preText[i].toLowerCase();
							keyBoardModel.record();
						}
						//console.log(k);
						keyBoardModel.rememberKey();
					}
					keyBoardModel.initialising = false;
				});
			},
			
			// Add keystroke in regard to previous keystrokes to knowledge
			record : function () {
				var comboExists, keyExists, tempCh, j;
								
				if (this.alphaKey && (this.key !== 'space')) {
					this.prevCombo = this.prevPrevKey + this.prevKey;
					comboExists = $.isArray(this.allNextKeys[this.prevCombo]); // True if prevCombo exists
					if (comboExists) { // Shift this key one position to the left
						j = this.allNextKeys[this.prevCombo].indexOf(this.key);
						if (j >= 0) { // this.key exists
							if (j > 0) { // this.key is not the first element, so it can be shifted left
								tempCh = this.allNextKeys[this.prevCombo].splice(j,1);
								tempCh = this.allNextKeys[this.prevCombo].splice(j-1,0,tempCh[0]);
							}
						} else { // add this.key to keyCombo array
							this.allNextKeys[this.prevCombo].push(this.key);
						}
					} else { // Add new keyCombo array with this.key as element
						this.allNextKeys[this.prevCombo] = [];
						this.allNextKeys[this.prevCombo].push(this.key);
					}
					keyExists = $.isArray(this.allNextKeys[this.prevKey]);
					if (keyExists) {
						j = this.allNextKeys[this.prevKey].indexOf(this.key);
						if (j >= 0) { // this.key exists
							if (j > 0) { // this.key is not the first element, so it can be shifted left
								tempCh = this.allNextKeys[this.prevKey].splice(j,1);
								tempCh = this.allNextKeys[this.prevKey].splice(j-1,0,tempCh[0]);
							}
						} else { // add this.key to keyCombo array
							this.allNextKeys[this.prevKey].push(this.key);
						}
					} else { // Add new keyCombo array with this.key as element
						this.allNextKeys[this.prevKey] = [];
							this.allNextKeys[this.prevKey].push(this.key);
					}
				}
			},
			
			// Draw the complete next subset of 9 keys of all possible next keys.
			drawNextSet : function () {
				this.nextKeySet();
				this.currentKeys = this.nextKeys.slice(this.keySetToShow*9, (this.keySetToShow+1)*9);
				
				keyBoardInterface.drawMagicKeySet(this.currentKeys);
			
				if (this.keySetToShow === 2){	// Fill last empty place with first char from this full set
					keyBoardInterface.drawKey(this.nextKeys[0]);
				}
			},
			
			// Replace the current keys with the new set while keeping as many keys in place as possible.
			replaceMagicKeys : function () {
				var newKeys = this.nextKeys.slice(0, 9);
				var mergedKeys = [];
				var jNew;
				for (var j in this.currentKeys) { // Create array with existing keys, mark open spots with #
					jNew = newKeys.indexOf(this.currentKeys[j]);
					if (jNew >= 0)  {
						newKeys.splice(jNew, 1);
						mergedKeys[j] = this.currentKeys[j];
					} else {
						mergedKeys[j] = '#';
					}
				}
				for (var jj in newKeys) { // Fill in open spots marked with #
					mergedKeys[mergedKeys.indexOf('#')] = newKeys[jj];
				}
				keyBoardInterface.drawMagicKeySet(mergedKeys);
				this.currentKeys = mergedKeys.slice(0,9);
				this.keySetToShow = 0;
			},
			
			// Draw the new set of non moderator keys
			drawKeyboard : function () {
				var complete = function () {
					return (keyBoardModel.nextKeys.length >= 26);
				};
				var getComboSuccessors = function () {
					if ( $.isArray(keyBoardModel.allNextKeys[keyBoardModel.prevCombo]) ) { // Check if keyCombo exists
						keyBoardModel.nextKeys = keyBoardModel.allNextKeys[keyBoardModel.prevCombo];
					}
				};
				var addPrevKeySuccessors = function () {
					if ( $.isArray(keyBoardModel.allNextKeys[keyBoardModel.prevKey]) ) { // Check if prevkey exists
						keyBoardModel.nextKeys = keyBoardModel.nextKeys.concat(keyBoardModel.allNextKeys[keyBoardModel.prevKey]);
					}							
				};
				var addSpaceSpaceSuccessors = function () {
					keyBoardModel.nextKeys = keyBoardModel.nextKeys.concat(keyBoardModel.allNextKeys.spacespace);
				};
				switch (this.key) {
					case 'shift':
						keyBoardInterface.pressCapsLock();
					break;
					case 'num':
						keyBoardInterface.switchKeys('num');
					break;
					case 'interp':
						keyBoardInterface.switchKeys('interp');
					break;
					case 'interp2':
						keyBoardInterface.switchKeys('interp2');
					break;
					case 'return' :
					break;
					case 'nextset':
						this.drawNextSet();
					break;
					default :
						keyBoardModel.nextKeys = [];
						getComboSuccessors();
						if (!complete()) {
							addPrevKeySuccessors();
						}
						keyBoardModel.nextKeys = keyBoardModel.eliminateDuplicates(keyBoardModel.nextKeys);
						if (!complete()) {  // spacespace
							addSpaceSpaceSuccessors();
						}
						keyBoardModel.nextKeys = keyBoardModel.eliminateDuplicates(keyBoardModel.nextKeys);
						keyBoardModel.replaceMagicKeys();
					break;
				}
				if (keyBoardModel.nextKeys.length < 26) {
					alert ('error in program logic');
					console.log(keyBoardModel.nextKeys);
				}
			},
			
			// Get knowledge from cookie if set, else generate from textfile
			initKeyAI : function () {
				if (this.cookieIsSet(0)) {
					this.readKeyAIfromCookie();
				} else {
					this.eatBaseText('nl');
				}
				//this.eatBaseText('nl'); // Tijdelijk totdat cookie werkt.
			},
			
			// Initialise
			init : function () {
				keyBoardInterface.initTouchDevice();
				this.allNextKeys[this.prevCombo] = this.defaultNextKeys().slice();
				this.currentKeys = this.defaultNextKeys().slice(0,9);
				this.nextKeys = this.defaultNextKeys().slice();
				this.initKeyAI();
				this.key = 'space';
				this.prevKey = 'space';
				this.prevPrevKey = 'space';
				this.prevCombo = 'space';
				this.allNextKeys.spacespace = this.defaultNextKeys().slice();
				setTimeout('keyBoardModel.drawKeyboard();', 1500); // draw the new keyboard
				setTimeout('keyBoardModel.saveKeyAItoCookie();', 3000);
			}
		};
		
		
		keyBoardModel.init(); // Initialise the KeyBoardModel
		
		// Main listener
		$('#keyboard').on(keyBoardInterface.touchOrClick, 'a', function () {
																		
			keyBoardModel.determineKey($(this).parent()); // Determine the class and id of the containing div
			
			keyBoardModel.record(); // learn from this key in relation to the previous key
			
			keyBoardModel.updateStats(); // update the stats on screen
			
			screenInterface.char2screen(keyBoardModel.key); // put the keystroke to the screen
			
			keyBoardModel.rememberKey(); // shift this key to the previous key
			
			keyBoardModel.drawKeyboard(); // draw the new keyboard
			
			keyBoardModel.saveKeyAI(); // save knowledge
			
			return false;
		});
		
		// Listener for language switch
		$('.flags a').on(keyBoardInterface.touchOrClick, function () {
			screenInterface.langSwitch();
			keyBoardModel.setLanguage();
		});
				
	}());
		
});

/* 
- cursor zodat je ook middden in de tekst kunt wijzigen. 
- inputArea naar beneden scrollen als het vol is. 
*/