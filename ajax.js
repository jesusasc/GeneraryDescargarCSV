$(document).ready(function() {
    $('#btnEnviar').click(function() {
        /* ********************** SweetAlert *********************** */
        Swal.fire({
            title: "Ingrese rango de fechas ",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,

            showDenyButton: true,
            denyButtonText: "Cancelar",

            html: '<input type="date" id="Date1" class="flex-nowrap w-50 swal2-input">' +
                '<input type="date" id="Date2" class="flex-nowrap w-50 swal2-input">',

        }).then(function(isConfirm) {
            var date1 = $('#Date1').val();
            var date2 = $('#Date2').val();
            /************************quiero obtner este ajax para descargar el excel **************************** */
            urlexcel = base_url + "Inicio/generarCSV";
            $.ajax({
                type: "POST",
                url: urlexcel,
                data: { 'date1': date1, 'date2': date2 },
                cache: false,
                success: function(data) {
                    $('#excel').append(data);
                }
            })
        });
    }); // cierre de llave y parentesis de #btnEnviar


});