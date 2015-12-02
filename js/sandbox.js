var environ = [[NSProcessInfo processInfo] environment],
    in_sandbox= (nil != [environ objectForKey:"APP_SANDBOX_CONTAINER_ID"])

if(in_sandbox){
    print("We’re sandboxed: here be dragons")
}

AppSandbox = function(context){
    var scriptPath = context.scriptPath.substring(0, context.scriptPath.indexOf('\.sketchplugin/') + 1)
    this.prefFile =  scriptPath + "sketchplugin/Contents/Resources/preferences.plist"
}
AppSandbox.prototype.authorize = function(path, callback){
    log("AppSandbox.authorize("+path+")")
    var success = false

    if (in_sandbox) {
        var url = [[[NSURL fileURLWithPath:path] URLByStandardizingPath] URLByResolvingSymlinksInPath],
        allowedUrl = false

        // Key for bookmark data:
        var bd_key = this.key_for_url(url)

        // this.clear_key(bd_key) // For debug only, this clears the key we're looking for :P

        // Bookmark
        var bookmark = this.get_data_for_key(bd_key)
        if(!bookmark){
            log("– No bookmark found, let's create one")
            var target = this.file_picker(url)
            this.save_bookmark(target)
        } else {
            log("– Bookmark found")
        }

        log("  " + bookmark)

        // Thanks to @joethephish for this pointer (pun totally intended)
        var bookmarkDataIsStalePtr = MOPointer.alloc().init()
        var allowedUrl = [NSURL URLByResolvingBookmarkData:bookmark
        options:NSURLBookmarkResolutionWithSecurityScope
        relativeToURL:nil
        bookmarkDataIsStale:bookmarkDataIsStalePtr
        error:{}]

        if(bookmarkDataIsStalePtr.value() != 0){
            log("— Bookmark data is stale")
            log(bookmarkDataIsStalePtr.value())
        }

        if(allowedUrl) {
            success = true
        }
    } else {
        success = true
    }

    [allowedUrl startAccessingSecurityScopedResource]
    callback.call(this,success)
    // [allowedUrl stopAccessingSecurityScopedResource]
}
AppSandbox.prototype.save_bookmark = function(target) {
    var bd_key = this.key_for_url(target)
    bookmark = [target bookmarkDataWithOptions:NSURLBookmarkCreationWithSecurityScope
    includingResourceValuesForKeys:nil
    relativeToURL:nil
    error:{}]
    // Store bookmark
    this.set_data_for_key(bookmark,bd_key)

}
AppSandbox.prototype.key_for_url = function(url){
    return "bd_" + [url absoluteString]
}
AppSandbox.prototype.clear_key = function(key){
    var def = [NSUserDefaults standardUserDefaults]
        [def setObject:nil forKey:key]
}
AppSandbox.prototype.file_picker = function(url){
    // Panel
    var openPanel = [NSOpenPanel openPanel]

        [openPanel setTitle:"Sketch Authorization"]
    [openPanel setMessage:"Due to Apple's Sandboxing technology, Sketch needs your permission to write to this folder."];
    [openPanel setPrompt:"Authorize"];

    [openPanel setCanCreateDirectories:false]
    [openPanel setCanChooseFiles:true]
    [openPanel setCanChooseDirectories:true]
    [openPanel setAllowsMultipleSelection:false]
    [openPanel setShowsHiddenFiles:false]
    [openPanel setExtensionHidden:false]

    [openPanel setDirectoryURL:url]

    var openPanelButtonPressed = [openPanel runModal]
    if (openPanelButtonPressed == NSFileHandlingPanelOKButton) {
        allowedUrl = [openPanel URL]
    }
    return allowedUrl
}

AppSandbox.prototype.get_data_for_key = function(key){
    var dictionary = [NSMutableDictionary dictionaryWithContentsOfFile:this.prefFile];
    return [dictionary objectForKey:key]
}
AppSandbox.prototype.set_data_for_key = function(data,key) {
    var dictionary = [NSMutableDictionary dictionaryWithContentsOfFile:this.prefFile];
    [dictionary setObject:data forKey:key]
    [dictionary writeToFile:this.prefFile atomically:true]
}
