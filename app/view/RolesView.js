Ext.define('TouchWolf.view.RolesView', {
    extend: 'Ext.Container',
    xtype: 'rolesview',
    requires: [ 'TouchWolf.view.PlayerRoleListItem', 'TouchWolf.view.PlayerRoleList' ],
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
                    iconCls: 'delete',
                    ui: 'plain',
                    listeners: {
                        tap: function (button, e, eOpts) {
                            var store = Ext.getStore('playerStore');
                            Ext.iterate(store.data,function(key,value) {
                                record = store.getAt(value);
                                record.set('role1','Villager');
                                record.set('role2','Villager');
                                record.set('lover1',null);
                                record.set('lover2',null);
                                record.set('deaths',0);
                                record.set('status','Alive');
                            })
                            store.sync();
                            store.load();
                        }
                    }
                }

            ]
        }, {
            xtype: 'playerrolelist',
            flex: 1,
            height: '100%',
            config: {
                defaulttype: 'playerrolelistitem'
            }
        }
    ]}
});