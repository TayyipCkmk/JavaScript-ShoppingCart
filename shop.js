var selectedProductUser = localStorage.getItem("userid");
if (selectedProductUser == undefined) {
    window.location ="index.html"
}else {
    var carts = document.querySelectorAll(".addBtn");
    var dbs = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var dbc = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var selectedProducktInCart = 1;
    var prdoductArray =  [];
    var script = document.createElement("script");
        script.src = "loginControl.js"
        document.head.appendChild(script);

        function loadProduct() {
            document.getElementById("cont").innerHTML = "";
            dbs.transaction(function(tx) {
                tx.executeSql("SELECT name,price,rowid,img FROM SHOP", [], function (tx, result) {
                    var len = result.rows.length;
                    for (var i = 0; i < len; i++) {                                                         
                        var container = document.getElementById("cont");
                            container.classList.add("container");
                            var id=document.createElement("td");
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
                            var addButton = document.createElement("button")
                                addButton.classList.add("addBtn")
                            
                            id.textContent= result.rows.item(i).id;    
                            img.setAttribute("src", result.rows.item(i).img);
                            console.log(result.rows.item(i).img)
                            
                            gold.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");
                            name.innerHTML = result.rows.item(i).name;
                            price.innerHTML = result.rows.item(i).price;
                            addButton.innerHTML = "Add" 
                            addButton.setAttribute("id", "but"+i)
                            let item = result.rows.item(i).rowid
                            addButton.addEventListener("click", function(){onAddCart(item)},false);
                                                    
                            imageW.appendChild(id);
                            imageW.appendChild(img);
                            imageW.appendChild(name);
                            imageW.appendChild(price);
                            price.appendChild(gold)
                            imageW.appendChild(addButton);
                                                    
                            document.getElementById("cont").appendChild(imageW);
                            //document.getElementById("but").addEventListener("click", function () {
                            //    console.log("clicked");
                            // })
                    }
                })
            })
        }
        window.addEventListener("load", loadProduct, true);      
                            // function cart() {
                            //         var selectedProductUser = localStorage.getItem("userid");
                            //         dbc.transaction(function(tx) {
                            //             tx.executeSql("SELECT incart FROM CART WHERE userid=? ",[selectedProductUser], function(x,result) {
                            //             console.log(result);                   
                            //             return result;
                            //             })                     
                            //         })                   
                            // }
    function onAddCart(param) {
        control();
        document.getElementById("span").innerHTML ++;
                            // console.log(param)
                            // let dgr = parseInt(cartNum.innerHTML);
                            // dgr++;
                            // cartNum.innerHTML = dgr;
        dbs.transaction(function(tx) {
            tx.executeSql("SELECT name,price,rowid,img FROM SHOP WHERE rowid=? ", [param], function(tx,info) {         
                            //  console.log(info.rows.length);
                            // var c = addButton.target;
                            // console.log(c);
                            // if (c) {
                            //var productInfo = Object.assign([],info.rows)
                            // var b = a.findIndex(item => item == param)
                            // console.log(b)
                            //  var selectedProduct = productInfo.splice(param-1,1)
                            //    console.log(selectedProduct);                                            
                            //  var selectedProductName = selectedProduct.map(item => item.name);
                            //  var selectedProductP = selectedProduct.map(item => item.price);
                            //  var selectedProductPrice = parseInt(selectedProductP);
                            //  var selectedProductRowid = selectedProduct.map(item => item.rowid);
                var productInfo = info.rows;
                var selectedProductName = productInfo[0].name;
                var selectedProductPrice = productInfo[0].price;
                var selectedProductRowid = productInfo[0].rowid;
                var selectedProductImg = productInfo[0].img;
                var selectedProductUser = localStorage.getItem("userid");
                        
                dbc.transaction(function(tx) {            
                    tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,rs){
                        var data = rs.rows.length;
                        var item = rs.rows[0];
                            // let dgr = parseInt(cartNum.innerHTML);
                            // cartNum.innerHTML = item.incart;
                            // console.log(data);"
                    if (data != 0) {
                        dbc.transaction(function(tx) {
                            tx.executeSql("UPDATE CART SET incart=? WHERE rowid=? AND userid=?",[item.incart+1, item.rowid, item.userid], function(x,result) {
                            // console.log(item.incart)
                            //  console.log(result.rows);
                            //return selectedProducktInCart;
                            })                     
                        })    
                    }else {
                        dbc.transaction(function (tx) {
                            tx.executeSql("INSERT INTO CART (userid, productname, productprice, rowid, incart, img) VALUES (?,?,?,?,?,?)",[selectedProductUser,selectedProductName,selectedProductPrice,selectedProductRowid,selectedProducktInCart,selectedProductImg])                                  
                        })
                    }              
                    })         
                })
                            //  var result = cart();
                            //  var cartNum = document.getElementById("span");
                            //  var cartInCart = Object.assign([],result.rows);
                            //  var cartInCartValue = cartInCart.map(item => item.incart);
                            // cartNum.innerHTML = cartInCartValue.reduce((a, b) => a + b, 0)+1;                                       
                            //  dbs.transaction(function(tx) {
                            //          tx.executeSql("UPDATE CART SET incart=?",[selectedProducktInCart++], function(x,result) {
                            //             console.log(result);
                            //         })
                            //  })
                            //    if (selectedProductUser == ) {
                            //      selectedProducktInCart+1;
                            //       console.log(selectedProducktInCart);
                            //  }         
            })
        })
                        // console.log("deneme")
                        // for(var i=0; i< carts.length; i++) {
                        // carts[i].addEventListener('click', () => {        
                        // var span = cartNum.innerHTML
                        //     span = parseInt(span) +1;
                        //     cartNum.innerHTML = span
                        //     console.log(span);
                        // })   
    }
    dbc.transaction(function(tx) {
        tx.executeSql("SELECT incart FROM CART WHERE userid=? ",[selectedProductUser], function(x,result) {
            var len = result.rows.length;
            for (var i = 0; i < len; i++) {
                var addCart = result.rows[i].incart;
                var addCartInt = parseInt(addCart);
                prdoductArray.push(addCartInt);
                document.getElementById("span").innerHTML = prdoductArray.reduce((a, b) => a + b)
            }
        console.log(result);   
        })                     
    })

}






    
    
