Ext.define('TouchWolf.view.PlayerList', {
    requires: ['TouchWolf.view.PlayerEnrolListItem'],
    extend: 'Ext.dataview.DataView',
    xtype: 'playerlist',
    config: {
        useComponents: true,
        defaultType: 'playerenrollistitem',
        itemId: 'test',
        store: 'playerStore',
        listeners: {
            painted: function(l) {
                l.store = Ext.getStore('playerStore');
                l.store.load();
            }
        }
    }
});