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
					keyBoardModel.key = '_';
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
					title : 'Effectivity',
					good : 'Correct predictions',
					bad : 'Extra clicks needed',
					total: 'Total clicks',
					trythis: 'Try the automagic keys below (on a touch screen)'
				},
				nl : {
					title : 'Effectiviteit',
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
					case '_' : 
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
			$capslockkey : $('#shift'),
			$numlockkey : $('#num a'),
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
				if (kind === 'num') {
					if (this.numLock) {
						this.$numlockkey.text('123');
						$('#mainkeys').show();
					} else {
						this.$numlockkey.text('abc');
						$('#numkeys').show();
					}
					this.numLock = !(this.numLock);
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
				var keyId = key,
				keyClass = 'alpha',
				keyTitle = key;
				switch (key) {
					case '.' :
						keyId = 'punt';
						keyClass = 'int';
					break;
					case '_' :
						keyId = 'space';
						key = ' ';
					break;
					case 'num' :
						key = '123';
						keyId = 'num';
						keyClass = 'mod';
						keyTitle = 'numerieke toetsen wissel';
					break;
					case '&rarr;' :
						keyId = 'nextset';
						keyClass = 'mod';
					break;
					default :
					break;
				}
				this.mainKeyPad.append('<div class="key '+keyClass+'" id="'+keyId+'" title="'+keyTitle+'"><a href="#">'+key+'</a></div>');
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
			versionNr : '052', // for naming the cookie
			typedString : '',
			key : '_', // The current or last keystroke
			alphaKey : false,
			keySetSize : 13,
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
				return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','_');
			},
			defaultNextKeys : function () { // naar frequentie van voorkomen in een gemiddeld stuk tekst.
				return ['e','n','a','t','i','r','o','d','s','l','g','v','h','k','m','u','b','p','w','j','z','c','f','x','y','q'];
			},
			alphaKeys : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			nonAlphaKeys : ['1','2','3','4','5','6','7','8','9','nul','punt','komma','return','_','shift','num'],
			numKeys : ['0','1','2','3','4','5','6','7','8','9'],
			allNextKeys : [], // All next keys for all keys
			nextKeySet : [], // The keyset to draw next
			currKeySet : [], // Keyset subset of 9 keys of 26 0, 1 or 2 charnr 26 can be copy of charnr 0
			prevKeySet : [], // The keyset prior to the current keyset, used for placement of next keyset
			prevKeyStrokeArray : ['_'], // Array with the last keys typed
			maxPrevKeyArrayLength : 2,
						
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

			advanceKeySet : function () {
				this.keySetToShow = (this.keySetToShow + 1) % 2;
			},
			
			// Return true if cookie is set.
			cookieIsSet : function (cookieNumber) {
				var cookieName = 'magickeys'+keyBoardModel.versionNr+cookieNumber;
				var noSuchCookie = ($.cookie(cookieName) === null);
				return !noSuchCookie;
			},
			
			readKeyAIfromCookie : function () {
				var i, allCookies = '', cookieNumber = 0, allElements = [], sortedElements = [], key = '', elementLength, elLength, el;
				
				// merge all cookies into one string
				while (this.cookieIsSet(cookieNumber)) { 
					allCookies = allCookies + $.cookie('magickeys'+keyBoardModel.versionNr+cookieNumber);
					cookieNumber += 1;
				}
				allCookies = allCookies.split('2').join('_');
				
				// put arrays for different stringlengths in different arrays
				allElements = allCookies.split('0');
				for (elementLength in allElements) {
					elLength = parseInt(elementLength, 10) + 1;
					sortedElements[elementLength] = allElements[elementLength].split('1');
					for (el in sortedElements[elementLength]) {
						key = sortedElements[elementLength][el].substring(0,elLength);
						sortedElements[elementLength][el] = sortedElements[elementLength][el].substring(elLength);
						this.allNextKeys[key] = sortedElements[elementLength][el].slice().split('');
					}
				}
				this.allNextKeys._ = this.allNextKeys._.concat(this.defaultNextKeys());
				this.allNextKeys._ = keyBoardModel.eliminateDuplicates(this.allNextKeys._);
			},
			
			saveKeyAItoCookie : function () {
				var toCookie = [], elements, elementLength, elLength, sortedNextKeys = [], elementStrings = [], lastCookieNumber = 0;
				
				// sort the arrays by length of indexelement
				for (elements in keyBoardModel.allNextKeys) {
					elementLength = elements.length;
					if (!$.isArray(sortedNextKeys[elementLength])) {
						sortedNextKeys[elementLength] = [];
					}
					sortedNextKeys[elementLength][elements] = keyBoardModel.allNextKeys[elements];
				}
				
				// convert arrays with same indexlength to one long string with - separator
				for (elementLength in sortedNextKeys) {
					elementStrings[elementLength] = '';
					for (elements in sortedNextKeys[elementLength]) {
						elementStrings[elementLength] += (elements + sortedNextKeys[elementLength][elements].join('').substring(0,keyBoardModel.keySetSize) + '1');
					}
					elementStrings[elementLength] = elementStrings[elementLength].slice(0,-1);
					elementStrings[elementLength] += '0';
				}
				elementStrings[elementLength] = elementStrings[elementLength].slice(0,-1);
				
				// Combine everything in 1 string
				toCookie[lastCookieNumber] = elementStrings.join('');
				toCookie[lastCookieNumber] = toCookie[lastCookieNumber].split('_').join('2'); // replace underscores (spaces) with 2's
				while (toCookie[lastCookieNumber].length > 3500) { // Split the string in chunks of 4000 bytes max cookie sie
					toCookie[lastCookieNumber+1] = '';
					toCookie[lastCookieNumber+1] = toCookie[lastCookieNumber].slice(3500);
					toCookie[lastCookieNumber] = toCookie[lastCookieNumber].slice(0,3500);
					lastCookieNumber+=1;
				}
				for (var cookieNumber in toCookie) { // save the numbered cookies
					$.cookie('magickeys'+keyBoardModel.versionNr+cookieNumber, toCookie[cookieNumber], { expires: 365 });
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
				if (this.key === 'space') {
					this.key = '_';
				}
				this.alphaKey = ($(pressedKey).hasClass('alpha') || (this.key === '_'));
				if (!$(pressedKey).hasClass('mod')) {
					keyBoardModel.keySetToShow = 0;
				}
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
					this.prevKeyStrokeArray.push(this.key);
					if (this.prevKeyStrokeArray.length > this.maxPrevKeyArrayLength) {
						this.prevKeyStrokeArray.shift();
					}
				}
			},
			
			// Shift the current to the previous keystroke
			rememberKeySet : function () {
				if (this.alphaKey) {
					this.prevKeySet = this.currKeySet.slice();
					this.currKeySet = this.nextKeySet.slice();
				}
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
							keyBoardModel.key = '_';
						} else {
							keyBoardModel.key = preText[i].toLowerCase();
							keyBoardModel.record();
						}
						//console.log(k);
						keyBoardModel.rememberKey();
					}
				});
				keyBoardModel.prevKeyStrokeArray = ['_'];
			},
			
			// Add keystroke in regard to previous keystrokes to knowledge
			record : function () {
				
				if (keyBoardModel.alphaKey  && (keyBoardModel.key !== '_')) {
					var strength;
					
					var shiftKey = function (prevKeyString, strength) {
						var tempCh = keyBoardModel.allNextKeys[prevKeyString].splice(j,1);
						tempCh = keyBoardModel.allNextKeys[prevKeyString].splice(j-1-strength,0,tempCh[0]);
					};
					
					var addKey = function (prevKeyString) {
						keyBoardModel.allNextKeys[prevKeyString].push(keyBoardModel.key);
					};
					
					var addKeyString = function (prevKeyString) {
						keyBoardModel.allNextKeys[prevKeyString] = [];
						addKey(prevKeyString);
					};
					
					var keyArrayExists = function (prevKeyString) {
						return $.isArray(keyBoardModel.allNextKeys[prevKeyString]); // True if keyArray exists
					};
									
					var prevKeyString = this.prevKeyStrokeArray.join('');
					
					for (var elements = this.prevKeyStrokeArray.length; elements > 0; elements--) {
						if (keyArrayExists(prevKeyString)) {
							var j = this.allNextKeys[prevKeyString].indexOf(this.key);
							if (j >= 0) { // this.key exists
								if (j > 0) { // this.key is not the first element, so it can be shifted left
									strength = Math.floor(j/(this.keySetSize - 1));
									shiftKey(prevKeyString, strength); // Shift this key strength positions to the left
								}
							} else { // add this.key to keyCombo array
								addKey(prevKeyString);
							}
						} else { // Add new keyCombo array with this.key as element
							addKeyString(prevKeyString);
						}
						prevKeyString = prevKeyString.substring(1);
					}
				}
			},
			
			// Replace the current keys with the new set while keeping as many keys in place as possible.
			replaceMagicKeys : function () {
				var newKeys = this.nextKeySet.slice(this.keySetToShow*this.keySetSize, (this.keySetToShow+1)*this.keySetSize);
				var mergedKeys = ['#','#','#','#','#','#','#','#','#','#','#','#','#'];
				var jNew;
				// Create array with existing keys, mark open spots with #
				for (var j in this.currKeySet.slice(this.keySetToShow*this.keySetSize, (this.keySetToShow+1)*this.keySetSize)) { 
					jNew = newKeys.indexOf(this.currKeySet[j]);
					if (jNew >= 0)  {
						newKeys.splice(jNew, 1);
						mergedKeys[j] = this.currKeySet[j];
					} else {
						mergedKeys[j] = '#';
					}
				}
				for (var jj in this.prevKeySet) { // Create array with existing keys, mark open spots with #
					jNew = newKeys.indexOf(this.prevKeySet[jj]);
					if (jNew >= 0)  {
						if (mergedKeys[jj] === '#') {
							newKeys.splice(jNew, 1);
							mergedKeys[jj] = this.prevKeySet[jj];
						}
					}
				}
				for (var jjj in newKeys) { // Fill in open spots marked with #
					mergedKeys[mergedKeys.indexOf('#')] = newKeys[jjj];
				}
				this.nextKeySet = mergedKeys.slice(0,this.keySetSize);  
				mergedKeys[13] = '.';
				mergedKeys[14] = '_';
				mergedKeys[15] = 'num';
				keyBoardInterface.drawMagicKeySet(mergedKeys);
			},
			
			// Determine the next set of keys to use
			getNextKeySet : function () {
				var complete = function () {
					return (keyBoardModel.nextKeySet.length >= 26);
				};
				var getPrevKeyArraySuccessors = function (keyString) {
					if (keyString.length < 1) {
						keyString = '_';
					}
					if ( $.isArray(keyBoardModel.allNextKeys[keyString]) ) { // Check if keyCombo exists
						keyBoardModel.nextKeySet = keyBoardModel.nextKeySet.concat(keyBoardModel.allNextKeys[keyString]);
					}
				};
				keyBoardModel.nextKeySet = [];
				var numberOfPrevKeysToProcess = keyBoardModel.prevKeyStrokeArray.length,
				PrevKeysToProcess = keyBoardModel.prevKeyStrokeArray.slice(-numberOfPrevKeysToProcess,numberOfPrevKeysToProcess).join('');
				while (!complete() && numberOfPrevKeysToProcess >= 0) {
					getPrevKeyArraySuccessors(PrevKeysToProcess);
					keyBoardModel.nextKeySet = keyBoardModel.eliminateDuplicates(keyBoardModel.nextKeySet);
					numberOfPrevKeysToProcess--;
					PrevKeysToProcess = PrevKeysToProcess.substring(1);
				}
				if (keyBoardModel.nextKeySet.length < 26) {
					alert ('error in program logic');
					console.log(keyBoardModel.nextKeySet);
				}
			},
			
			// Draw the new set of non moderator keys
			drawKeyboard : function () {
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
						keyBoardModel.advanceKeySet();
						keyBoardModel.replaceMagicKeys();
					break;
					default :
						keyBoardModel.replaceMagicKeys();
					break;
				}
			},
			
			// Get knowledge from cookie if set, else generate from textfile
			initKeyAI : function () {
				if (this.cookieIsSet(0)) {
					this.readKeyAIfromCookie();
				} else {
					this.eatBaseText('nl');
				}
				//this.eatBaseText('nl');
			},
			
			// Initialise
			init : function () {
				keyBoardInterface.initTouchDevice();
				this.allNextKeys._ = this.defaultNextKeys().slice();
				this.currKeySet = ['m','a','g','i','c','k','e','y','s','p','r','o','f'];
				this.nextKeySet = this.defaultNextKeys().slice();
				this.initKeyAI();
				setTimeout(this.drawKeyboard, 1500); // draw the new keyboard
				setTimeout(this.saveKeyAItoCookie, 3000);
				this.key = '_';
				this.prevKeyStrokeArray = ['_'];
			}
		};
		
		keyBoardModel.init(); // Initialise the KeyBoardModel
		
		// Main listener
		$('#keyboard').on(keyBoardInterface.touchOrClick, 'a', function () {
																		
			keyBoardModel.determineKey($(this).parent()); // Determine the class and id of the containing div
			
			screenInterface.char2screen(keyBoardModel.key); // put the keystroke to the screen
			
			keyBoardModel.record(); // update this.allNextKeys array
			
			keyBoardModel.rememberKey(); // shift this key on the previous keyArray
			
			keyBoardModel.rememberKeySet(); // remember the current keySet

			keyBoardModel.getNextKeySet(); // determine the nextkeyset to offer from prevKeyArray
			
			keyBoardModel.drawKeyboard(); // draw the new keyboard	
			
			keyBoardModel.updateStats(); // update the stats on screen
			
			keyBoardModel.saveKeyAI(); // save knowledge
			
			return false;
		});
		
		// Listener for language switch
		$('.flags a').on(keyBoardInterface.touchOrClick, function () {
			screenInterface.langSwitch();
			keyBoardModel.setLanguage();
			setTimeout(this.drawKeyboard, 1500); // draw the new keyboard
			setTimeout(this.saveKeyAItoCookie, 3000);
			this.key = '_';
			this.prevKeyStrokeArray = ['_'];
		});
				
	}());
		
});

/* 
- cursor zodat je ook middden in de tekst kunt wijzigen. 
- inputArea naar beneden scrollen als het vol is. 
*/
