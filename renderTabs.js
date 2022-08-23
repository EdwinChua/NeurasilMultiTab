
const { app, session } = require('electron')
const TabGroup = require('electron-tabs');

const imageDirectory = 'file://' + __dirname + '/assets/images/';
console.log(imageDirectory)

let tabdata = require(__dirname + '/tabdata.json');

let tabGroup = new TabGroup({
    newTab: {
        title: 'New Tab'
    }
});

let tabs = [];

for (var i in tabdata) {
    let tab = {
        title: tabdata[i].title,
        src: tabdata[i].src,
        iconURL: imageDirectory + tabdata[i].iconFileName,
        active: i == 0,
        visible: true,
        closable: false
    }
    tabGroup.addTab(tab);
}

// tabGroup.addTab({
//     title:"Test",
//     src: 'file://' + __dirname + '/test.html',
//     ready : (tab) => {
//         tab.webview.session.
//     }
// })