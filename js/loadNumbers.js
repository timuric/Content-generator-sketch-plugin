var loadText = function(){
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i];
		var randomNum = (Math.random() * (1000.00 - 10.00) + 10.00).toFixed(0);
		[layer setStringValue: "" + randomNum];
		[layer setName: "" + randomNum];
		[layer adjustFrameToFit];	
	}
	tools.checkPluginUpdate();
};