
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
                    var rec = me.getData().record;
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
                    var rec = me.getData().record;
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
                    if (newValue !== null) {
                        var rec = me.getData().record;
                        rec.set('lover1',newValue);
                        var loverrecord = Ext.getStore('playerStore').findRecord('name',newValue);
                        if (loverrecord.get('lover1') !== rec.get('name')) {
                            Ext.getStore('playerStore').each(function(record) {
                                var checkname = record.get('name');
                                if ((checkname !== rec.get('name')) && (checkname !== newValue) && (record.get('lover1') !== null)) {
                                    record.set('lover1',null);
                                }
                            });
                            loverrecord.set('lover1',rec.get('name'));
                        }
                        Ext.getStore('playerStore').sync();
                    }
                }
            }
        },{
            xtype: 'selectfield',
            itemId: 'lover2',
            label: '&#x2764;2',
            flex: 10,
            options: [
                {text: 'Noone', value: 'Noone'}
            ],
            displayField: 'text',
            valueField: 'value',
            listeners: {
                'change': function(me,newValue,oldValue,eOpts) {
                    if (newValue !== null) {
                        var rec = me.getData().record;
                        rec.set('lover2',newValue);
                        var loverrecord = Ext.getStore('playerStore').findRecord('name',newValue);
                        if (loverrecord.get('lover2') !== rec.get('name')) {
                            Ext.getStore('playerStore').each(function(record) {
                                var checkname = record.get('name');
                                if ((checkname !== rec.get('name')) && (checkname !== newValue) && (record.get('lover2') !== null)) {
                                    record.set('lover2',null);
                                }
                            });
                            loverrecord.set('lover2',rec.get('name'));
                        }
                        Ext.getStore('playerStore').sync();
                    }
                }
            }
        }]
    },updateRecord: function(record) {
        var me = this;

        var data = me.down('#role1').getData();
        if (data == null) {
            data = {record : record}
        } else {
            data.record = record;
        }
        me.down('#textCmp').setHtml(record.get('name'));
        var role1field = me.down('#role1');
        if (role1field !== null) {
            if (role1field.getData !== data) {
                role1field.setData(data);
            }
            if (role1field.getValue() !== record.get('role1')) {
                role1field.setValue(record.get('role1'));
            }
        }
        var role2field = me.down('#role2');
        if (role2field !== null) {
            if (role2field.getData !== data) {
                role2field.setData(data);
            }
            if (role2field.getValue() !== record.get('role2')) {
                role2field.setValue(record.get('role2'));
            }
        }
        var store = Ext.getStore('playerStore');
        var lovers = [{text:'Noone',value:null}];
        store.each(function (item, index, length) {
            if (record.get('name') !== item.data.name) {
                lovers.push({text:item.data.name,value:item.data.name});
            }
        });
        var lover1field = me.down('#lover1');
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
        var lover2field = me.down('#lover2');
        if (lover2field !== null) {
            if (lover2field.getData !== data) {
                lover2field.setData(data);
            }
            if (lover2field.getValue() !== record.get('lover2')) {
                lover2field.setValue(record.get('lover2'));
            }
            if (lover2field.getOptions !== lovers) {
                lover2field.setOptions(lovers);
            }
        }

        me.callParent(arguments);
    }
});
