const Main = imports.ui.main
const PanelMenu = imports.ui.panelMenu
const PopupMenu = imports.ui.popupMenu
const St = imports.gi.St
const Lang = imports.lang
const Meta = imports.gi.Meta
const Shell = imports.gi.Shell
const Util = imports.misc.util

//1
function _varietyConfig() {
	Util.spawn(['variety', '--preferences'])
}

//2
function _varietyNext() {
	Util.spawn(['variety', '-n'])
}

//3
function _varietyPrevious() {
	Util.spawn(['variety', '-p'])
}

//4
function _varietyTrash() {
	Util.spawn(['variety', '-t'])
}

//5
function _varietyPause() {
	Util.spawn(['variety', '--pause'])
}

//6
function _varietyResume() {
	Util.spawn(['variety', '--resume'])
}

//7
function _varietyToggle() {
	Util.spawn(['variety', '--toggle-pause'])
}

//8
function _varietyHistory() {
	Util.spawn(['variety', '--history'])
}

//9
function _varietyDownloads() {
	Util.spawn(['variety', '--downloads'])
}

//10
function _varietySelector() {
	Util.spawn(['variety', '--selector'])
}

//11
function _varietyQuit() {
	Util.spawn(['variety', '-q'])
}

const VarietyButton = new Lang.Class({
    Name: "VarietyButton",
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent(null, "VarietyButton")

        // Icon
        this.icon = new St.Icon({
            style_class: 'variety-button'
        })
        this.actor.add_actor(this.icon)

    // Menu
    this.item1 = new PopupMenu.PopupMenuItem('Variety prefs')
    this.item2 = new PopupMenu.PopupMenuItem('Next Image...')
    this.item3 = new PopupMenu.PopupMenuItem('Previous image...')
    this.item4 = new PopupMenu.PopupMenuItem('Trash image...')
    this.item5 = new PopupMenu.PopupMenuItem('Pause')
    this.item6 = new PopupMenu.PopupMenuItem('Resume')
    this.item7 = new PopupMenu.PopupMenuItem('Toggle pause')
    this.item8 = new PopupMenu.PopupMenuItem('History')
    this.item9 = new PopupMenu.PopupMenuItem('Downloads')
    this.item10 = new PopupMenu.PopupMenuItem('Selector')
    this.item11 = new PopupMenu.PopupMenuItem('Quit Variety')

    this.item1.connect('activate', Lang.bind(this, _varietyConfig))
    this.item2.connect('activate', Lang.bind(this, _varietyNext))
    this.item3.connect('activate', Lang.bind(this, _varietyPrevious))
    this.item4.connect('activate', Lang.bind(this, _varietyTrash))
    this.item5.connect('activate', Lang.bind(this, _varietyPause))
    this.item6.connect('activate', Lang.bind(this, _varietyResume))
    this.item7.connect('activate', Lang.bind(this, _varietyToggle))
    this.item8.connect('activate', Lang.bind(this, _varietyHistory))
    this.item9.connect('activate', Lang.bind(this, _varietyDownloads))
    this.item10.connect('activate', Lang.bind(this,_varietySelector))
    this.item11.connect('activate', Lang.bind(this,_varietyQuit))

    this.menu.addMenuItem(this.item1)
    this.menu.addMenuItem(this.item2)
    this.menu.addMenuItem(this.item3)
    this.menu.addMenuItem(this.item4)
    this.menu.addMenuItem(this.item5)
    this.menu.addMenuItem(this.item6)
    this.menu.addMenuItem(this.item7)
    this.menu.addMenuItem(this.item8)
    this.menu.addMenuItem(this.item9)
    this.menu.addMenuItem(this.item10)
    this.menu.addMenuItem(this.item11)
    }
})

function init() {
}
 
function enable() {
	const activitiesButton = Main.panel.statusArea['activities']
	if (activitiesButton) {
		activitiesButton.container.hide()
	}

	let indicator = new VarietyButton()
	Main.panel.addToStatusArea('varietyButton', indicator, 0, 'right')

	// hide
	Main.panel.statusArea['varietyButton'].actor.visible = false

	// show
	Main.panel.statusArea['varietyButton'].actor.visible = true
}
 
function disable() {
	const activitiesButton = Main.panel.statusArea['activities']
	if (activitiesButton) {
		activitiesButton.container.show()
	}

	Main.panel.statusArea['varietyButton'].destroy()
}
