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
           'jquery', 'uikit-nestable'],
    function(iwad,
             wad,
             settings,
             nodeUtils, $) {

        nodeUtils.loadSettings(function(data) {
            settings.setData(data, false).mount('#settingsmount');

            if (data.wadpath) {
                nodeUtils.getWads(data.wadpath).done(function(data) {
                    wad.setData(data, false).mount('#wadselector');
                    UIkit.nestable('.uk-nestable');
                });
            }

            if (data.iwadpath) {
                nodeUtils.getFiles(data.iwadpath).done(function(data) {
                    var md = {
                        selected: 'Select WAD',
                        result: null,
                        data: data
                    };

                    iwad.setData(md, false).mount('#iwadselector');
                });
            }
        });


        iwad.$message.on('iwad selected', function(selected) {
            $('#launch').prop('disabled', false).text('Launch ' + selected.iwad);
            $('#oblique').prop('disabled', false).text('Launch Random ' + selected.iwad + ' Episode');
        });

        settings.$message.on('save-settings', function(data) {
            nodeUtils.saveSettings(data);
            location.reload();
        });
        

        $('#oblique').on('click', function() {
            var oblique = nodeUtils.launchOblique();
            $('#LOADER').fadeIn('slow');

            oblique.on('exit', function(code) {
                $('#LOADER').fadeOut('fast');
                
                nodeUtils.launch(
                    iwad.getResult(),
                    wad.getResult(),
                    $('#gzDoom').val()
                );
            });
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