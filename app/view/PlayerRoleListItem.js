
Ext.define('TouchWolf.view.PlayerRoleListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'playerrolelistitem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: 5
        },
        items: [{
            xtype: 'label',
            flex: 1,
            html: 'name',
            itemId: 'textCmp'
        },{
            xtype: 'button',
            itemId: 'btn',
            text: 'remove',
            listeners: {
                tap: function (me) {
                    Ext.getStore('playerStore').remove(me.getData().record);
                    Ext.getStore('playerStore').sync();
                }
            }
        }]
    },updateRecord: function(record) {
        me = this;

        data = me.down('#btn').getData();
        if (data == null) {
            data = {record : record}
        } else {
            data.record = record;
        }
        me.down('#textCmp').setHtml(record.get('name'));
        me.down('#textCmp').setData(data);
        me.down('#btn').setData(data);

        me.callParent(arguments);
    }
});
