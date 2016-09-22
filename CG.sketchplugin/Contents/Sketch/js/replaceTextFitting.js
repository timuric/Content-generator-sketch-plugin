var loadText = function(context, data, label){
	var selection = context.selection;
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i],
			stringLength = [[layer stringValue] length],
			randomText = data[ Math.floor(Math.random() * data.length)];

		while(randomText.length < stringLength){
			randomText += data[ Math.floor(Math.random() * data.length)];
		}

		randomText = randomText.slice(0, stringLength).replace(/[^\.]$/,".").replace(/ $/,"").replace(/ .$/,'.').replace(/ \w\.$/,".");
		randomText = randomText.slice(0, stringLength).replace(/ $/).replace(/ .$/,'.');

		if(randomText){			
			[layer setStringValue: randomText];
			if(label === String) [layer setName: label];
		}		
	}
};