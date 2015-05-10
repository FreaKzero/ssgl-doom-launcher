define(['text!fixtures/MenuComponent.html', 'modules/Component', 'Collection'],
    function(tpl, Component) {

        var data = new Collection([{
                name: 'Peter Lustig',
                meta: 'someone',
                pic: 'stub.png',
                id: '0'
            }, {
                name: 'Bertran Sorttest',
                meta: 'someone too',
                pic: 'stub.png',
                id: '6'            
            }, {
                name: 'Sara Sauer',
                meta: 'someone too',
                pic: 'stub.png',
                id: '1'
            }, {
                name: 'Kater Karlo',
                meta: 'someone too',
                pic: 'stub.png',
                id: '2'
            }, {
                name: 'Mickey Mouse',
                meta: 'someone too',
                pic: 'stub.png',
                id: '3'
            }, {
                name: 'fufufufu!',
                meta: 'someone too',
                pic: 'stub.png',
                id: '4'
            },{
                name: 'Ashley Sorttest',
                meta: 'someone too',
                pic: 'stub.png',
                id: '5'
            }
        ]);

        var MenuComponent = new Component(tpl);    
        MenuComponent.prepare(data, 'body');
        
        data.on('change', function() {
            MenuComponent.syncView();
        });        
        
        MenuComponent.attachEvents(function($e, scope) {            
            $e.on('click', 'ul > li', function() {
                var id = $(this).data('id');
                scope.execBinds(id);
            });

            $e.on('click', '#add', function() {                
                var ob = scope.fetchBinds();
                ob.id = Math.floor(Math.random() * (666 - 10)) + 10;
                data.add(ob);
            });

            $e.on('click', '#del', function() {
                data.pop();
            });

            $e.on('click', '#sort_name', function() {
                data.sort('name');
            });

            $e.on('click', '#sort_id', function() {
                data.sort('id');
            });

        });


    return MenuComponent;
});