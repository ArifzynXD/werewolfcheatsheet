Ext.require('Ext.container.Viewport');
Ext.require('Ext.state.LocalStorageProvider');

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [ 'name', 'role1', 'role2', 'state', 'deaths', 'lover1', 'lover2' ]
});
myLocalStore = Ext.create('Ext.state.LocalStorageProvider');
gameState = myLocalStore.get('wolves');
if (gameState == null) {
	gameState = {running: false, night: 0, players:
	[
		{ name: 'Martyn', role1: 'Werewolf', role2: 'Villager', state: "Alive", deaths: 0, lover1: false, lover2: false },
		{ name: 'Jen', role1: 'Villager', role2: 'Villager', state: "Alive", deaths: 0, lover1: false, lover2: false },
		{ name: 'Helena', role1: 'Seer', role2: 'Villager', state: "Alive", deaths: 0, lover1: false, lover2: false },
		{ name: 'Paul', role1: 'Healer', role2: 'Villager', state: "Alive", deaths: 0, lover1: false, lover2: false }
	]}
}

var roleStore = Ext.create('Ext.data.ArrayStore',{
	fields: [ "role" ],
	data: [
		[ "Werewolf" ],
		[ "Villager" ],
		[ "Seer" ],
		[ "Healer" ],
		[ "Hunter" ],
		[ "Witch" ],
		[ "Little Girl" ],
		[ "Cupid" ],
		[ "Witch" ]
	]
});

var combo = Ext.create('Ext.form.ComboBox',{
	store: roleStore,
	valueField: "role",
	displayField: "role",
});

userStore = Ext.create('Ext.data.Store', {
    model: 'User',
    data: gameState.players,
    autosync: true,
});

var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
	clicksToEdit: 1
})

function addPlayer() {
	userStore.add({ name: 'Someone', role1: 'Villager', role2: 'Villager', state: "Alive", deaths: 0, lover1: false, lover2: false });
	saveState();
}

function saveState(changes) {
	if (arguments.length == 0) {
		iterateOver = userStore.data
	} else {
		iterateOver = changes.store.data
	}
	var storeData = [];
	for (var rowno = 0; rowno < iterateOver.items.length; rowno++) {
		storeData.push(iterateOver.items[rowno].data)
	}
	gameState.players = storeData;
	myLocalStore.set('wolves',gameState);
}

function updateInterface() {
	if (!gameState.running) {
		makeOnlyColumnsVisible(['Name','Remove'], userGrid);
		Ext.get('gamestatus').dom.innerHTML = 'Game not running';
		Ext.get('addplayer').show();
		Ext.get('gameprogress').dom.innerHTML = 'Start First Night';
	} else {
		Ext.get('gamestatus').dom.innerHTML = 'Game in progress';
		Ext.get('addplayer').hide();
		if (gameState.night == 0) {
			makeOnlyColumnsVisible(['Name','Role 1','Role 2'], userGrid);
			Ext.get('gameprogress').dom.innerHTML = 'Noted roles. Progress Night.';
		} else {
			makeOnlyColumnsVisible(['Name','State','Deaths','Role 1','Role 2','Kill'], userGrid);
			Ext.get('gameprogress').dom.innerHTML = 'Restart game';
		}
	}
}

function progressGame() {
	if (!gameState.running) {
		gameState.running = true;
	} else {
		switch (gameState.night) {
			case 0: //first night cometh
				gameState.night++;
			break;
			default: //any other night = restart
				gameState.night = 0;
				gameState.running = false;
				for (var i = 0; i < userStore.data.items.length; i++) {
					userStore.data.items[i].data.deaths = 0;
					userStore.data.items[i].data.state = 'Alive';
					userStore.data.items[i].data.lover1 = false;
					userStore.data.items[i].data.lover2 = false;
					userStore.data.items[i].data.role1 = 'Villager';
					userStore.data.items[i].data.role2 = 'Villager';
				}
		}
	}
	updateInterface();
	saveState();
}

function makeOnlyColumnsVisible(whichColumns, grid) {
	var columnIDs = [];
	columnEditors = [];
	for (i = 0; i < whichColumns.length; i++) {
		for (j = 0; j < grid.columns.length; j++) {
			if (grid.columns[j].text == whichColumns[i]) {
				columnIDs[i] = grid.columns[j].itemId;
			}
		}
	}
	for (i = 0; i < grid.columns.length; i++) {
		columnEditors[i] = grid.columns[i].editor;
		grid.columns[i].hide();
	}
	for (i = 0; i < columnIDs.length; i++) {
		grid.down('#'+columnIDs[i]).show();
	}
	for (i = 0; i < columnEditors.length; i++) {
		if (columnEditors[i] != null) {
			grid.columns[i].setEditor(columnEditors[i]);
		}
	}
}

Ext.application({
    name: 'HelloExt',
    launch: function() {
		var viewPort = Ext.create('Ext.container.Viewport', {
			items: [{
				region: 'north',
				html: '<p id="gamestatus">Game not running</p><p><a href="#" onclick="addPlayer();" id="addplayer">Add Player</a><br/><a href="#" id="gameprogress" onclick="progressGame();">Start First Night</a></p>',
				autoHeight: true,
				border: false,
				margins: '0 0 0 0'
			},{
				region: 'south',
				html: null,
				autoHeight: true,
				border: false,
				margins: '0 0 0 0'
			}
			]
		})
		userGrid = Ext.create('Ext.grid.Panel', {
			selType: 'cellmodel',
			plugins: [cellEditor],
			region: 'south',
			store: userStore,
			height: 200,
			title: 'Werewolf',
			columns: [
				{
					text: 'Name',
					flex: 1,
					sortable: false,
					hideable: false,
					dataIndex: 'name',
					editor: 'textfield',
					itemId: 'nameColumn'
				},
				{
					text: 'State',
					flex: 1,
					sortable: false,
					hideable: false,
					dataIndex: 'state',
					editor: 'textfield',
					itemId: 'stateColumn'
				},
				{
					text: 'Deaths',
					flex: 1,
					sortable: false,
					hideable: false,
					dataIndex: 'deaths',
					editor: 'textfield',
					itemId: 'deathsColumn'
				},
				{
					text: 'Role 1',
					flex: 1,
					dataIndex: 'role1',
					editor: combo,
					hideable: true,
					hidden: false,
					itemId: 'role1Column'
				},
				{
					text: 'Role 2',
					flex: 1,
					dataIndex: 'role2',
					editor: combo,
					hideable: true,
					hidden: false,
					itemId: 'role2Column'
				},
				{
					text: 'Kill',
					xtype: 'actioncolumn',
					width: 40,
					items: [{
						icon: 'path',
						handler: function(grid,rowIndex,colIndex) {
							alert('click');
						}
					}],
					hideable: true,
					hidden: false,
					itemId: 'killColumn'
				},
				{
					text: 'Remove',
					xtype: 'actioncolumn',
					width: 40,
					items: [{
						icon: 'path',
						handler: function(grid,rowIndex,colIndex) {
							userStore.removeAt(rowIndex);
							saveState();
						}
					}],
					itemId: 'removeColumn'
				}
			]
		});
		viewPort.add(userGrid);
		updateInterface();
		cellEditor.on({
			scope: this,
			afteredit: function(celleditor, changes, record, rowIndex) {
				saveState(changes);
				return true;
			}
		});
    }
});
