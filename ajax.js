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
            
            
            /********************************************** En este ajax hago la maquetacion de mi tabla  ******************************************************/
            url3 = base_url + "Inicio/desgloseCoach";
             $.ajax({
                        type: "POST",
                        url: url3,
                        dataType: "json",
                        data: { 'date1': date1, 'date2': date2 },
                        success: function(dataCoach) {
                            $("#table").empty();

                            dataCoach.forEach(coach => {
                                var tablacoach = "<tr>" +

                                    "<td>" + coach.nombre + "</td>" +
                                    "<td>" + coach.pago + "</td>" +
                                    "<td>" + coach.dato1 + "</td>" +
                                    "<td>" + coach.base + "</td>" +
                                    "<td>" + coach.total + "</td>" +
                                    "<td>" + coach.asistencia + "</td>" +
                                    "<td>" + coach.factor + "%" + "</td>" +
                                    "<td>" + coach.conexion + "</td>" +
                                    "<td>" + coach.horas + "%" + "</td>" +
                                    "<td>" + coach.porcentaje + "</td>" +
                                    "</tr>";

                                $("#table").append(tablacoach);

                            }); 
                            
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
