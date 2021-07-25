$(function () {

    chrome.storage.sync.get(['total','limit'], function (budget) {
        if (budget.total) {
            $('#total').text(budget.total)
        } else {
            $('#total').text("0")
        }

        if (budget.limit) {
            $('#limit').text(budget.limit)
        } else {
            $('#limit').text("0")
        }
    });

    $('#spendAmount').click(function () {
        var subTotal = 0;
        chrome.storage.sync.get(['total','limit'], function (stored) {
            if (stored.total) {
                subTotal = parseInt(stored.total);
            }

            const limit = parseInt($('#limit').text());
            const amount = parseInt($('#amount').val());

            if (amount > 0 && amount <= limit ) {

                var total = subTotal + amount;
                
                chrome.storage.sync.set({ total:total })
                chrome.storage.sync.set({ limit:(limit - amount) })

                $("#total").text(total)
                $('#amount').val("");
                $("#limit").text(limit - amount);

            }
            else{
                
            const notificationOptions = {
                type:'basic',
                iconUrl:'icon48.png',
                title:'Limit Reached',
                message:"You have reached your limit, please spend amount according to your limit"
            }    
                
            chrome.notifications.create('limitNotification',notificationOptions);
            }

        })
    })  
    // $('#name').keyup(function(){
    //     $('#greet').text('Hello  ' + $('#name').val()); 
    // })

})