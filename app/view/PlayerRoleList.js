/* If I could change the type of the items in the lists I wouldn't need this! */
Ext.define('TouchWolf.view.PlayerRoleList', {
    requires: ['TouchWolf.view.PlayerRoleListItem'],
    extend: 'Ext.dataview.DataView',
    xtype: 'playerrolelist',
    config: {
        useComponents: true,
        defaultType: 'playerrolelistitem',
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
