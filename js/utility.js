var tools = {
	appVersion: "0.8",
	versionComponents : function() {
		var info = [[NSBundle mainBundle] infoDictionary];
		var items = [[(info["CFBundleShortVersionString"]) componentsSeparatedByString:"."] mutableCopy];

		while([items count] < 3)
			[items addObject:"0"];

		return items;
	},
	majorVersion : function() {
		var items = tools.versionComponents();

		return items[0];
	},
	minorVersion : function() {
		var items = tools.versionComponents();

		return items[1];
	},
	convertToString : function(objectString){
		var i = 0;
		normalString = "";
		while(objectString[i] !== null) normalString += objectString[i];
		return normalString;
	},

	saveFile : function(path,data){		
		var someContent = NSString.stringWithString_(data)
		var path = path
		someContent.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)
	},
	pluginPath : function(){
		if(tools.majorVersion() == 3){
			var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
			var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
			return pluginFolder;
		}		
	},
	getJSONFromURL: function(url) {
		var request = [NSURLRequest requestWithURL:[NSURL URLWithString:url]],
			response = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil],
			responseObj = [NSJSONSerialization JSONObjectWithData:response options:nil error:nil]
		return responseObj
	},
	checkPluginUpdate: function(){		
		try{
			var response = this.getJSONFromURL('https://raw.githubusercontent.com/timuric/Content-generator-sketch-plugin/master/sketchpack.json')
			if(response && response.version){
				var rgx = new RegExp("\\d","g");
				var removeVersion = parseFloat(response.version.match(rgx).join(""))
				var installedVersion = parseFloat(this.appVersion.match(rgx).join(""))
				if (removeVersion > installedVersion) [doc showMessage:"New plugin update is available! Visit github.com/timuric/Content-generator-sketch-plugin"]
			}		
		}catch(e){
			log(e);
		}
	}
};

function alert(msg, title) {
  title = title || "Whoops";
  var app = [NSApplication sharedApplication];
  [app displayDialog:msg withTitle:title];
}

function deleteLayer(layer){
	var parent = [layer parentGroup];
	if(parent) [parent removeLayer: layer];
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function shuffle(array) {
	var currentIndex = array.count(), temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function replaceWithImages(images, context) {
	selection = context.selection;
	for(var i = 0; i < [selection count]; i++) {

		var image = [[NSImage alloc] initByReferencingFile:images[i]];
		var layer = selection[i];
		if([layer class] == MSShapeGroup){
			var fill = layer.style().fills().firstObject();
			fill.setFillType(4);
			layer.style().fills().firstObject().setPatternImage( image );
			layer.style().fills().firstObject().setPatternFillType(1);
		}
	}

	if([selection count] == 0) [doc showMessage:'Select at least one vector shape'];;

}

function getFilesAndReplace(directory, context) {
	var fileTypes = [NSArray arrayWithObjects:@"png", @"PNG", @"jpg", @"JPG", @"jpeg", @"JPEG", @"gif", @"GIF", nil];
	var fileManager = [NSFileManager defaultManager];
	var files = [fileManager contentsOfDirectoryAtPath:directory error:nil];
	var imageFileNames = [[files filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"pathExtension IN %@", fileTypes]] mutableCopy]
	var count = imageFileNames.count();

	if (count == 0) {
		var doc = context.document
			[doc showMessage:"The directory does not contain any images"]
	} else {

		shuffle(imageFileNames);
		for (var i = 0; i < context.selection.count(); i++) {
			imageFileNames[i] = directory + "/" + imageFileNames[i];
			log(imageFileNames[i])
		}
		replaceWithImages(imageFileNames, context);
		if(context.selection.count() == 0) [doc showMessage:'Select at least one vector shape'];
	}

}




