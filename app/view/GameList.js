Ext.define('TouchWolf.view.GameList', {
    requires: ['TouchWolf.view.GameListItem'],
    extend: 'Ext.dataview.DataView',
    xtype: 'gamelist',
    config: {
        useComponents: true,
        defaultType: 'gamelistitem',
        store: 'playerStore',
        listeners: {
            painted: function(l) {
                l.store = Ext.getStore('playerStore');
                l.store.load();
            }
        }
    }
});