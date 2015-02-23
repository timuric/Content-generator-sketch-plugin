var tools = {
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
	}
};

function alert(msg, title) {
  title = title || "Whoops";
  var app = [NSApplication sharedApplication];
  [app displayDialog:msg withTitle:title];
}

function deleteLayer(layer){
	var parent = [layer parentGroup];
	//log(parent.removeLayer());
	if(parent) [parent removeLayer: layer];
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}



