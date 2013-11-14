Ext.require('Ext.container.Viewport');
Ext.require('Ext.state.LocalStorageProvider');

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [ 'name', 'role1', 'role2' ]
});
myLocalStore = Ext.create('Ext.state.LocalStorageProvider');
var fetchedData = myLocalStore.get('wolves');
if (fetchedData == null) {
	fetchedData = [
        { name: 'Martyn', role1: 'Werewolf', role2: 'Villager', deaths: 0, lover1: false, lover2: false },
        { name: 'Jen', role1: 'Villager', role2: 'Villager', deaths: 0, lover1: false, lover2: false },
        { name: 'Helena', role1: 'Seer', role2: 'Villager', deaths: 0, lover1: false, lover2: false },
        { name: 'Paul', role1: 'Healer', role2: 'Villager', deaths: 0, lover1: false, lover2: false }
    ]
};

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

var userStore = Ext.create('Ext.data.Store', {
    model: 'User',
    data: fetchedData,
    autosync: true,
});

var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
	clicksToEdit: 1
})

function addPlayer() {
	userStore.add({ name: 'Someone', role1: 'Villager', role2: 'Villager', deaths: 0, lover1: false, lover2: false });
}

function saveState() {
	var storeData = [];
	for (var rowno = 0; rowno < changes.store.data.items.length; rowno++) {
		storeData.push(changes.store.data.items[rowno].data)
	}
	myLocalStore.set('wolves',storeData);
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
			width: 400,
			height: 200,
			title: 'Werewolf',
			columns: [
				{
					text: 'Name',
					width: 100,
					sortable: false,
					hideable: false,
					dataIndex: 'name',
					editor: 'textfield'
				},
				{
					text: 'Role 1',
					width: 150,
					dataIndex: 'role1',
					editor: combo,
					hidden: true
				},
				{
					text: 'Role 2',
					flex: 1,
					dataIndex: 'role2',
					editor: combo,
					hidden: true
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
					hidden: true
				},
				{
					text: 'Remove',
					xtype: 'actioncolumn',
					width: 40,
					items: [{
						icon: 'path',
						handler: function(grid,rowIndex,colIndex) {
							userStore.removeAt(rowIndex);
						}
					}],
				}
			]
		});
		viewPort.add(userGrid);
		cellEditor.on({
			scope: this,
			afteredit: function(celleditor, changes, record, rowIndex) {
				saveState();
				return true;
			}
		});
    }
});
