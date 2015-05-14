var gui = require('nw.gui');
gui.App.clearCache();

requirejs.config({
    baseUrl: 'app/',
    paths: {

        // Require Plugins
        'text': 'plugins/text',

        // Configs
        'cfg': 'config/config',

        // jquery
        'jquery': 'lib/jquery.min',
        'uikit': 'lib/uikit/uikit.min',
        'uikit-nestable': 'lib/uikit/components/nestable',

        'Collection': 'lib/Collection',
        'mustache': 'lib/mustache.min',

        'sys': 'modules/System',
        'evnt': 'modules/Evnt',

        'Component': 'modules/Component',
        'nodeUtils': 'modules/nodeUtils',

        shim: {
            'Collection': {
                exports: 'Collection'
            },

            'uikit': {
                deps: ['jquery'],
                exports: 'UIkit'
            },

            'uikit-nestable': {
                deps: ['jquery', 'uikit']
            }
        }
    }
});

requirejs(['components/iWadSelector',
        'components/WadSelector',
        'components/SettingsModal',
        'nodeUtils',
        'jquery', 'uikit-nestable'
    ],
    function(iwad,
        wad,
        settingsComponent,
        nodeUtils, $) {

        nodeUtils.loadSettings(function(settings) {
            settingsComponent.setData(settings, false).mount('#settingsmount');

            if (settings.wadpath) {
                nodeUtils.getWads(settings.wadpath).done(function(data) {
                    wad.setData(data, false).mount('#wadselector');
                    UIkit.nestable('.uk-nestable');
                });
            }

            if (settings.iwadpath) {
                nodeUtils.getFiles(settings.iwadpath).done(function(data) {
                    var md = {
                        selected: 'Select WAD',
                        result: null,
                        data: data
                    };

                    iwad.setData(md, false).mount('#iwadselector');
                });
            }

            $('#oblige').on('click', function() {
                            
                var oblige = nodeUtils.launchOblige(settings.obligepath, settings.obligeconfigpath, settings.randmappath);
                console.log(oblige)

                $('#LOADER').fadeIn('slow');

                oblige.on('exit', function(code) {
                    $('#LOADER').fadeOut('fast');

                    nodeUtils.launch(
                        iwad.getResult(),
                        wad.getResult(),
                        $('#gzDoom').val()
                    );
                });
            });

        });


        iwad.$message.on('iwad selected', function(selected) {
            $('#launch').prop('disabled', false).text('Launch ' + selected.iwad);
            $('#oblige').prop('disabled', false).text('Launch Random ' + selected.iwad + ' Episode');
        });

        settingsComponent.$message.on('save-settings', function(data) {
            var error = nodeUtils.settingsHasErrors(data);

            if (error) {                
                settingsComponent.$message.emit('highlightErrors', error);

            } else {
                nodeUtils.saveSettings(data);
                location.reload();
            }            
        });


        // todo - check if wad is selected
        $('#launch').on('click', function() {
            nodeUtils.launch(
                iwad.getResult(),
                wad.getResult(),
                $('#gzDoom').val()
            );
        });

    });