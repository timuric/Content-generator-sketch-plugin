var loadImages = function(dataPath, groupName, pictureName){
	var groupName = groupName || 'picture';
		pictureName = pictureName || 'picture';

	function createGroup(mask){
		var group = [[mask parentGroup] addLayerOfType: 'group'];
		[group setName: groupName];
		copyLayerSize(mask, group);
		copyLayerPosition(mask, group);	
		return group;
	}

	function createMask(group, layer){
		var parentGroup = [layer parentGroup],
			newLayer = [layer duplicate];
		//clone
		[parentGroup removeLayer:newLayer];
		[group addLayer: newLayer];
		[parentGroup removeLayer: layer];

		//Set as mask
		[newLayer setName:"mask"]
		[newLayer setHasClippingMask: true];
		
		[[newLayer frame] setX:0];
		[[newLayer frame] setY:0];

		return layer;
	}

	function addImageToGroup(group, imageData, mask){		
		if(tools.majorVersion() == 3){
			var imageCollection = [[group documentData] images];
			var imageData = [imageCollection addImage:imageData name:pictureName convertColourspace:false];
			var newImage = [[MSBitmapLayer alloc] initWithImage:imageData parentFrame:[group frame] name: pictureName];	
		}
		
		if(tools.majorVersion() == 2){
			var newImage = [[MSBitmapLayer alloc] init]
			[newImage setImage: imageData];
			[group addLayer: newImage];
		}
		
		var coordinates = [mask frame];	
		var x = coordinates.x();
		var y = coordinates.y();

		[group addLayer: newImage];

		//Select Bitmap Image Layer and center it
		var bitmapLayer = [[group layers] objectAtIndex:1];
		if( [bitmapLayer class] == MSBitmapLayer ) {
			
			[[bitmapLayer frame] setX:0];
			[[bitmapLayer frame] setY:0];

			var widthDiff = [[bitmapLayer frame] width] / [coordinates width],
				heightDiff = [[bitmapLayer frame] height] / [coordinates height];
			
			if(widthDiff <= heightDiff){			
				[[bitmapLayer frame] setWidth: [coordinates width]];
				var offsetHeigh = ( [coordinates height] - [[bitmapLayer frame] height] ) / 2;
				[[bitmapLayer frame] setY: offsetHeigh]
			} 
			else{
				[[bitmapLayer frame] setHeight: [coordinates height]];	
				var offsetWidth = ( [coordinates width] - [[bitmapLayer frame] width] ) / 2;
				[[bitmapLayer frame] setX: offsetWidth]
			}
		}
		else{
			log("Can't find bitmap layer");
		}
	}

	function syncProperties(src, dst, props) {
	  for(var j=0, k=[props count]; j < k; j++) {
	    var getter = props[j];
	    var setter = 'set' + capitalize(getter);
	    dst[setter](src[getter]());
	  }
	}

	function copyLayerPosition(src, dst) {
	  var srcFrame = [src frame],
	      dstFrame = [dst frame];

	    [dstFrame setX:[srcFrame x]];
	    [dstFrame setY:[srcFrame y]];
	}

	function copyLayerSize(src, dst) {
	  var srcFrame = [src frame],
	      dstFrame = [dst frame];
	    
	    [src setConstrainProportions:0];
	    [dst setConstrainProportions:0];

	    [dstFrame setWidth:[srcFrame width]];
	    [dstFrame setHeight:[srcFrame height]];
	}

	function loadImages(imgAmount){
		var imagesCollection = [],
			fileManager = [NSFileManager defaultManager];

		if(tools.majorVersion() == 3){
			var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
			var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
			imagesPath =  sketchPluginsPath + pluginFolder + dataPath;
		}
		if(tools.majorVersion() == 2){						
			userFolder = [fileManager URLsForDirectory:NSLibraryDirectory inDomains:NSUserDomainMask],
			imagesPath = [[userFolder objectAtIndex:0] absoluteString] + "Application Support/com.bohemiancoding.sketch3/Plugins/avatars/";			
			imagesPath = imagesPath.replace("file://","");	
		}
		
		log(imagesPath)
		var imagesFileNames = [fileManager contentsOfDirectoryAtPath:imagesPath error:nil],
			imgLen = [imagesFileNames count];

		for(var i = 0; i < imgAmount; i++){
			var r = Math.ceil(Math.random() * imgLen);
			var fileName = imagesPath+imagesFileNames[r];
			if ([fileManager fileExistsAtPath: fileName]) {				
				var newImage = [[NSImage alloc] initWithContentsOfFile:fileName];			
				imagesCollection.push(newImage);
			}
		}

		return imagesCollection;
	}

	function newThumbnailGroup(layer,imageData){		
			var	group = createGroup(layer);
			layer = createMask(group, layer);
			addImageToGroup(group, imageData, layer);
	}

	function updateThumbnail(group, imageData){
		var imageLayer = undefined,
			mask = undefined;

		for(var i = 0, l = [[group layers] count]; i < l; i++){
			var currentLayer = [[group layers] objectAtIndex:i];
			if([currentLayer class] == MSBitmapLayer) imageLayer = currentLayer;
			if([currentLayer class] == MSShapeGroup && currentLayer.hasClippingMask) mask = currentLayer;
		}
		if(imageLayer && mask){
			deleteLayer(imageLayer);
			addImageToGroup(group, imageData, mask);
		}
	}

	function main(){		
		var allLayers = [[doc currentPage] layers],
			imagesCollection = loadImages([selection count]);

		for(var i = 0; i < [selection count]; i++){
			var selected = selection[i];
			if([selected class] == MSShapeGroup) newThumbnailGroup(selection[i], imagesCollection[i]);
			if([selected class] == MSLayerGroup) updateThumbnail(selection[i], imagesCollection[i]);
		}

		if([selection count] == 0) alert('Select at least one thumbnail group or a vector shape');
	}
	main();
}

