var loadText = function(data, secondData){
	for (var i = 0, l = [selection count]; i < l; i++) {
		var layer = selection[i];
		var randomName = data[ Math.floor(Math.random() * data.length) ];

		if(secondData) randomName += ' ' + secondData[ Math.floor(Math.random() * secondData.length) ];

		[layer setStringValue: randomName];
		[layer setName: randomName];
	}
};