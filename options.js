$(function () {

    chrome.storage.sync.get('limit', function (budget) {
        if (budget.limit) {
            $('#limit').val(budget.limit)
        } else {
            $('#limit').val("0000")
        }
    });

    $('#saveLimit').click(function () {

        const val = $("#limit").val();
        if(val){
            chrome.storage.sync.set({ limit:val },function(){
                close();
            })
        }
        
    })
    
    $('#resetTotal').click(function () {
        
        chrome.storage.sync.set({ limit:0 })
        $("#limit").val(0)
        
    })

})