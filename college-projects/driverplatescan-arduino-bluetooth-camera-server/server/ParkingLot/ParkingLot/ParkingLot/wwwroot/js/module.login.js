/*
 * Author: luudinhit93
 * Create: 28/04/2020
 * LOGIN PROCESSCOR
 */
var loginPlugin = (function () {
    return {
        init: function () {
            this.eventListener();
        },
        eventListener: function () {

            //Login form
            $(document).off('submit', '#login_form');
            $(document).on('submit', '#login_form', function (e) {
                e.preventDefault();
                loginPlugin.loginAccount({
                    username: $('#username').val(),
                    password: $('#password').val()
                });
            });


        },
        loginAccount: function (userInput) {
            $('#spinner_layout').removeClass('hidden');
            $.ajax({
                type: "POST",
                url: "/Home/Login",
                data: userInput,
                dataType: 'json',
                success: function (res) {
                    $('#spinner_layout').addClass('hidden');
                    if (res.status === 'success') {
                        location.replace('/nhap-xuat-xe');
                    }
                    else {
                        alert(res.message);
                    }
                },
                error: function () {
                    $('#spinner_layout').addClass('hidden');
                    alert('Vui lòng kiểm tra kết nối internet!');
                }
            });
        }
    };
}());

$(document).ready(function () {
    loginPlugin.init();
});