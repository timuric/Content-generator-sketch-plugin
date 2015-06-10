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


## Adding custom images

1. Reveal plugins folder
2. Open Content Generator plugin folder
3. Add your photos to Data > Photos > my-photos


## Installation
Add Generator folder to the plugin folder `/Library/Application Support/com.bohemiancoding.sketch3` or '~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application Support/com.bohemiancoding.sketch3/' or find it via menu option in Sketch 3 `Plugins / Reveal Plugins folder...`

## Upcoming features
* Shortcut for repeating last action
* More types of data
* Fetch content directly from different online sources 
* Installation and customization panel
* Easier extensibility

## Feature requests, bugs & feedback

Ping me on [twitter](http://twitter.com/timur_carpeev) or follow for updates.
Best way to submit bugs is to attach a screenshot of the console app [like so](https://www.dropbox.com/s/e3g4g49j1lwkp5j/Screenshot%202014-06-09%2022.33.03.png) (use "sketch" in filter box)

## Contributing
Any contribution is welcome, if you want to add more data sets or even your photo to the set let me know. Also if you can submit better demo gifs it would be vey much appreciated.

## Credits
* Photo collection [Unsplash](http://unsplash.com/)
* User pics [Uifaces](http://uifaces.com/)
* User names [Uinames](http://uinames.com/)
* Random data [Mockaroo](http://mockaroo.com/)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/timuric/content-generator-sketch-plugin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

