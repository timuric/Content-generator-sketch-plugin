var loadImages = function(dataPath, groupName, pictureName){
	var groupName = groupName || 'picture';
		pictureName = pictureName || 'picture';

	function loadImages(imgAmount){
		var imagesCollection = [],
			fileManager = [NSFileManager defaultManager];

		if(tools.majorVersion() == 3){			
			var scriptPath = sketch.scriptPath;			
			var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
			var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
			imagesPath =  sketchPluginsPath + pluginFolder + dataPath;
		}	
		log(imagesPath)
		var imagesFileNames = [fileManager contentsOfDirectoryAtPath:imagesPath error:nil],
			imgLen = [imagesFileNames count];

		for(var i = 0; i < imgAmount; i++){
			var r = Math.floor(Math.random() * imgLen);
			var fileName = imagesPath+imagesFileNames[r];
			if ([fileManager fileExistsAtPath: fileName]) {				
				var newImage = [[NSImage alloc] initWithContentsOfFile:fileName];			
				imagesCollection.push(newImage);
			}
		}

		return imagesCollection;
	}

	function main(){		
		var allLayers = [[doc currentPage] layers],
			imagesCollection = loadImages([selection count]);

		for(var i = 0; i < [selection count]; i++){
			var layer = selection[i];
            if([layer class] == MSShapeGroup){
                var image = imagesCollection[i];
                var fill = layer.style().fills().firstObject();
                fill.setFillType(4);                
                log(tools.minorVersion())
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
}

