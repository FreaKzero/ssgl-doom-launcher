define(['jquery', 'mustache'],
 function($, mustache) {


    function genID(){
        var d = new Date().getTime();
        var uuid = 'COMP-xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    var Component = function(template) {
        this.template = template;
        this.component = null;
        this.mountpoint = null;            
        this.data = null;
        this.id = genID();
    };

    var prot = {

        mount: function() {
            this.mountpoint.html(this.component);
        },

        destroy: function() {
            this.mountpoint.remove();
        },

        prepare: function(data, selector) {
            if (this.mountpoint === null) {                
                $(selector).html($('<div></div>').attr('id', this.id));
                this.mountpoint = $('#'+this.id);
            }

            this.data = data;
            this.component = $(mustache.render(this.template, {data:this.data.models}));
        },

        attachEvents: function(callback) {
            callback(this.mountpoint, this);
        },

        fetchBinds: function() {
            var data = {};
            this.mountpoint.find('[data-bind]').each(function() {
                data[$(this).data('bind')] = $(this).val();
            });

            return data;
        },

        execBinds: function(id) {
            var m = this.data.get(id);

            this.mountpoint.find('[data-bind]').each(function() {
                $(this).val(m[$(this).data('bind')]);
            });

        },
                
        syncView: function() {
            this.component = $(mustache.render(this.template, {data:this.data.models}));
            this.mount();
        }


    };

    Component.prototype = prot;
    
    return Component;

});