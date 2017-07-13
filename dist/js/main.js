$(document).ready(function () {
    var isLoading = false;
    $('.js-find').on('click', function () {
        if (isLoading) return;

        isLoading = true;
        // $.get('http://demos.wonderkidstudio.com/sites/crud/api/index.php?/api/products')
        $.get('/res.json')
            .then(handler)
    });
    
    
    function handler(res) {
        setTimeout(function () {
            isLoading = false;
        }, 3000);
        let car = res.data.filter(function (item) {
            return item.id == 30
        })[0]
        $( function() {
            $("#pop").dialog({
                open: function(event, ui) {
                    var $pop = $(event.target);
                    $pop.find('h3').text(car.name);
                    $pop.find('.price').text(car.price + ' $');
                    $pop.find('.des').text(car.description);
                }
            });
        });
    }
})

