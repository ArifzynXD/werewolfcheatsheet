Ext.define('TouchWolf.view.PlayerList', {
    requires: ['TouchWolf.view.PlayerListItem'],
    extend: 'Ext.dataview.DataView',
    xtype: 'playerlist',
    config: {/*
        itemTpl:
            Ext.create('Ext.Container',
                {
                    xyzzy: '{name}',
                    items: [
                    {
                        xtype: 'label',
                        html: '{name}',
                        docked: 'left'
                    },
                    {
                        xtype: 'button',
                        text: 'Remove',
                        flex: 1,
                        width: 100,
                        docked: 'right',
                        listeners: {
                            tap: function (b) {
                                lastbutton = b;
                            }
                        }
                    }
                ] }).element.dom.outerHTML,*/
        useComponents: true,
        defaultType: 'playerlistitem',
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