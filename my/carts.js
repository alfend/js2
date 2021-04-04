
function getQty() {
    //вывод кол-ва добавленных товаров
    $.ajax({

        url: '/cart/getqty',
        type: 'GET',
        success: function (res) {
            document.getElementById("cart-qty").innerHTML = res;
        },

        error: function () {
            alert('error');
        }
    });
}

function getCart(){
    $.ajax({

        url: '/cart/show',

        type: 'GET',

        success: function (res) {

            //console.log(res);

            showCart(res);

        },

        error: function () {

            alert('error');

        }

    });

    //вывод кол-ва добавленных товаров
    getQty();
}



function showCart(cart){

    $('#cart .modal-body').html(cart);

    $('#cart').modal();
    getQty();
}

$('#cart .modal-body').on('click', '.del-item', function(){
    var id=$(this).data('id');
    $.ajax({

        url: '/cart/del-item',
        data: {id: id},
        type: 'GET',
        success: function (res) {
            showCart(res);
        },
        error: function () {
            alert('error!');
        }
    });
});



$('.cart').on('click',function(e){

    e.preventDefault();

    var id=$(this).data('id');

    $.ajax({

        url: '/cart/add',
        data: {id: id},
        type: 'GET',
        success: function (res) {
            showCart(res);
        },

        error: function () {
            alert('error');
        }
    });
    getQty();
} );



$('.mylist').on('click',function(e){

    e.preventDefault();

    var id=$(this).data('id');

    $.ajax({

        url: '/cart/add',

        data: {id: id},

        type: 'GET',

        success: function (res) {

            //console.log(res);

            showCart(res);

        },

        error: function () {

            alert('error');



        }





    });
    getQty();
} );



jQuery(document).ready(function(){

    jQuery(".menu_top .navbar-toggle").on("click", function(){

        if(jQuery(this).hasClass("active"))

        {

            jQuery(this).removeClass("active");

        }

        else

        {

            jQuery(this).addClass("active");

        }



    })

})