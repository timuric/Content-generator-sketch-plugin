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
		var anyImage = false;
		var gender = '';
		if (groupName == 'any user pic'){
			anyImage = true;
		}
		if (anyImage) {
			var malePath = imagesPath+'men/';
			var femalePath = imagesPath+'women/';
			var maleCount = [[fileManager contentsOfDirectoryAtPath:malePath error:nil] count] -1;
			var femaleCount = [[fileManager contentsOfDirectoryAtPath:femalePath error:nil] count] -1;
			imageCount = maleCount + femaleCount;
		}

		if(imgAmount > imageCount){ //Load images in sequential order
			while(imgAmount--) {
				if (anyImage) {
						var g = Math.floor(Math.random() * 1000)%2;
						gender = g ? 'men/' : 'women/';
						imageCount = g ? maleCount : femaleCount;
						imagesFileNames = [fileManager contentsOfDirectoryAtPath:(imagesPath + gender) error:nil];
				}
				var index = Math.floor(Math.random() * imageCount);
				do {
					index = index >= imageCount ? 0 : index + 1;
					var fileName = imagesFileNames[index];
					var filePath = imagesPath + gender + fileName;
				} while(![fileManager fileExistsAtPath: filePath] || fileName == '.DS_Store')

				selectedPaths.push(filePath);
			}
		} 
		else{	//Load unique images
			while(imgAmount--) {  
				do {
					if (anyImage) {
						var g = Math.floor(Math.random() * 1000)%2;
						gender = g ? 'men/' : 'women/';
						imageCount = g ? maleCount : femaleCount;
						imagesFileNames = [fileManager contentsOfDirectoryAtPath:(imagesPath + gender) error:nil];
					}
					var index = Math.floor(Math.random() * imageCount);
					var fileName = imagesFileNames[index];
					var filePath = imagesPath + gender + fileName;
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

