$(document).ready(function () {

    $.ajaxSetup({
        cache: false
    });
    var arrFinal=[];
    function random() {
        var arrTemporal = []
        for (var i = 0; i < 9; i++) {
            arrTemporal[i] = i;
        }
        for (var i = 0; i < 9; i++) {
            arrFinal[i] = arrTemporal.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        }
        console.log(arrFinal);
        return arrFinal;
    }

    $.getJSON('data.json', function (data) {
        random();
        for(var i=0; i<9; i++){
            $.each(data, function (key, value) {
            if(arrFinal[i] == value.serial){
                $('#galeria').append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="' + value.imagen + '" alt="..."><div class="caption"><h3>'+value.producto+'</h3></div><div class="botonera"><a href="#" class="btn btn-primary botones" role="button">More about</a><a href="#" class="btn btn-default botones">Buy now for '+value.precio+'</a></div></div>');
            }
         
        });}
    });

    $('#search').keyup(function () {
        $('#result').html('');
        $('#state').val('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");

        $.getJSON('data.json', function (data) {
            $.each(data, function (key, value) {
                if (value.producto.search(expression) != -1 || value.categoria.search(expression) != -1) {
                    $('#result').append('<li class="list-group-item link-class"><img src="' + value.imagen + '" height="40" width="40" class="img-thumbnail" /> ' + value.producto + ' | <span class="text-muted">' + value.categoria + '</span></li>');
                }
            });
            if (searchField.length == 0) {
                $("#result").html('');
            }
        });

    });

    $('#result').on('click', 'li', function () {
            var click_text = $(this).text().split('|');
            $('#search').val($.trim(click_text[0]));
            $("#result").html('');
            $('#galeria').html('');
            var searchField = $('#search').val();
            var expression = new RegExp(searchField, "i");
            $.getJSON('data.json', function (data) {
                    $.each(data, function (key, value) {

                            if (value.producto.search(expression) != -1 || value.categoria.search(expression) != -1) {
                                if (value.serial != "cat") {
                                    $('#galeria').append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="' + value.imagen + '" alt="..."><div class="caption"><h3>'+value.producto+'</h3></div><div class="botonera"><a href="#" class="btn btn-primary botones" role="button">More about</a><a href="#" class="btn btn-default botones">Buy now for '+value.precio+'</a></div></div>');
                                }else {

                            }

                        }
                    });
            });
    });


});