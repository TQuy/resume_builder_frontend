document.addEventListener('DOMContentLoaded', function() {
    let logout_btn = document.querySelector("#logout_btn");
    logout_btn.addEventListener('click', (function () {
        sessionStorage.clear();
    }))
})