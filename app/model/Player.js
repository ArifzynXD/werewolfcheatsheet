Ext.define('TouchWolf.model.Player', {
    extend: 'Ext.data.Model',
    xtype: 'player',
    config: {
        fields: [{
            name: 'name', type: 'string'
        },{
            name: 'role1', type: 'string'
        },{
            name: 'role2', type: 'string'
        },{
            name: 'lover1', type: 'string'
        },{
            name: 'lover2', type: 'string'
        },{
            name: 'deaths', type: 'int'
        },{
            name: 'status', type: 'string'
        }]
    }
});