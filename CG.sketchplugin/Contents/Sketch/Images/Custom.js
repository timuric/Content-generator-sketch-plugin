// Author https://github.com/iansilber
// Original repo https://github.com/iansilber/sketch-image-replace

@import "../js/utility.js";
@import "../js/sandbox.js";


function onRun(context){
    var fileTypes = [NSArray arrayWithObjects:@"png", @"jpg", @"gif", @"jpeg", nil];
    var panel = [NSOpenPanel openPanel];
    var imageFileNames = [];
    [panel setCanChooseFiles:true];
    [panel setCanChooseDirectories:true];
    [panel setAllowsMultipleSelection:true]; // yes if more than one dir is allowed
    [panel setAllowedFileTypes:fileTypes];

    var clicked = [panel runModal];

    if (clicked == NSFileHandlingPanelOKButton) {
        var isDirectory = false;
        var firstURL = [[panel URLs] objectAtIndex:0];
        var firstURLPath = [NSString stringWithFormat:@"%@", firstURL];

        if ([firstURLPath hasSuffix:@"/"]) {
            getFilesAndReplace([firstURL path], context)
        } else {
            var loop = [[panel URLs] objectEnumerator];
            while (url = [loop nextObject]) {
                imageFileNames.push([url path]);
            }
            replaceWithImages(imageFileNames, context);
        }
    }
}
