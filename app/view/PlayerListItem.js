
Ext.define('TouchWolf.view.PlayerListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'playerlistitem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: 5
        },
        items: [{
            xtype: 'button',
            itemId: 'btn',
            text: 'remove',
            listeners: {
                tap: function (me) {
                    Ext.getStore('playerStore').remove(me.getData().record);
                    Ext.getStore('playerStore').sync();
                }
            }
        }, {
            xtype: 'button',
            flex: 1,
            text: 'name',
            itemId: 'textCmp',
            listeners: {
                tap: function (me) {
                    Ext.Msg.prompt('Name', 'Please enter new name', function(button,text) {
                        me.getData().record.set('name',text);
                        Ext.getStore('playerStore').sync();
                    },null,false,me.text);
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
