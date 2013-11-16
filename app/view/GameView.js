Ext.define('TouchWolf.view.GameView', {
    extend: 'Ext.Container',
    xtype: 'gameview',
    requires: [ 'TouchWolf.view.GameListItem', 'TouchWolf.view.GameList' ],
    config: {items: [{
        xtype: 'toolbar',
        title: 'Players',

        docked: 'top'},
         {
            xtype: 'gamelist',
            flex: 1,
            height: '100%'
        }
    ]}
});