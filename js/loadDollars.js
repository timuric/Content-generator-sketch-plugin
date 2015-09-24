var loadText = function(){
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i];
		var randomNum = (Math.random() * (1500.00 - 10.00) + 10.00).toFixed(2);

		function numberWithCommas(randomNum) {
		    var parts = randomNum.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    return parts.join(".");
		}


		[layer setStringValue: "$" + numberWithCommas(randomNum)];
		[layer setName: "$" + randomNum];
		[layer adjustFrameToFit];	
	}
	tools.checkPluginUpdate();
};