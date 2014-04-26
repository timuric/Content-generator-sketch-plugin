var loadGeo = function(data, key){
	for (var i = 0, l = [selection length]; i < l; i++) {
		var layer = selection[i];
		var randomName = data[ Math.floor(Math.random() * data.length) ][key];
		[layer setStringValue: randomName];
		[layer setName: randomName];
	}
};