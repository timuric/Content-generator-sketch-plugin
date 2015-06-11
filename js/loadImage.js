var loadImages = function(dataPath, groupName, pictureName){
	var groupName = groupName || 'picture';
		pictureName = pictureName || 'picture';

	function loadImages(imgAmount){
		var fileManager = [NSFileManager defaultManager];
		var scriptPath = sketch.scriptPath;			
		var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
		var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
		var imagesPath =  sketchPluginsPath + pluginFolder + dataPath;
		var imagesFileNames = [fileManager contentsOfDirectoryAtPath:imagesPath error:nil];
		var imageCount = [imagesFileNames count] -1;
		var selectedPaths = [];


		if(imgAmount > imageCount){ //Load images in sequential order
			while(imgAmount--) {
				var index = Math.floor(Math.random() * imageCount);
				do {
					index = index >= imageCount ? 0 : index + 1;
					var fileName = imagesFileNames[index];
					var filePath = imagesPath + fileName;			
				} while(![fileManager fileExistsAtPath: filePath] || fileName == '.DS_Store')

				selectedPaths.push(filePath);
			}
		} 
		else{	//Load unique images
			while(imgAmount--) {  
				do {
					var index = Math.floor(Math.random() * imageCount);
					var fileName = imagesFileNames[index];
					var filePath = imagesPath + fileName;
					var match = selectedPaths.filter(function(selectedPath){return filePath == selectedPath;});
				} while(fileName == '.DS_Store' || ![fileManager fileExistsAtPath: filePath] || match.length >= 1);
				selectedPaths.push(filePath);
			}
		}
		
		return selectedPaths.map(function(imagePath){
			if ([fileManager fileExistsAtPath: imagePath]) {				
				var image = [[NSImage alloc] initWithContentsOfFile:imagePath];			
				return image;
			}
		})
	}

	function main(){		
		var allLayers = [[doc currentPage] layers],
			imagesCollection = loadImages([selection count] + 1);

		for(var i = 0; i < [selection count]; i++){
			var layer = selection[i];
            if([layer class] == MSShapeGroup){
                var image = imagesCollection[i];
                var fill = layer.style().fills().firstObject();
                fill.setFillType(4);                
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

		if([selection count] == 0) [doc showMessage:'Select at least one vector shape'];;

		tools.checkPluginUpdate();
	}
	main();
}

