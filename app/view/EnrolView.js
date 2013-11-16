Ext.define('TouchWolf.view.EnrolView', {
    extend: 'Ext.Container',
    xtype: 'enrolview',
    requires: [ 'TouchWolf.view.PlayerList' ],
    config: {items: [
        {
            xtype: 'toolbar',
            title: 'Players',

            docked: 'top',

            items: [
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    iconCls: 'add',
                    ui: 'plain',
                    listeners: {
                        tap: function (button, e, eOpts) {
                            var player = Ext.create('TouchWolf.model.Player', {
                                name: 'Player'
                            });
                            var store = Ext.getStore('playerStore');
                            store.data.add(player);
                            store.sync();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'trash',
                    ui: 'plain',
                    listeners: {
                        tap: function (button, e, eOpts) {
                            var store = Ext.getStore('playerStore');
                            store.clearData();
                            store.sync();
                            store.load();
                        }
                    }
                }

            ]
        }, {
            xtype: 'playerlist',
            flex: 1,
            height: '100%'
        }
    ]}
});