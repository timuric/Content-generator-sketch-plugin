var loadText = function(data, label){
	label = label || 'some data';
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i];
		var randomData = data[ Math.floor(Math.random() * data.length) ];
		if(randomData){			
			[layer setStringValue: randomData];
			[layer setName: label];
			[layer adjustFrameToFit];
		}		
	}
	tools.checkPluginUpdate();
};