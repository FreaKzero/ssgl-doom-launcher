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

        // uikit
        'uikit': 'lib/uikit/uikit.min',
        'uikit-nestable': 'lib/uikit/components/nestable',
        'uikit-notify': 'lib/uikit/components/notify',

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
            },

            'uikit-notify': {
                deps: ['jquery', 'uikit']
            }

        }
    }
});

requirejs(['components/iWadSelector',
        'components/WadSelector',
        'components/SettingsModal',
        'components/ObligeDialog',
        'nodeUtils',
        'jquery', 'uikit-nestable', 'uikit-notify'
    ],
    function(dropdown,
        wad,
        settingsComponent,
        obligeDialog,
        nodeUtils, $) {

        var iwad = dropdown();

        nodeUtils.loadSettings(function(settings) {

            if (settings.error) {
                $('#LOADER').show();
                settingsComponent.setData({}, false).mount('#settingsmount');
                var modal = UIkit.modal('#settings-modal').show();

            } else {

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

                if (settings.activateoblige === true) {

                    nodeUtils.getFiles(settings.obligeconfigpath).done(function(data) {

                        var md = {
                            selected: 'Select Oblige Config',
                            result: null,
                            data: data
                        };

                        obligeDialog.setData(md, false).mount('#obligemount');
                    });
                }

                obligeDialog.$message.on('launch-oblige', function(config) {
                    UIkit.modal('#oblige-dialog').hide();
                    var oblige = nodeUtils.launchOblige(settings.obligepath, config, settings.randmappath);
                    $('#LOADER').fadeIn('slow');

                    oblige.on('exit', function(code) {
                        $('#LOADER').fadeOut();

                        nodeUtils.launch(
                            iwad.getResult(),
                            wad.getResult(),
                            $('#gzDoom').val(),
                            settings.randmappath
                        );
                    });
                });
            }
        });


        iwad.$message.on('iwad selected', function(selected) {
            $('#launch').prop('disabled', false).text('Launch ' + selected.iwad);
            $('#oblige').prop('disabled', false).text('Oblige build and play ' + selected.iwad);
        });

        settingsComponent.$message.on('save-settings', function(data) {
            var error = nodeUtils.settingsHasErrors(data);

            if (error) {
                settingsComponent.$message.emit('highlightErrors', error);

                UIkit.notify({
                    message: 'Errors occured, config not saved',
                    status: 'danger',
                    timeout: 2000,
                    pos: 'bottom-center'
                });


            } else {
                nodeUtils.saveSettings(data);

                UIkit.notify({
                    message: 'Config saved successfully, restarting ...',
                    status: 'success',
                    timeout: 2000,
                    pos: 'bottom-center'
                });

                setTimeout(function() {
                    location.reload();
                }, 2000);

            }
        });

        $('#reload').on('click', function() {
            $(this).children().addClass('uk-icon-spin');
            setTimeout(function() {
                location.reload();
            }, 1000);
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