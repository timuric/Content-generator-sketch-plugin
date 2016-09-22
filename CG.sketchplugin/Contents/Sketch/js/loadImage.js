var loadImages = function(context, dataPath, groupName, pictureName){
	var doc = context.document;
	var selection = context.selection;
	var bundle = context.plugin

	var groupName = groupName || 'picture';
		pictureName = pictureName || 'picture';

	function getImageCollection(imgAmount){
		var fileManager = [NSFileManager defaultManager];
		var imagesPath =  bundle.url() + "Contents/Sketch/" + dataPath;
		imagesPath = imagesPath.replace("%20", " ").replace("file://", "")
		log(imagesPath)
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
			imagesCollection = getImageCollection(selection.length + 1);

		for(var i = 0; i < selection.length; i++){
			var layer = selection[i];
            if([layer class] == MSShapeGroup){
                var image = imagesCollection[i];
				log(image)
                var fill = layer.style().fills().firstObject();
				fill.setFillType(4);
				fill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(image, false));
				fill.setPatternFillType(1);
            }
		}

		if(selection.length == 0) [doc showMessage:'Select at least one vector shape'];;

		tools.checkPluginUpdate();
	}
	main();
}
