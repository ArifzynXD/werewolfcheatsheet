
Ext.define('TouchWolf.view.PlayerRoleListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button', 'Ext.field.Select'],
    xtype: 'playerrolelistitem',

    config: {
        padding: 0,
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: 0
        },
        items: [{
            xtype: 'label',
            flex: 3,
            html: 'name',
            itemId: 'textCmp',
            padding: 10
        },{
            xtype: 'selectfield',
            itemId: 'role1',
            flex: 8,
            options: [
                {text: 'Villager', value: 'Villager'},
                {text: 'Werewolf', value: 'Werewolf'},
                {text: 'Seer', value: 'Seer'},
                {text: 'Healer', value: 'Healer'},
                {text: 'Hunter', value: 'Hunter'},
                {text: 'Witch', value: 'Witch'},
                {text: 'Little Girl', value: 'Little Girl'},
                {text: 'Cupid', value: 'Cupid'}
            ],
            displayField: 'text',
            valueField: 'value',
            listeners: {
                'change': function(me,newValue,oldValue,eOpts) {
                        rec = me.getData().record;
                        rec.set('role1',newValue);
                        Ext.getStore('playerStore').sync();
                }
            }
        },{
            xtype: 'selectfield',
            itemId: 'role2',
            flex: 8,
            options: [
                {text: 'Villager', value: 'Villager'},
                {text: 'Werewolf', value: 'Werewolf'},
                {text: 'Seer', value: 'Seer'},
                {text: 'Healer', value: 'Healer'},
                {text: 'Hunter', value: 'Hunter'},
                {text: 'Witch', value: 'Witch'},
                {text: 'Little Girl', value: 'Little Girl'},
                {text: 'Cupid', value: 'Cupid'}
            ],
            displayField: 'text',
            valueField: 'value',
            listeners: {
                'change': function(me,newValue,oldValue,eOpts) {
                    rec = me.getData().record;
                    rec.set('role2',newValue);
                    Ext.getStore('playerStore').sync();
                }
            }
        },{
            xtype: 'selectfield',
            itemId: 'lover1',
            label: '&#x2764;1',
            flex: 10,
            options: [
                {text: 'Noone', value: 'Noone'}
            ],
            displayField: 'text',
            valueField: 'value',
            listeners: {
                'change': function(me,newValue,oldValue,eOpts) {
                    rec = me.getData().record;
                    rec.set('lover1',newValue);
                    Ext.getStore('playerStore').sync();
                }
            }
        }]
    },updateRecord: function(record) {
        me = this;

        data = me.down('#role1').getData();
        if (data == null) {
            data = {record : record}
        } else {
            data.record = record;
        }
        me.down('#textCmp').setHtml(record.get('name'));
        role1field = me.down('#role1');
        if (role1field !== null) {
            if (role1field.getData !== data) {
                role1field.setData(data);
            }
            if (role1field.getValue() !== record.get('role1')) {
                role1field.setValue(record.get('role1'));
            }
        }
        role2field = me.down('#role2');
        if (role2field !== null) {
            if (role2field.getData !== data) {
                role2field.setData(data);
            }
            if (role2field.getValue() !== record.get('role2')) {
                role2field.setValue(record.get('role2'));
            }
        }
        store = Ext.getStore('playerStore');
        lovers = [{text:'Noone',value:null}];
        store.each(function (item, index, length) {
            if (record.get('name') !== item.data.name) {
                lovers.push({text:item.data.name,value:item.data.name});
            }
        });
        lover1field = me.down('#lover1');
        if (lover1field !== null) {
            if (lover1field.getData !== data) {
                lover1field.setData(data);
            }
            if (lover1field.getValue() !== record.get('lover1')) {
                lover1field.setValue(record.get('lover1'));
            }
            if (lover1field.getOptions !== lovers) {
                lover1field.setOptions(lovers);
            }
        }

        me.callParent(arguments);
    }
});
