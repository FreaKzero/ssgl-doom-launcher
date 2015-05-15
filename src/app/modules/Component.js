define(['jquery', 'mustache', 'evnt', 'Collection'],
    function($, mustache, evnt) {

        var genericComponent = function() {
            this.template = null;
            this.component = null;

            this.$comp = null;
            this.$message = evnt.getInstance();

            this.collection = null;
            this.mustachekey = 'component';

            this.init(this);
        };

        var prot = {
            init: function() {},

            events: function() {},

            isMounted: function() {},

            isSynced: function() {},

            setData: function(data, makeCollection) {

                if (typeof makeCollection === 'undefined' || makeCollection === true) {
                    this.collection = new Collection(data);
                } else {
                    this.collection = data;
                }

                return this;
            },

            destroy: function() {
                this.$comp.off();
                this.$comp.empty();
            },

            mustacheObject: function() {
                var obj = {};
                
                if (typeof this.collection.models !== 'undefined') {                    
                    this.mustachekey ? obj[this.mustachekey] = this.collection.models : obj = this.collection.models;
                } else {
                    this.mustachekey ? obj[this.mustachekey] = this.collection : obj = this.collection;
                }

                return obj;
            },

            mount: function(selector) {
                if (this.$comp === null) {
                    this.$comp = $(selector);
                }

                if (this.collection !== null) {
                    this.component = $(mustache.render(this.template, this.mustacheObject()));
                } else {
                    this.component = $(mustache.render(this.template));
                }


                this.$comp.html(this.component);
                this.events(this, this.collection);
                this.isMounted(this, this.collection);
            },

            fetchBinds: function() {
                var data = {};
                this.$comp.find('[data-bind]').each(function() {
                    data[$(this).data('bind')] = $(this).val();
                });

                return data;
            },

            //#TODO: Better Name
            execBinds: function(id) {
                var m = this.data.get(id);

                this.$comp.find('[data-bind]').each(function() {
                    $(this).val(m[$(this).data('bind')]);
                });

            },
            
            syncView: function() {
                this.component = $(mustache.render(this.template, this.mustacheObject()));
                this.$comp.html(this.component);
                this.isSynced(this, this.collection);
            },


        };

        function makeComponent(def) {
            genericComponent.prototype = $.extend({}, prot, def);
            return new genericComponent();
        }

        return makeComponent;

    });