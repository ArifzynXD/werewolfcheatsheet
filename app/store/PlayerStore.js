Ext.define('TouchWolf.store.PlayerStore',{
    extend: 'Ext.data.Store',
    xtype: 'playerstore',
    requires: [ 'Ext.data.proxy.LocalStorage', 'TouchWolf.model.Player' ],
    config: {
        autoload: true,
        autosync: true,
        storeId: 'playerStore',
        model: 'TouchWolf.model.Player',

        proxy: {
            type: 'localstorage',
            id: 'touchwolfplayers'
        },
        listeners: {
            load: function() {
                console.log('loading players');
            }
        }
    }

});
