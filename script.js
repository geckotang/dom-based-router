$(function(){
    $('.panel').each(function(){
        var $global_back_btn = $(this).find('.mod-btn-back');
        var $global_page_name = $(this).find('.current-name');
        var domBasedRouter = new DomBasedRouter({
            root: $(this),
            routes: {
                '.': function(dbr){
                    //常に呼ばれる
                    console.log('---always---');
                    console.log('現在位置 : ', dbr.getCurrentPath());
                    console.log('現在のパネル : ', dbr.getCurrentPanel());
                    $global_page_name.html(dbr.getCurrentPath());
                },
                '^index$': function(dbr){
                    $global_back_btn.hide();
                },
                '^index/.*': function(dbr){
                    $global_back_btn.show();
                }
            }
        });
    });
});
