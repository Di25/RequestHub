$(document).ready(function () {
    var count = 1;

    $(document).on('click', '.add-product', function (e) {
        e.preventDefault();

        count++;
        var product = $('<div>').attr('class', 'product');
        product.append($('<img>').attr({
            id: 'image-preview_' + count,
            src: '',
            style: 'max-width: 30%; height: auto;  display: none;'
        }));
        product.append($('<h3>').text('Товар ' + count));
        product.append($('<div>').attr('class', 'row')
            .append($('<div>').attr('class', 'col-lg-6')
                .append($('<div>').attr('class', 'form-group')
                    .append($('<label>').text('Название товара:'))
                    .append($('#product_1').clone().attr({
                        name: 'product_' + count,
                        id: 'product_' + count,
                        required: true
                    }))
                )
            )
            .append($('<div>').attr('class', 'col-lg-6')
                .append($('<div>').attr('class', 'form-group')
                    .append($('<label>').text('Количество:'))
                    .append($('<input>').attr({
                        type: 'number',
                        name: 'number_' + count,
                        id: 'number_' + count,
                        class: 'form-control',
                        required: true
                    }))
                )
                .append($('<label>').text('Образец продукта').attr({
                    for: 'image_' + count
                }))
                .append($('<input>').attr({
                    type: 'file',
                    name: 'image_' + count,
                    id: 'image_' + count,
                    class: 'form-control',
                    accept: '.jpg,.png',
                    required: true
                }))
            )
        );
        product.append($('<button>').attr({
            type: 'button',
            class: 'btn btn-danger delete-product'
        }).text('Удалить'));
        $('#product-list').append(product);
    });

    $(document).on('click', '.delete-product', function (e) {
        e.preventDefault();

        $(this).closest('.product').remove();
    });
    $(document).on('change', 'select[id^="product_"]', function () {
        var id = $(this).attr('id').split('_')[1];
        var selectedOption = $(this).find('option:selected');
        var imageUrl = selectedOption.data('image-url');
        if (imageUrl) {
            $('#image-preview_' + id).attr('src', imageUrl).css('display', 'block');
        } else {
            $('#image-preview_' + id).css('display', 'none');
        }
    });


    $(document).on('change', 'select, input[type=number]', function () {
        var total = 0;
        $('.product').each(function () {
            var price = parseFloat($(this).find('select option:selected').data('price'));
            var quantity = parseFloat($(this).find('input[type=number]').val());
            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });
        $('#total-price').text(total.toFixed(2) + ' руб.');
    });
});