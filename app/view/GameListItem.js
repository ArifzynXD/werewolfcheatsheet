
Ext.define('TouchWolf.view.GameListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'gamelistitem',

    config: {
        padding: 2,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'label',
            padding: 5,
            flex: 10,
            text: 'name',
            itemId: 'textCmp'
        },{
            xtype: 'label',
            padding: 5,
            flex: 10,
            text: 'role1',
            itemId: 'role1'
        },{
            xtype: 'label',
            padding: 5,
            flex: 10,
            text: 'role2',
            itemId: 'role2'
        },{
            xtype: 'label',
            padding: 5,
            flex: 10,
            text: 'deadoralive',
            itemId: 'deadoralive'
        },{
            flex: 1,
            xtype: 'button',
            itemId: 'btn',
            text: 'Kill!',
            listeners: {
                tap: function (me) {
                    var record = me.getData().record;
                    if (record.get('status') == 'Dead') {
                        return false;
                    }
                    var currentdeaths = record.get('deaths');
                    currentdeaths++;
                    record.set('deaths',currentdeaths);
                    var deathsrequired = 1;
                    if ((record.get('role1') == 'Villager') && (record.get('role2') == 'Villager')) {
                        deathsrequired++;
                    }
                    if (currentdeaths >= deathsrequired) {
                        record.set('status', 'Dead');
                        var hunters = [];
                        if (record.get('role1') == 'Hunter' || record.get('role2') == 'Hunter') {
                            hunters.push(record.get('name'));
                        }
                        var deathmessage = record.get('name')+' has Died! ';
                        var lovername = record.get('lover1');
                        if (lovername !== null) {
                            deathmessage += lovername + ' dies of a broken heart! ';
                            var loverrecord = Ext.getStore('playerStore').findRecord('name',lovername);
                            if ((loverrecord.get('role1') == 'Hunter') || (loverrecord.get('role2') == 'Hunter')) {
                                hunters.push(lovername);
                            }
                            loverrecord.set('status', 'Dead');
                            loverrecord.set('deaths', 69);
                        }
                        var lovername = record.get('lover2');
                        if (lovername !== null) {
                            if (lovername !== null) {
                                deathmessage += lovername + ' dies of a broken heart! ';
                                var loverrecord = Ext.getStore('playerStore').findRecord('name',lovername);
                                if ((loverrecord.get('role1') == 'Hunter') || (loverrecord.get('role2') == 'Hunter')) {
                                    hunters.push(lovername);
                                }
                                loverrecord.set('status', 'Dead');
                                loverrecord.set('deaths', 69);
                            }
                        }
                        if (hunters.length > 0) {
                            Ext.iterate(hunters,function(value) {
                               deathmessage += value + ' raises their gun and shoots! '
                            });
                        }

                        Ext.Msg.alert('Death, Doom!',deathmessage);
                    } else {
                        Ext.Msg.alert('Boring!','Nothing happens');
                    }
                    Ext.getStore('playerStore').sync();
                }
            }
        }]
    },updateRecord: function(record) {
        var me = this;

        var data = me.down('#btn').getData();
        if (data == null) {
            data = {record : record}
        } else {
            data.record = record;
        }
        me.down('#textCmp').setHtml(record.get('name'));
        me.down('#btn').setData(data);
        me.down('#role1').setHtml(record.get('role1'));
        me.down('#role2').setHtml(record.get('role2'));
        var state = record.get('status');
        var deaths = record.get('deaths')
        me.down('#deadoralive').setHtml(state + ' ('+ deaths + ' deaths)');

        me.callParent(arguments);
    }
});
