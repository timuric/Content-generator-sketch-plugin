var loadText = function(){
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i];
		var randomNum = (Math.random() * (4.00 - 0.10) + 0.10).toFixed(2);
		[layer setStringValue: randomNum + "%"];
		[layer setName: randomNum + "%"];
		[layer adjustFrameToFit];	
	}
	tools.checkPluginUpdate();
};