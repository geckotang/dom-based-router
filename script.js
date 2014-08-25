$(function(){
    $('.panel').each(function(){
        var $global_back_btn = $(this).find('.mod-btn-back');
        var $global_page_name = $(this).find('.current-name');
        var domBasedRouter = new DomBasedRouter({
            root: $(this),
            routes: {
                '.': function(currentPath, currentPanel){
                    //常に呼ばれる
                    console.log('---always---');
                    console.log(currentPath, currentPanel);
                    $global_page_name.html(currentPath);
                },
                '^index$': function(currentPath, currentPanel){
                    //indexの時のみ呼ばれる
                    console.log('---index page---');
                    $global_back_btn.hide();
                },
                '^index/.*': function(currentPath, currentPanel){
                    //index/*の時のみ呼ばれる
                    console.log('---index/* page---');
                    $global_back_btn.show();
                }
            }
        });
    });
});
