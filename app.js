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

Ext.application({
    name: 'HelloExt',
    launch: function() {
		userGrid = Ext.create('Ext.grid.Panel', {
			selType: 'cellmodel',
			plugins: [cellEditor],
			renderTo: Ext.getBody(),
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
					editor: combo
				},
				{
					text: 'Role 2',
					flex: 1,
					dataIndex: 'role2',
					editor: combo
				},
				{
					xtype: 'actioncolumn',
					width: 40,
					items: [{
						icon: 'path',
						handler: function(grid,rowIndex,colIndex) {
							alert('click');
						}
					}],
				}
			]
		});
		cellEditor.on({
			scope: this,
			afteredit: function(celleditor, changes, record, rowIndex) {
				console.log(changes.store.data.items);
				var storeData = [];
				for (var rowno = 0; rowno < changes.store.data.items.length; rowno++) {
					storeData.push(changes.store.data.items[rowno].data)
				}
				myLocalStore.set('wolves',storeData);
				return true;
			}
		});
    }
});
