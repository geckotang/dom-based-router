(function(window, undefined){

    var DomBasedRouter = function(option){
        this.option = {
            root: option.root || $('body'),
            rootPath: option.rootPath || 'index',
            defaultPath: option.defaultPath || 'index',
            routes: option.routes || {}
        };
        this.allPanel = this.option.root.find('[data-panel-id]');
        this._setCurrentPath(this.option.rootPath);
        this._eventify();
        this._hideAll();
        this.navigate(this.option.defaultPath);
    };

    // 現在表示している page-id を返す
    DomBasedRouter.prototype.getCurrentPath = function(){
        var that = this;
        return that.currentPath;
    };

    // 現在位置をセットする
    DomBasedRouter.prototype._setCurrentPath = function(path){
        var that = this;
        that.currentPath = path;
    };

    // 現在表示しているパネルを返す
    DomBasedRouter.prototype.getCurrentPanel = function(){
        var that = this;
        var currentPath = that.getCurrentPath();
        return that.allPanel.filter('[data-panel-id="'+currentPath+'"]');
    };

    // 現在表示しているパネルを非表示にし、指定したパネルを表示する
    DomBasedRouter.prototype.navigate = function(path){
        var that = this;
        var nextPath = path;
        var currentPath = that.getCurrentPath();
        var currentPathArray = currentPath.split('/');

        //もし ../ であれば一階層上がる
        if (/\.\.\//.test(nextPath)) {
            //1階層上がる
            console.log(currentPathArray);
            if (currentPathArray.length === 1) {
                nextPath = that.option.rootPath;
            } else {
                currentPathArray.pop();
                nextPath = currentPathArray.join('/');
            }
        }

        that._hide(currentPath);
        that._show(nextPath);
        that._setCurrentPath(nextPath);
        that._router(nextPath);
    };

    //パネルが表示された時のpathが
    //option.routesで指定したキーにマッチすると、その内容が実行される
    DomBasedRouter.prototype._router = function(path){
        var that = this;
        var currentPath = that.getCurrentPath();
        var currentPanel = that.getCurrentPanel();
        var routes = that.option.routes;
        for (var route in routes) {
            if (routes.hasOwnProperty(route)) {
                var match = path.match(route);
                match && routes[route](currentPath, currentPanel);
            }
        }
    };

    //指定したpathを持つパネルを表示する
    DomBasedRouter.prototype._show = function(path){
        this.allPanel.filter('[data-panel-id="'+path+'"]').show();
    };

    //指定したpathを持つパネルを非表示する
    DomBasedRouter.prototype._hide = function(path){
        this.allPanel.filter('[data-panel-id="'+path+'"]').hide();
    };

    //すべてのパネルを非表示にする
    DomBasedRouter.prototype._hideAll = function(){
        this.allPanel.hide();
    };

    //戻るボタンと移動するボタンにイベントを貼る
    DomBasedRouter.prototype._eventify = function(){
        var that = this;
        var btn_back = that.option.root.find('[data-panel-back]');
        var btn_move = that.option.root.find('[data-panel-href]');
        btn_back.on('click', function(){
            that.navigate('../');
        });
        btn_move.on('click', function(){
            var href = $(this).attr('data-panel-href');
            that.navigate(href);
        });
    };

    window['DomBasedRouter'] = DomBasedRouter;

}(window));
