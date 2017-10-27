
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
    [input setStringValue:"dog"];
    [input autorelease];
    [alert setAccessoryView:input];
    var button = [alert runModal];

    if (button == NSAlertDefaultReturn) {
      [input validateEditing];
      var tag = [input stringValue];

      tag = tag.replace(/\s/g, "");
      log(tag);

      //Gets initial list of data: 18 image responses
      data = getData(tag);

      if(selection.length > 18) {
        for (var s = 0; s <= selection.length/18; s++) {
            //Gets next 18 images
            var end_cursor = data.tag.media.page_info.end_cursor;
            data2 = getDataHelper(tag, end_cursor);

            //Adds those images to original image list
            data.tag.media.nodes = data.tag.media.nodes.concat(data2.tag.media.nodes);
        }
      }

      process(selection, data, doc);

    }
  } else {
    [doc showMessage:"No layer is selected."];
  }
}

function getData(tag) {
  var request = [[NSMutableURLRequest alloc] init];
  [request setHTTPMethod:@"GET"];
  var queryString = "https://www.instagram.com/explore/tags/" + tag + "/?__a=1";
  [request setURL:[NSURL URLWithString:queryString]];

  var error = [[NSError alloc] init];
  var responseCode = null;

  var oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:responseCode error:error];

  var dataString = [[NSString alloc] initWithData:oResponseData
  encoding:NSUTF8StringEncoding];

  var pattern = new RegExp("\\\\'", "g");
  var validJSONString = dataString.replace(pattern, "'");

  return JSON.parse(validJSONString);
}

function getDataHelper(tag,cursor) {
  var request = [[NSMutableURLRequest alloc] init];
  [request setHTTPMethod:@"GET"];
  var queryString = "https://www.instagram.com/explore/tags/" + tag + "/?__a=1&max_id=" + cursor;
  [request setURL:[NSURL URLWithString:queryString]];

  var error = [[NSError alloc] init];
  var responseCode = null;

  var oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:responseCode error:error];

  var dataString = [[NSString alloc] initWithData:oResponseData
  encoding:NSUTF8StringEncoding];

  var pattern = new RegExp("\\\\'", "g");
  var validJSONString = dataString.replace(pattern, "'");

  return JSON.parse(validJSONString);
}

function process(selection, data, doc) {
  if (data.tag.media.nodes.length > 0) {
    for (var i=0; i < selection.length; i++) {

      var randomIndex = Math.floor(Math.random()*(data.tag.media.nodes.length-1));
      var imageURLString = data.tag.media.nodes[randomIndex].thumbnail_src;

      var url = [[NSURL alloc] initWithString: imageURLString];

      var newImage = [[NSImage alloc] initByReferencingURL:url];

      var layer = [selection objectAtIndex:i];

      var fill = layer.style().fills().firstObject();
      fill.setFillType(4);

      var imageData;
      if (MSApplicationMetadata.metadata().appVersion < 47) {
        imageData = MSImageData.alloc().initWithImage_convertColorSpace(newImage, false);
      } else {
        imageData = MSImageData.alloc().initWithImage(newImage);
      }
      fill.setImage(imageData);
      fill.setPatternFillType(1);

    }
  } else {
    var message = "No images found tagged with: " + tag;
    [doc showMessage: message];
  }
}
