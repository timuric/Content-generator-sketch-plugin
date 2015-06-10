var loadImages = function(dataPath, groupName, pictureName){
	var groupName = groupName || 'picture';
		pictureName = pictureName || 'picture';

	function loadImages(selectedImgCount){
		log('selectedImgCount: '+selectedImgCount);

		var imagesCollection = [],
			fileManager = [NSFileManager defaultManager];

		if(tools.majorVersion() == 3){
			var scriptPath = sketch.scriptPath;
			var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + '/';
			var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, '');
			imagesPath =  sketchPluginsPath + pluginFolder + dataPath;
		}
		log('imagesPath: '+imagesPath);
		var imagesFileNames = [fileManager contentsOfDirectoryAtPath:imagesPath error:nil],
			imgLen = [imagesFileNames count];

		log('imagesFileNames (before clean): '+imagesFileNames);

		// clean out invalid files
		var imagesFileNamesCleaned = [];
		for (var i = 0; i < imgLen; i++) {
			if (imagesFileNames[i] == '.DS_Store') {
				log('skipping '+imagesFileNames[i]);

			} else {
				imagesFileNamesCleaned.push(imagesFileNames[i]);
			}
		}

		log('imagesFileNamesCleaned: '+imagesFileNamesCleaned);

		var offset = 0;
		for (var i = 0; i < selectedImgCount; i++) {
      var filename = '';
			if (i+1 > imagesFileNamesCleaned.length) {
				// no more images (reached end) - move back and use the first ones
				filename = imagesFileNamesCleaned[offset++];
			} else {
				filename = imagesFileNamesCleaned[i];
			}

			var pathToFile = imagesPath+filename;

			if ([fileManager fileExistsAtPath: pathToFile]) {
				var newImage = [[NSImage alloc] initWithContentsOfFile:pathToFile];
				imagesCollection.push(newImage);
			}
		}

		return imagesCollection;
	};

	function main(){
		var allLayers = [[doc currentPage] layers],
			imagesCollection = loadImages([selection count]);

		for(var i = 0; i < [selection count]; i++){
			var layer = selection[i];
            if([layer class] == MSShapeGroup){
                var image = imagesCollection[i];
                var fill = layer.style().fills().firstObject();
                fill.setFillType(4);
                //log(tools.minorVersion())
                if(tools.minorVersion() >= 1){
                	var coll = layer.style().fills().firstObject().documentData().images();
                	[fill setPatternImage:image collection:coll]
                }
                else{
                	layer.style().fills().firstObject().setPatternImage( image );
                }
                layer.style().fills().firstObject().setPatternFillType(1);
            }
		}

		if([selection count] == 0) alert('Select at least one vector shape');
	}
	main();
};
