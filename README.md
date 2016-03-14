Content Generator for Sketch
============================

Sketch generator allows you quickly create dummy data such as avatars, names, geo location data etc.

## Demo
#####Generating pictures

![Generating thumbnails](https://raw.githubusercontent.com/timuric/Content-generator-for-sketch-app/master/tutorial/userpics.gif)

#####Generating names

![Generating names](https://raw.githubusercontent.com/timuric/Content-generator-for-sketch-app/master/tutorial/names.gif)

#####Generating dummy text

![Generating text](https://raw.githubusercontent.com/timuric/Content-generator-for-sketch-app/master/tutorial/lorem.gif)

#####Generating strings
![custom string](https://cloud.githubusercontent.com/assets/5709624/8092928/c18d6d76-0fbd-11e5-962d-417165cc1a2d.gif)

You can create a custom string by combining any of these options:
- plain text (example: banana)
- random number from range (example: [0-20] )
- random item from an array (example: [banana~apple~grapes] )

An example of a combined string: $[0-999],[10-99] [new~used~old]

Which would result in "$321,34 old" or "$12,75 new"


## Generating custom images
In Sketch app use  `Plugins\Content Generator\Images\Custom` plugin to specify path to your own folder with images


## Installation
1. Download Zip and Extract it to a folder
2. In Sketch app `Plugins > Manage Plugins...`
3. In the Preferences window, click on the cog-wheel icon, and select `Show Plugins Folder` from the dropdown.
4. Place the extracted folder directly to the Plugins folder (nesting might not work atm)

## Upcoming features
* More types of data
* Fetch content directly from different online sources
* Easier extensibility

## Feature requests & feedback
Ping me on [twitter](http://twitter.com/timur_carpeev) or follow for updates.

## Bug reports
1. Open Console app `Applications/Utilities/Console`
2. Type Sketch In filter box [like so](https://raw.githubusercontent.com/timuric/Content-generator-sketch-plugin/master/tutorial/console.png)
3. Run broken plugin
4. Submit output of the Console app via [Github issues](https://github.com/timuric/Content-generator-sketch-plugin/issues) or [twitter](http://twitter.com/timur_carpeev) toghether with the version of your Sketch app


## Contributors
Author [Timur Carpeev](https://twitter.com/timur_carpeev)

Number plugins [Liu Liu](https://twitter.com/auxdesigner)

And [others](https://github.com/timuric/Content-generator-sketch-plugin/graphs/contributors)

## Credits
* Photo collection [Unsplash](http://unsplash.com/)
* User pics [Uifaces](http://uifaces.com/)
* User names [Uinames](http://uinames.com/)
* Random data [Mockaroo](http://mockaroo.com/)
* Custom photos [Ian Silber](https://github.com/iansilber/sketch-image-replace)
* Vintage user pics [Rad faces](http://www.radfaces.com/)
* Flickr keywords [https://github.com/nickstamas](https://github.com/nickstamas/Sketch-Quick-Pic)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/timuric/content-generator-sketch-plugin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

