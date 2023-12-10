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
            $(".right-header").html("<div>Logged In</div>");
            $(".left-header").append("<a>My Booking</a>")
        }
    }
});

$("#review-box").on('input', function () {
    if($("#review-box").val() != ''){
        $("#send-review").show();
    }
    else{
        $("#send-review").hide();
    }
});

let price;
let days;

function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
}

function checkSubTotal() {
    if($("#room-price").html() !== '-' && $("#totalDays").html() !== '-'){
        $("#sub-total").html("RP" + (price * days).toLocaleString('id-ID') + ",00-");
    }
}

let currentDate = new Date();

$(window).on('load', function(){
    if(this.document.title === "Confirmation"){
        var today = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + addLeadingZero(currentDate.getDate());
        $("#from-date").attr('min', today);
    }
});

$("#room-type").on('change', function(){
    var value = $(this).val();
    var priceElement = $("#room-price");
    if(value === "-"){
        price = 0;
        priceElement.html("-");
    }
    else if(value === "Single Room"){
        price = 800000;
    }
    else if(value === "Twin Room"){
        price = 1000000;
    }
    else if(value === "Deluxe"){
        price = 1500000;
    }
    else if(value === "Family"){
        price = 2000000;
    }

    priceElement.html("RP" + price.toLocaleString('id-ID') + ",00-");
    checkSubTotal();
});

$("#to-date").prop("disabled", true);

$("#from-date").on('change', function (){
    var selectedDay = new Date($(this).val());
    var check = $(this).val() === '';

    selectedDay.setDate(selectedDay.getDate() + 1);
    $("#to-date").attr('min', selectedDay.toISOString().split('T')[0]);
    $("#to-date").val('');
    $("#to-date").prop("disabled", check);
});

$("#to-date").on('change', function (){
    var from = new Date($("#from-date").val());
    var to = new Date($(this).val());

    days = to.getDate() - from.getDate();
    $("#totalDays").html(days + " Days");
    checkSubTotal();
});