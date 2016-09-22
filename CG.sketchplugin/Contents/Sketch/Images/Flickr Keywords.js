// Fill with Picture Of (control command p)
// Fills selected layers with images tagged from Flickr
// by Nick Stamas @nickstamas

function onRun(context){
  var selection = context.selection;
  var doc = context.document;

  if (selection.length > 0) {
    var alert = [NSAlert alertWithMessageText: "Fill with pic of:"
    defaultButton:"OK"
    alternateButton:"Cancel"
    otherButton:nil
    informativeTextWithFormat:""];

    var input = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, 200, 24)];
    [input setStringValue:"dog,corgi"];
    [input autorelease];
    [alert setAccessoryView:input];
    var button = [alert runModal];

    if (button == NSAlertDefaultReturn) {
      [input validateEditing];
      var tag = [input stringValue];

      tag = tag.replace(/\s/g, "");
      log(tag);

      var request = [[NSMutableURLRequest alloc] init];
      [request setHTTPMethod:@"GET"];
      var queryString = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=" + tag;
      [request setURL:[NSURL URLWithString:queryString]];

      var error = [[NSError alloc] init];
      var responseCode = null;

      var oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:responseCode error:error];

      var dataString = [[NSString alloc] initWithData:oResponseData
      encoding:NSUTF8StringEncoding];

      var pattern = new RegExp("\\\\'", "g");
      var validJSONString = dataString.replace(pattern, "'");

      var data = JSON.parse(validJSONString);

      if (data.items.length > 0) {
        for (var i=0; i <= selection.length; i++) {
          var randomIndex = Math.floor(Math.random()*(data.items.length-1))
          var imageURLString = data.items[randomIndex].media.m;
          var url = [[NSURL alloc] initWithString: imageURLString];

          var newImage = [[NSImage alloc] initByReferencingURL:url];

          var layer = [selection objectAtIndex:i];

          var fill = layer.style().fills().firstObject();
          fill.setFillType(4);

          fill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(newImage, false));
          fill.setPatternFillType(1);

        }
      } else {
        var message = "No images found tagged with: " + tag;
        [doc showMessage: message];
      }
    }
  } else {
    [doc showMessage:"No layer is selected."];
  }
}

