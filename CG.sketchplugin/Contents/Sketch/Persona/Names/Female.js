@import '../../js/utility.js'
@import '../../js/loadNames.js'
@import '../../data/names/names.js'

function onRun(context){
    firstNames = data[24][2];
    lastNames = data[24][3];
    loadText(context, firstNames, lastNames);
}
