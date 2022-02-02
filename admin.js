var selectedProductUser = localStorage.getItem("userid");
if (selectedProductUser == undefined) {
    window.location = "index.html"
}else {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    var modalHidden = document.getElementById("modalHidden")
    var image = "";
    var idShop = "";
    btn.onclick = function() {
    modal.style.display = "block";
    }
    span.onclick = function() {
    modal.style.display = "none";  
    }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    var carts = document.querySelectorAll('.add-cart');
    var cartNum = document.getElementById("span");
    var dbs = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

    dbs.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS SHOP (name ,price ,img, rowid integer primary key autoincrement)');
    })
    //var modalButton = document.querySelector(".modalButton")
    //modalButton.addEventListener("click", function() {
        function addProduct() {          
            console.log("click");    
            var productName = document.getElementById("productName").value;
            var productPrice = document.getElementById("productPrice").value;
            //var productImg = document.getElementById("productImg").value;
            if (productName == false) {
                alert("Please Enter Product Name")
            }else if (productPrice == false){
                alert("Please Enter Product Price")
            }else if (image == false){
                alert("Please Select Product Image")
            } else {
                dbs.transaction(function (tx) {             
                    tx.executeSql("INSERT INTO SHOP (name,price,img) VALUES (?,?,?)",[productName,productPrice,image], function(tx,result) {
                        //  var shopRow = document.createElement("tr");
                        //  var id = document.createElement("td");
                        //  var name = document.createElement("td");
                        //  var price = document.createElement("td");
                        //  var img = document.createElement("td");
                        //  id.textContent = result.insertId;
                        //  name.textContent = result.productName;
                        //  price.textContent = result.productPrice;
                        //  img.textContent = result.productImg;
                        //  shopRow.setAttribute("id","c"+result.insertId);
                        //  shopRow.appendChild(id);
                        //  shopRow.appendChild(name);
                        //  shopRow.appendChild(price);
                        //  shopRow.appendChild(img);            
                        //  document.getElementById("cont").appendChild(shopRow); 
                        document.getElementById("productName").value  = "";
                        document.getElementById("productPrice").value = "";
                        image = "";
                        loadProduct()
                        modal.style.display = "none";
                    });
                    // tx.executeSql("DROP TABLE SHOP",[],
                    // function(tx,results){console.log("Successfully Dropped")},
                    // function(tx,error){console.log("Could not delete")}
                    // );           
                });
            } 
        };

        function loadProduct() {
            document.getElementById("cont").innerHTML = "";
            dbs.transaction(function(tx) {
                tx.executeSql("SELECT * FROM SHOP", [], function (tx, result) {
                    var len = result.rows.length;
                    for (var i = 0; i < len; i++) {  
                            idShop = "id-" +i;

                            var container = document.getElementById("cont");
                                container.classList.add("container");
                            var imageW = document.createElement("div");
                                imageW.classList.add("image");
                            var img = document.createElement("img");
                                img.setAttribute("width", "250");
                                img.setAttribute("height", "250");
                            var name = document.createElement("h3");
                                name.classList.add("crops");
                            var price = document.createElement("h3");
                                price.classList.add("crops");
                            var gold = document.createElement("img")
                            var deleteShop = document.createElement("img")  

                            imageW.setAttribute("id",idShop);
                            img.setAttribute("src", result.rows.item(i).img);
                            gold.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");
                            name.innerHTML = result.rows.item(i).name;
                            price.innerHTML = result.rows.item(i).price;
                            deleteShop.setAttribute("src","file:///Users/tayyip/Downloads/OOjs_UI_icon_trash-destructive.svg")
                            deleteShop.setAttribute("class","deleteShop") 
                            deleteShop.setAttribute("id",idShop);                       
                            let delShop = result.rows.item(i).rowid
                            deleteShop.addEventListener("click",function(e){deleteS(e,delShop)},false);
                            
                            imageW.appendChild(img);
                            imageW.appendChild(name);
                            imageW.appendChild(price);
                            price.appendChild(gold); 
                            imageW.appendChild(deleteShop);                                             
                                //imageW.appendChild(imageW);
                            document.getElementById("cont").appendChild(imageW);
                                //var shopRow = document.createElement("tr");
                                //var container = document.getElementById("cont");
                                //container.classList.add("container")
                                //var id = document.createElement("td");
                                //var name = document.getElementById("h3Id");
                                //name.classList.add("crops");
                                //var price = document.getElementById("h3");
                                //price.classList.add("crops")
                                //var img = document.getElementById("imgId");
                                //img.setAttribute("src", result.rows.item(i).img);
                                //img.classList.add("image")
                                //var imageId = document.getElementById("imageId")                               
                                //id = result.rows.item(i).id;
                                //name.textContent = result.rows.item(i).name;
                                //price.textContent = result.rows.item(i).price;
                                //img = result.rows.item(i).img;                            
                                //container.setAttribute("id","c"+result.rows.item(i).id);
                                //container.appendChild(name);
                                //container.appendChild(price);
                                //container.appendChild(img);
                                //document.getElementById("cont").appendChild(container);
                                //var x = document.createElement("IMG");
                                //x.setAttribute("src", result.rows.item(i).img);
                                //x.setAttribute("width", "250");
                                //x.setAttribute("height", "250");                                
                                //img.appendChild(x);
                                //img.textContent = result.rows.item(i).img;
                                //shopRow.setAttribute("id","c"+result.rows.item(i).id);
                                //shopRow.appendChild(id);
                                //shopRow.appendChild(name);
                                //shopRow.appendChild(price);
                                //shopRow.appendChild(img);
                                //document.getElementById("cont").appendChild(shopRow);
                    }
                })
            })
        }
        window.addEventListener("load", loadProduct, true);  
                                // var corn = document.getElementsByClassName("add-cart cart1");
                                // var eggplant = document.getElementsByClassName("add-cart cart2");
                                // var grape = document.getElementsByClassName("add-cart cart3");
                                // var melon = document.getElementsByClassName("add-cart cart4");
                                // var products = [ 
                                //     {
                                //         name: "Corn ",
                                //         tag: "corn",
                                //         price: 15,
                                //         inCart: 0
                                //     },
                                //     {
                                //         name: "Eggplant",
                                //         tag: "eggplant",
                                //         price: 20,
                                //         inCart: 0
                                //     },
                                //     {
                                //         name: "Grape",
                                //         tag: "grape",
                                //         price: 15,
                                //         inCart: 0
                                //     },
                                //     {
                                //         name: "Melon",
                                //         tag: "melon",
                                //         price: 20,
                                //         inCart: 0
                                //     }
                                // ];
            for (var i=0; i< carts.length; i++) {
                carts[i].addEventListener('click', () => {                
                var span = cartNum.innerHTML
                span = parseInt(span) +1;
                cartNum.innerHTML = span
                })   
            }
            function encodeImage(element) {
                var file = element.files[0];
                toBase64(file).then(resolve =>{
                        image = resolve
                    // dbs.transaction(function (tx) {
                    //   tx.executeSql("INSERT INTO SHOP (img) VALUES(?)", [resolve])
                    // })
                })
            }           
            function toBase64(file){
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }
            function deleteS(e,param) {
                dbs.transaction(function(tx) {
                    tx.executeSql("SELECT rowid FROM SHOP WHERE rowid=?", [param], function(tx,info) {
                    var productInfo = info.rows;
                    var selectedProductRowid = productInfo[0].rowid;
                    var eventTarget = e.target.id;
                        dbs.transaction(function(tx) {
                            tx.executeSql("DELETE FROM SHOP WHERE rowid=?",[selectedProductRowid], function(x,result) {
                                document.getElementById(eventTarget).innerHTML = "";
                            })
                        })                   
                    })
                })
                dbs.transaction(function(tx) {
                    tx.executeSql("SELECT rowid FROM CART WHERE rowid=?", [param], function(tx,info) {
                    var productInfo = info.rows;
                    var selectedProductRowid = productInfo[0].rowid;
                    var eventTarget = e.target.id;
                        dbs.transaction(function(tx) {
                            tx.executeSql("DELETE FROM CART WHERE rowid=?",[selectedProductRowid], function(x,result) {
                                document.getElementById(eventTarget).innerHTML = "";
                            })
                        })                    
                    })
                })
            }

}
