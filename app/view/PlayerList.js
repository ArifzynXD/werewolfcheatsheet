Ext.define('TouchWolf.view.PlayerList', {
    extend: 'Ext.dataview.List',
    xtype: 'playerlist',
    config: {
        itemTpl: '<div>{name}</div>',
        itemId: 'test',
        store: 'playerStore'

    }
});