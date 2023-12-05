let savedUsername;
let savedPassword;
let confirmPassword;

$("#Rpassword").on('input', function () {
    var passwordLength = $("#Rpassword").val();
    if(passwordLength.length < 8){
        $("#confirmPassword").show();
    }
    else{
        $("#confirmPassword").hide();
    }
});

$("#signup").click(function(){
    if($("#Rpassword").val().length >= 8){
        if($("#cpassword").val() === $("#Rpassword").val()){
            var username = $("#Remail").val();
            var password = $("#cpassword").val();
            window.location.href = "./login.html?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
        }
        else {
            $("#passwordSame").show();
        }
    }
});

$(window).on('load', function () {
    if(this.document.title === 'Log in'){
        const urlParams = new URLSearchParams(window.location.search);
        savedUsername = urlParams.get('username');
        savedPassword = urlParams.get('password');
    }
});

$("#login").click(function(){
    var inputUsername = $("#email").val();
    var inputPassword = $("#password").val();
    if(inputUsername == savedUsername && inputPassword == savedPassword){
        window.location.href = "./home.html?login=true";
    }
    else{
        $(".incorrect").show();
    }
});

$(window).on('load', function () {
    if(this.document.title === 'Dashboard'){
        const urlParams = new URLSearchParams(window.location.search);
        const loginParam = urlParams.get('login');

        if (loginParam === 'true') {
            // Pengguna sedang login, lakukan perubahan di halaman home
            $(".right-header").html("<div>Logged In</div>")
        }
    }
});