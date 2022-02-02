function control () {
    var selectedProductUser = localStorage.getItem("userid");
        if (selectedProductUser == null) {
            window.location ="index.html"
        }
}
