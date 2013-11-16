Ext.define('TouchWolf.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Label',
        'TouchWolf.view.EnrolView',
        'TouchWolf.view.RolesView',
        'TouchWolf.view.GameView'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Boring!'
                    },
                    {
                        docked: 'top',
                        xtype: 'list',
                        title: 'people',
                        store: {
                            xtype: 'playerstore'
                        },
                        itemTpl: '<div class="contact">{name}</div>'
                    },
                    {
                        docked: 'top',
                        xtype: 'label',
                        html: 'This is the boring welcome screen, have a look at the second page to get the game underway!'
                    },
                    {
                        docked: 'top',
                        xtype: 'label',
                        html: 'There are a few extras here we can use though.'
                    },
                    {
                        docked: 'top',
                        xtype: 'button',
                        text: 'Clear Players List'
                    }
                ],

                html: [
                    "This is the boring welcome screen, have a look at the second page to get the game underway!"
                ].join("")
            },
            {
                title: 'Enrol',
                iconCls: 'add',
                xtype: 'enrolview'
            },
            {
                title: 'Roles',
                iconCls: 'compose',
                xtype: 'rolesview'
            },
            {
                title: 'Play!',
                iconCls: 'star',
                xtype: 'gameview'
            }

        ]
    }
});
