// JavaScript Document
$(function () {
			
	function Init() {
		
		var indexInDefaultOrder = function(f_key) {
			return (new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z')).indexOf(f_key);
		}
				
		var defaultOrder = function() {
			return new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		}
		
		function readCookie() {
			var keyStrokeAI = new Array(27);
			var fromCookie, i;
			fromCookie = $.cookie('MagicKeys').split('|');
			for (i = 0; i < 27; i++) {
				keyStrokeAI[i] = fromCookie[i].split(',')
			}
			return keyStrokeAI;
		}
		
		function resetAll() {
			var keyStrokeAI = new Array(27), i;
			for (i = 0; i < 27; i++) {
				keyStrokeAI[i] = defaultOrder();
			}
			return keyStrokeAI;
		}
		
	    if (!($.cookie('MagicKeys') === null)) {
			keyStrokeAI = readCookie();
		} else {
			keyStrokeAI = resetAll();
		}
		return keyStrokeAI;

	}
		
	function Learn(prevKey, thisKey) {
		var i, j = CustomKeystrokes.indexOf(thisKey), temp;
		
		if (prevKey === 'space') {
			i = 26;
		} else {
			i = defaultOrder().indexOf(prevKey);
		}
		
		if (j > 0) {
			temp = CustomKeystrokes[i][j-1];
			CustomKeystrokes[i][j-1] = CustomKeystrokes[i][j];
			CustomKeystrokes[i][j] = temp;
		}
	}
	
	function DrawKey(charname){
		switch (charname) {
			case 'space' : character = ' '; break;
			default		 : character = charname; 
				$('#mainkeys').append('<div class="key" id="'+charname+'"><a href="#">'+character+'</a></div>');
			break;
		}
	}
	
	function DrawKeyBoardAlpha(PNK, keySet) {
		var firstKey = keySet*9;
		var lastKey = (keySet+1)*9;
		var j, count = 0;
		for (j = 0; j < 26; j++) {
			if ((count >= firstKey) && (count < lastKey)) {
				DrawKey(PNK[j]);
			}
			count+=1;
		}
		if (keySet === 2){
			DrawKey(PNK[0]);
		}
		$('#mainkeys').append('<div class="clearFix"></div>');
	};
	
	function ReplaceKeyBoardAlpha(PNK, keySet) {
		var startKey = keySet*9;
		var endKey = (keySet+1)*9;
		var j, count = 0;
		var aKey;
		var replacementKeys = [];
		for (j = 0; j < 26; j++) {
			aKey = PNK[indexInDefaultOrder(j)];
			if ((count >= startKey) && (count < endKey)) {
				if ($('#mainkeys #'+ aKey).length) {
					$('#mainkeys #'+ aKey).addClass('keep');
				}
				else {
					replacementKeys[aKey]=PNK[aKey];
				}
			}
			count+=1;
		}
		for (var j in replacementKeys) {
			var keyToReplace = $('#mainkeys .key').not('.keep').get(0);
			$(keyToReplace).wrap('<div class="temp" />');
			var raplacingKey = '<div class="key keep" id="'+j+'"><a href="#">'+j+'</a></div>';
			$(keyToReplace).replaceWith(raplacingKey).unwrap('<div class="temp" />');
		}
		$('#mainkeys .key').removeClass('keep');
		if (keySet === 2){
			DrawKey('space');
		}
	}
	
	function toggleNumlock(){
		var $numlockkey = $('#num a');
		if ($numlockkey.text() === '123') {
			$numlockkey.text('abc');
		} else {
			$numlockkey.text('123');
		}
	}
	
	function DrawKeyBoardNum(lastChar, keySet) {
		if ($('#num a').text() === '123') {
			for (var j=1;j<10;j++) {
				DrawKey(j+'');
			}
			$('#space').wrap('<div class="temp" />').replaceWith('<div class="key" id="nul"><a href="#">0</a></div>').unwrap('<div class="temp" />');
		}
	}
	
	function deleteLastChar() {
		$('#typed').html($('#typed').html().slice(0,-1))
	}
	
	function EmptyKeyBoard() {
		$('#mainkeys .key, #mainkeys .clearFix').remove();
	}
	
	function HighlightKey(key) {
		$('#'+key).toggleClass('highlight');
		capslock = !capslock
	}
	function LowlightKey(key) {
		$('#'+key).removeClass('highlight');
		capslock = false
	}
	
	function ProcessKeyStroke(key,modkey) {
		var logit = false;
		switch (key) {
			case 'space': 
				char = ' ';
				keyset = 0;
				//logit = true;
				break;
			case 'punt' : 
				char = '.';
				key = 'space';
				keyset = 0;
				break;
			case 'komma': 
				char = ',';
				key = 'space';
				keyset = 0;
				break;
			case 'shift':
				HighlightKey(key);
				break;
			case 'num':
				numlock = !numlock;
				EmptyKeyBoard();
				if (numlock) {
					DrawKeyBoardNum();
				} else {
					DrawKeyBoardAlpha(CustomKeystrokes['space'],0);
					$('#nul').wrap('<div class="temp" />').replaceWith('<div class="key" id="space"><a href="#"> </a></div>').unwrap('<div class="temp" />');
				}
				toggleNumlock();
				break;
			case 'backsp':
				deleteLastChar();
				key = $('#typed').text().slice(-1);
				ReplaceKeyBoardAlpha(CustomKeystrokes[key],keyset);
				break;
			case 'nextset':
				if (!numlock) {
					key = 'space';
					keyset=(keyset+1) % 3;
					EmptyKeyBoard();
					DrawKeyBoardAlpha(CustomKeystrokes['space'],keyset);
				}
				break;
			case 'return':
				key = 'space';
				keyset = 0;
				$('#typed').html($('#typed').html()+'\n');
				EmptyKeyBoard();
				DrawKeyBoardAlpha(CustomKeystrokes[lastkey],keyset);
			case 'nul':
				char = '0';
				key = 'space';
				keyset = 0;
				break;
			default		: 
				char = key;
				logit = true;
				break;
		}
		if (!modkey) {
			if (capslock) {
				char = char.toUpperCase()
				capslock = false;
				LowlightKey('shift');
			}
			$('#typed').append(char);
			ReplaceKeyBoardAlpha(key,keyset);
		}
		return logit;
	}

	function SaveMagicKeysAI() {
		var keyValStr, KeystrokeDataString = '', i, j;
		for (i = 0; i < 27; i++) {
			keyValStr = ''
			for (j = 0; j < 26; j++) {
				keyValStr = keyValStr + CustomKeystrokes[i][j] + ',';
			}
			keyValStr = keyValStr.substring(0, keyValStr.length-1);
			KeystrokeDataString = KeystrokeDataString + keyValStr + '|';
		}
		KeystrokeDataString = KeystrokeDataString.substring(0, KeystrokeDataString.length-1);
		console.log('writing cookie');
		//console.log('uncompressed',KeystrokeDataString);
		//$.cookie('MagicKeys', null);
		$.cookie('MagicKeys', KeystrokeDataString, { expires: 365 });
		//console.log('from cookie',$.cookie('MagicKeys'));
	}
	
	var CustomKeystrokes = Init();
	var lastkey = 'space';
	var keyset = 0;
	var count = 0;
	var capslock = false;
	var numlock = false;
	
	DrawKeyBoardAlpha(CustomKeystrokes[26],0);

	$('.key').live('click', function() {
		var key = $(this).attr('id');
		var modkey = $(this).hasClass('mod');
		var logThisKey = false;
		if (!modkey) {
			keyset = 0;
		}
		logThisKey = ProcessKeyStroke(key,modkey);
		if (!modkey) {
			if (logThisKey) {
				Learn(lastkey, key);
				count = (count+1) % 10;
				if (count === 9) {
					SaveMagicKeysAI();
				}
			}
			lastkey = key;
		}
		//console.log(CustomKeystrokes);
		return false
	});

		
});