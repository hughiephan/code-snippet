/*
 * Author: luudinhit93
 * Create: 28/04/2020
 * PLATE RECOGNIZATION PROCESSCOR
 */
var platePlugin = (function () {
    return {
        init: function () {
            this.eventListener();
        },
        eventListener: function () {
            //Mở kết nối tới socket
            var connection = new signalR.HubConnectionBuilder().withUrl("/notification").build();
            Object.defineProperty(WebSocket, 'OPEN', { value: 1 });

            //Lắng nghe xem có xe nào mới vào ko
            connection.on('ShowPlateIn', function (plate, plateImg, date) {
                //Set các giá trị vào giao diện
                console.log(plateImg);
                $('#plate_in').attr('src', "data:image/png;base64, " + plateImg);
                $('#plate_txt_in').val(plate);
                $('#time_in_parking').val(date);
            });

            //Lắng nghe xem có xe nào xuất bãi ko
            connection.on('ShowPlateOut', function (plateIn, plateInImg, plateOut, plateOutImg, dateIn, dateOut, totalHour, totalCost, isMatch) {
                //Set các giá trị vào giao diện
                $('#plates_img1').attr('src', "data:image/png;base64, " + plateInImg);
                $('#plate_out1').val(plateIn);
                $('#time_in1').val(dateIn);

                $('#plates_img2').attr('src', "data:image/png;base64, " + plateOutImg);
                $('#plate_out2').val(plateOut);
                $('#time_out1').val(dateOut);

                $('#total_hour').val(totalHour +' Giờ');
                $('#total_cost').val(totalCost);

                if (isMatch == 'Match') {
                    $('#plate_out1, #plate_out2').removeClass('warning');
                }
                else {
                    $('#plate_out1, #plate_out2').addClass('warning');
                }

            });

            connection.start()
                .then(function () {
                    //Kết nối socket
                    console.log('connection started');
                })
                .catch(error => {
                    console.error(error.message);
                });


        }

    };
}());

$(document).ready(function () {
    platePlugin.init();
});