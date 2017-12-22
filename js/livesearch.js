$(document).ready(function () {
    var changeView = false;

    $.ajaxSetup({
        cache: false
    });
    var arrFinal = [];

    function random() {
        var arrTemporal = [];
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
        for (var i = 0; i < 9; i++) {
            $.each(data, function (key, value) {
                if (arrFinal[i] == value.serial) {
                    $('#galeria').append('<div class="col-sm-6 col-md-4"><div class="thumbnail zoom"><img class="img-responsive" src="' + value.imagen + '" alt="..."><div class="caption"><h3>' + value.producto + '</h3></div><div class="botonera"><button id="' + value.serial + '" class="btn btn-primary botones botonMas">Ver más</button><a href="#" class="btn btn-default botones">Comprar ahora por ' + value.precio + '</a></div></div>');
                    if (value.producto.length < 30) {
                        $('.botonera').last().addClass('botoneraMasCorta');
                    }
                    if (value.rank == "new") {
                        $('.botonera').last().append('<span class="label label-primary botones">Nuevo</span>');
                    }
                    if (value.rank == "used") {
                        $('.botonera').last().append('<span class="label label-default botones">Usado</span>');
                    }

                }
            });
        }
        $(document).on("click", ".botonMas", function () {
            var botonApretado = $(this).attr('id');

            $.getJSON('data.json', function (data) {
                $.each(data, function (key, value) {
                    if (botonApretado == value.serial) {
                        $('#galeria').html('');
                        $('#galeria').append('<div class="col-md-6 col-sm-12"><div class="sliderBloque"><div id="myCarousel" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li><li data-target="#myCarousel" data-slide-to="1"></li><li data-target="#myCarousel" data-slide-to="2"></li></ol><div class="carousel-inner"><div class="item active"> <img src="' + value.imagen + '" alt="" class="img-responsive"></div><div class="item"><img src="' + value.imagen2 + '" alt=""></div><div class="item"> <img src="' + value.imagen3 + '" alt=""></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div></div>');
                        $('#galeria').append('<div class="col-md-6 col-sm-12"><div class="caption"><h3>' + value.producto + '</h3><p>'+value.descripcion+'</p><div class="botonera"><a href="#" class="btn btn-primary">Comprar ahora por ' + value.precio + '</a></div><select class="cantidad"></select></div></div></div></div></div>');
                        for(var i=0; i<=value.cantidad ;i++){
                        if (i==0){
                            $('.cantidad').append('<option class="text-center disabled">Cantidad</option>');
                        } else{
                        $('.cantidad').append('<option>'+i+'</option>');}}
                        if (value.rank == "new") {
                            $('.caption').last().append('<span class="label label-primary">Nuevo</span>');
                        }
                        if (value.rank == "used") {
                            $('.caption').last().append('<span class="label label-default">Usado</span>');
                        }
                       

                    }
                });
            });
        });
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
                        $('#galeria').append('<div class="col-sm-6 col-md-4"><div class="thumbnail zoom"><img class="" src="' + value.imagen + '" alt="..."><div class="caption"><h3>' + value.producto + '</h3></div><div class="botonera"><button id="' + value.serial + '" class="btn btn-primary botones botonMas">Ver más</button><a href="#" class="btn btn-default botones">Comprar ahora por ' + value.precio + '</a></div></div>');
                        if (value.producto.length < 30) {
                            $('.botonera').last().addClass('botoneraMasCorta');
                        }
                        if (value.rank == "new") {
                            $('.botonera').last().append('<span class="label label-primary botones">Nuevo</span>');
                        }
                        if (value.rank == "used") {
                            $('.botonera').last().append('<span class="label label-default botones">Usado</span>');
                        }
                    }
                }
            });
            $(document).on("click", ".botonMas", function () {
                var botonApretado = $(this).attr('id');

                $.getJSON('data.json', function (data) {
                    $.each(data, function (key, value) {
                        if (botonApretado == value.serial) {
                            $('#galeria').html('');
                            $('#galeria').append('<div class="col-md-6 col-sm-12"><div class="sliderBloque"><div id="myCarousel" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li><li data-target="#myCarousel" data-slide-to="1"></li><li data-target="#myCarousel" data-slide-to="2"></li></ol><div class="carousel-inner"><div class="item active"> <img src="' + value.imagen + '" alt=""></div><div class="item"><img src="' + value.imagen2 + '" alt=""></div><div class="item"> <img src="' + value.imagen3 + '" alt=""></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div></div>');
                            $('#galeria').append('<div class="col-md-6 col-sm-12"><div class="caption"><h3>' + value.producto + '</h3><p>'+value.descripcion+'</p><div class="botonera"><a href="#" class="btn btn-primary">Comprar ahora por ' + value.precio + '</a></div><select class="cantidad"></select></div></div></div></div></div>');
                            for(var i=0; i<=value.cantidad ;i++){
                            if (i==0){
                                $('.cantidad').append('<option class="text-center disabled">Cantidad</option>');
                            } else{
                            $('.cantidad').append('<option>'+i+'</option>');}}
                            if (value.rank == "new") {
                                $('.caption').last().append('<span class="label label-primary">Nuevo</span>');
                            }
                            if (value.rank == "used") {
                                $('.caption').last().append('<span class="label label-default">Usado</span>');
                            }
                           

                        }
                    });
                });
            });
        });
    });
});