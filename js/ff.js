// JavaScript Document
		
		// Read Block order from cookie and apply to Blocks
		function RestoreMagicKeysAI() {
			var rowsAssoc, fromCookie = $.cookie('MagicKeys').split('|'), letterVal, i;
			
			for (i = 0; i < 27; i++) {
				letterVals = fromCookie[i].split(',');
				allzero[i] = {letterVal[0]+'':letterVal[1]};
				for (var j in allzero) {
					rowsAsso0c[j]
				}
			}
			return rows
		}

		for (i = 0; i < 27; i++) {
			keyValStr = ''
			for (j = 0; j < 26; j++) {
				keyValStr = keyValStr + CustomKeystrokes[i][j] + ',';
			}
			keyValStr = keyValStr.substring(0, keyValStr.length-1);
			KeystrokeDataString = KeystrokeDataString + keyValStr + '|';
		}
		KeystrokeDataString = KeystrokeDataString.substring(0, KeystrokeDataString.length-1);

	
		for (var i in allzero) {
			allzero[i] = { 
			'a':0,'b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,
			'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0
			};
		}
        // If cookie for block order is set, restore order, else default order
        if (!($.cookie('MagicKeys') === null)) {
			fromCookie = RestoreMagicKeysAI();
			console.log('from cookie:',fromCookie);
			return fromCookie;
		}
		return allzero;
