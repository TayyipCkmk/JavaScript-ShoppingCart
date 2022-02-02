var selectedProductUser = localStorage.getItem("userid");
if (selectedProductUser == undefined) {
    window.location ="index.html"
}else {
    var buyModal = document.getElementById("buyModal");
    var buyButton = document.getElementById("cartBuyButtonid");
    var lastBuy = document.getElementById("lastBuy");    
    var span =document.getElementsByClassName("span")[0];
    var dbc = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var dbs = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var id = "";
    var emptyAlert = document.createElement("h1");
    var cartTotalArray = [];
    var cartSpan = [];
    var script = document.createElement("script");
        script.src = "loginControl.js"
        document.head.appendChild(script);
    
    function cart() {
        dbc.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS CART (userid, productname, productprice, rowid, incart, img)")

        })

        dbc.transaction(function (tx) {
            tx.executeSql("SELECT * FROM CART WHERE userid=?",[selectedProductUser], function(x,result) {            
                var len = result.rows.length;
                if (len != 0) {                     
                    for (var i = 0; i < len; i++) {
                        id = "id-" +i;
                        var productList = document.createElement("div");
                            productList.classList.add("container-products");
                            productList.setAttribute("id", id);
                        var imageList = document.createElement("img");                   
                        var nameList = document.createElement("div");
                            nameList.classList.add("cartProductName");
                        var priceList = document.createElement("div");
                            priceList.classList.add("cartProductPrice");
                        var incartList = document.createElement("div");
                            incartList.classList.add("cartProductQuantity");
                        var totalList = document.createElement("div");
                            totalList.classList.add("cartProductTotal");
                        var gold = document.createElement("img");
                        var goldTotal = document.createElement("img");
                        var goldTotalPrice = document.createElement("img");
                        // var quantity = document.createElement("div");               
                        var decrease = document.createElement("img");
                        var increase = document.createElement("img")
                        var trash = document.createElement("img")                
                        var cartTotalContainer = document.createElement("div");
                        var cartTotal = document.createElement("h2");
                        var cartTotalPrice = document.createElement("h2");
                        
                        imageList.setAttribute("src",result.rows.item(i).img);
                        imageList.setAttribute("width", "120");
                        imageList.setAttribute("height", "120");  
                        gold.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");       
                        goldTotal.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");       
                        goldTotalPrice.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA")
                        nameList.innerHTML = result.rows.item(i).productname;
                        priceList.innerHTML = result.rows.item(i).productprice;
                        incartList.innerHTML = result.rows.item(i).incart;
                        incartListInt = parseInt(incartList.innerHTML);
                        cartSpan.push(incartListInt)
                        totalList.innerHTML = priceList.innerHTML * incartList.innerHTML;
                        totalListInt = parseInt(totalList.innerHTML);
                        cartTotalArray.push(totalListInt);
            
                        decrease.setAttribute("src","file:///Users/tayyip/Downloads/arrow-left-circle-fill.svg");
                        decrease.setAttribute("class","decreaseButton");
                        decrease.setAttribute("id", id);
                        let dec = result.rows.item(i).rowid
                        decrease.addEventListener("click", function(e){decreaseItem(e,dec)},false);
                    
                        increase.setAttribute("src","file:///Users/tayyip/Downloads/arrow-right-circle-fill.svg");
                        increase.setAttribute("class","increaseButton");
                        let inc = result.rows.item(i).rowid
                        increase.setAttribute("id", id);
                        increase.addEventListener("click", function(e){increaseItem(e,inc)},false);
                    
                        trash.setAttribute("src","file:///Users/tayyip/Downloads/OOjs_UI_icon_trash-destructive.svg")
                        trash.setAttribute("class","trashButton")
                        let del = result.rows.item(i).rowid
                        trash.setAttribute("id", id);
                        trash.addEventListener("click",function(e){deleteItem(e,del)},false);                           
                        // decreaseButton.setAttribute("d","M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z")
                        // decrease.setAttribute("xmlns","http://www.w3.org/2000/svg")
                        // decrease.setAttribute("width","16");
                        // decrease.setAttribute("height", "16");
                        // decrease.setAttribute("fill","currentColor");
                        // decrease.setAttribute("class","bi bi-arrow-left-circle-fill")
                        // decrease.setAttribute("viewBox", "0 0 16 16")                  
                        productList.appendChild(trash);
                        productList.appendChild(imageList);
                        productList.appendChild(nameList);
                        productList.appendChild(priceList);    
                        priceList.appendChild(gold);
                        // decrease.appendChild(decreaseButton);
                        productList.appendChild(decrease)
                        productList.appendChild(incartList);
                        productList.appendChild(increase);
                        // productList.appendChild(quantity);
                        productList.appendChild(totalList);
                        productList.appendChild(goldTotal);
                                
                        document.getElementById("list").appendChild(productList);
                        // var buyModalProducts = document.createElement("tr");
                        //     buyModalProducts.setAttribute("id",id)
                        //     buyButton.addEventListener("click", function(e){increaseItem(e,dec)},false);
                        // var buyModalProduct = document.createElement("td");
                        // var buyModalPrice = document.createElement("td");
                        // var buyModalQuantity = document.createElement("td");
                        // var buyModalTotal = document.createElement("td");
                        // buyModalProduct.textContent = result.rows.item(i).productname;
                        // buyModalPrice.textContent = result.rows.item(i).productprice;  
                        // buyModalQuantity.textContent = result.rows.item(i).incart;
                        // buyModalTotal.textContent = buyModalPrice.textContent * buyModalQuantity.textContent;
                        // buyModalProducts.appendChild(buyModalProduct)
                        // buyModalProducts.appendChild(buyModalPrice)
                        // buyModalProducts.appendChild(buyModalQuantity)
                        // buyModalProducts.appendChild(buyModalTotal)
                        // document.getElementById("productTable").appendChild(buyModalProducts);                
                    }
                        cartTotalContainer.setAttribute("class","cartTotalContainer");
                        cartTotal.setAttribute("class","cartTotal");
                        cartTotal.innerHTML = "Basket Total :";   
                        cartTotalPrice.setAttribute("class","cartTotalPrice");
                        cartTotalPrice.setAttribute("id","cartT");
                        cartTotalPrice.innerHTML = cartTotalArray.reduce((a, b) => a + b)
                        document.getElementById("total").innerHTML = cartTotalArray.reduce((a, b) => a + b)
                        document.getElementById("span").innerHTML = cartSpan.reduce((a, b) => a + b)                               
                        cartTotalContainer.appendChild(cartTotal);
                        cartTotalContainer.appendChild(cartTotalPrice);
                        cartTotalContainer.appendChild(goldTotalPrice);

                        document.getElementById("productList").appendChild(cartTotalContainer);                    
                }else {
                    document.getElementById("productList").innerHTML = ""
                    emptyAlert.setAttribute("class","emptyAlert")
                    emptyAlert.innerHTML = "Your Cart Is Empty"
                    document.getElementById("productList").appendChild(emptyAlert);                          
                }           
            })                   
                        //         tx.executeSql("DROP TABLE CART",[],
                        //  function(tx,results){console.log("Successfully Dropped")},
                        //  function(tx,error){console.log("Could not delete")}
                        //  );         
        })      
    }

    function decreaseItem(e,param) {
        control();
        dbs.transaction(function(tx) {
            tx.executeSql("SELECT rowid FROM SHOP WHERE rowid=? ", [param], function(tx,info) {
                
                var productInfo = info.rows;
                var selectedProductRowid = productInfo[0].rowid;
                var eventTarget = e.target.id;
                dbc.transaction(function(tx) {            
                    tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,rs){
                        var item = rs.rows[0];
                            if (item.incart -1 != 0) {
                                 dbc.transaction(function(tx) {
                                    tx.executeSql("UPDATE CART SET  incart=? WHERE rowid=? AND userid=?",[item.incart-1, item.rowid, item.userid], function(x,result) {
                                    
                                        tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,selectCart) {
                                            var selectIncart = selectCart.rows[0];
                                            var priceNode = document.getElementById(eventTarget).childNodes[3].innerHTML
                                            // var quantityNode = document.getElementById(eventTarget).childNodes[5].innerHTML 
                                            // var totalNode = document.getElementById(eventTarget).childNodes[7].innerHTML
                                            var priceNodeParse = parseInt(priceNode);
                                            // var quantityNodeParse = parseInt(quantityNode);
                                            // var totalNodeParse = parseInt(totalNode);
                                    
                                            document.getElementById(eventTarget).childNodes[5].innerHTML = selectIncart.incart;
                                            document.getElementById(eventTarget).childNodes[7].innerHTML = document.getElementById(eventTarget).childNodes[5].innerHTML * priceNodeParse;
                                            document.getElementById("cartT").innerHTML = document.getElementById("cartT").innerHTML - priceNodeParse;
                                            document.getElementById("total").innerHTML = document.getElementById("total").innerHTML - priceNodeParse;
                                            document.getElementById("span").innerHTML  = document.getElementById("span").innerHTML - 1;
                                            // var totalNode = document.getElementById(eventTarget).childNodes[7].innerHTML = document.getElementById(eventTarget).childNodes[5].innerHTML * priceNodeParse;
                                            //     cartTotalArrayNode.push(totalNode);
                                            //     console.log(cartTotalArrayNode);
                                            //  quantityNodeParse = document.getElementById(eventTarget).childNodes[5].innerHTML;
                                            // totalNodeParse = document.getElementById(eventTarget).childNodes[7].innerHTML;                                
                                        });
                                    })                     
                                })
                            }else {
                                deleteItem(e,param)
                            }                                                       
                    })         
                })           
            })
        })
    }

    function increaseItem(e,param) {
        control();
        dbs.transaction(function(tx) {
            tx.executeSql("SELECT rowid FROM SHOP WHERE rowid=? ", [param], function(tx,info) {

                var productInfo = info.rows;
                var selectedProductRowid = productInfo[0].rowid;
                var eventTarget = e.target.id;
                
                dbc.transaction(function(tx) {            
                    tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,rs){
                        var item = rs.rows[0];
                        var parseItem = parseInt(item.incart);
                        dbc.transaction(function(tx) {
                            tx.executeSql("UPDATE CART SET  incart=? WHERE rowid=? AND userid=?",[parseItem+1, item.rowid, item.userid], function(x,result) {
                            
                                tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,selectCart) {
                                    var selectIncart = selectCart.rows[0];
                                    var priceNode = document.getElementById(eventTarget).childNodes[3].innerHTML
                                    var priceNodeParse = parseInt(priceNode);
                                    
                                    document.getElementById(eventTarget).childNodes[5].innerHTML = selectIncart.incart;
                                    document.getElementById(eventTarget).childNodes[7].innerHTML = document.getElementById(eventTarget).childNodes[5].innerHTML * priceNodeParse;
                                    document.getElementById("cartT").innerHTML = parseInt(document.getElementById("cartT").innerHTML) + priceNodeParse;
                                    document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) + priceNodeParse;      
                                    document.getElementById("span").innerHTML = parseInt(document.getElementById("span").innerHTML) + 1;
                                    document.getElementById(eventTarget).childNodes[5].innerHTML = selectIncart.incart;                                      
                                });                    
                            })                     
                        })                                 
                    })         
                })           
            })
        })
    }

    function deleteItem(e,param) {       
        if(!localStorage.getItem("userid")) {
             window.location ="index.html"
        } else if (confirm("Are You Sure !")) {
            dbs.transaction(function(tx) {
                tx.executeSql("SELECT rowid FROM SHOP WHERE rowid=? ", [param], function(tx,info) {

                    var productInfo = info.rows;
                    var len = info.rows.length;
                    var selectedProductRowid = productInfo[0].rowid;
                    var eventTarget = e.target.id;
                    dbc.transaction(function(tx) {            
                        tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,rs){
                            var item = rs.rows[0];
                
                            dbc.transaction(function(tx) {
                                tx.executeSql("DELETE FROM CART WHERE rowid=? AND userid=?",[item.rowid, item.userid], function(x,result) {
                                    
                                    tx.executeSql("SELECT * FROM CART WHERE rowid=? AND userid=?",[selectedProductRowid,selectedProductUser],function(x,selectCart) {
                                        var selectIncart = selectCart.rows[0];
                                        var totalP = document.getElementById(eventTarget).childNodes[7].innerHTML;
                                        var totalQ = document.getElementById(eventTarget).childNodes[5].innerHTML;
                                        document.getElementById(eventTarget).innerHTML = "";
                                        document.getElementById("cartT").innerHTML = document.getElementById("cartT").innerHTML - totalP;
                                        document.getElementById("total").innerHTML = document.getElementById("total").innerHTML - totalP;
                                        document.getElementById("span").innerHTML = document.getElementById("span").innerHTML - totalQ;   
                                            tx.executeSql("SELECT * FROM CART WHERE userid=?",[selectedProductUser], function(x,cartValue){
                                            var len = cartValue.rows.length;
                                            console.log(len);
                                            
                                                if (len == 0) {
                                                    document.getElementById("productList").innerHTML = "";                                          
                                                    emptyAlert.setAttribute("class","emptyAlert")
                                                    emptyAlert.innerHTML = "Your Cart Is Empty"
                                                    document.getElementById("productList").appendChild(emptyAlert);                                            
                                                }   
                                            })                             
                                    });
                                })                     
                            })                                 
                        })         
                    })           
                })
            })
        }else{
            // increaseItem(e,param);
            // console.log(productInfo);
            // if (selectIncart.incart == 0) {
            //     selectIncart.incart++                                    
            // }
        }  
    }
    buyButton.onclick = function() {
        control();
        buyModal.style.display = "block";
        
    }
    span.onclick = function() {
        buyModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == buyModal) {
            buyModal.style.display = "none"; 
        }
    }
    lastBuy.onclick = function() {
        alert("Order Succeed")
        buyModal.style.display = "none"; 
        document.getElementById("productList").innerHTML = ""
        emptyAlert.setAttribute("class","emptyAlert")
        emptyAlert.innerHTML = "Your Cart Is Empty"
        document.getElementById("productList").appendChild(emptyAlert);
        
        dbc.transaction(function(tx) {
            tx.executeSql("SELECT * FROM CART WHERE userid=?",[selectedProductUser], function(x,rs) {
                    var len = rs.rows.length;
                for (var i = 0; i < len; i++) {
                    var lastUser = rs.rows[i]
                        dbc.transaction(function(tx) {
                            tx.executeSql("DELETE FROM CART WHERE userid=?",[lastUser.userid],function(x,rs) {
                                document.getElementById("span").innerHTML = 0;
                            })
                        })
                }
            })
        }) 
    } 
        var buyModalUser = document.createElement("tr");
        var buyModalName = document.createElement("td");
        var buyModalSurname = document.createElement("td");
        var buyModalEmail = document.createElement("td");
        var buyModalAddress = document.createElement("td");

        dbc.transaction(function(tx) {
            tx.executeSql("SELECT * FROM LOGS",[],function(x,rs) {
                var rowInfo = rs.rows
                var rowLen = rs.rows.length;
            
                for (var i = 0; i < rowLen; i++) {
                    var rowUserid = rowInfo[i].userid;
                    //localStorage.setItem("userid",JSON.stringify(rowUserid));
                    if (rowUserid == JSON.parse(selectedProductUser)) {
                        tx.executeSql("SELECT userid,name,surname,email,address FROM LOGS WHERE userid=?",[rowUserid],function(x,result) {
                        //  console.log(result.rows);                  
                            var selectRow = result.rows;
                            var selectName = selectRow[0].name;
                            var selectSurname = selectRow[0].surname;
                            var selectEmail = selectRow[0].email;
                            var selectAddress = selectRow[0].address;

                            buyModalName.textContent = selectName;
                            buyModalSurname.textContent = selectSurname;
                            buyModalEmail.textContent = selectEmail;
                            buyModalAddress.textContent = selectAddress;

                            buyModalUser.appendChild(buyModalName)
                            buyModalUser.appendChild(buyModalSurname)
                            buyModalUser.appendChild(buyModalEmail)
                            buyModalUser.appendChild(buyModalAddress)
                                                
                            document.getElementById("contactsTable").appendChild(buyModalUser);                  
                        })
                    }            
                }
            })
        })   
    // var buyModalTitle = document.createElement("h1");
    //     buyModalTitle.innerHTML = "Buy Page";
    //     document.getElementById("modalInfoId").appendChild(buyModalTitle);    
    // dbc.transaction(function (tx) {
    //     tx.executeSql("SELECT * FROM CART WHERE userid=?",[selectedProductUser], function(x,result) {        
    //         var len = result.rows.length;      
    //         for (var i = 0; i < len; i++) {
    //             id = "id-" +i;
    //             var buyModalProducts = document.createElement("tr");
    //                 buyModalProducts.setAttribute("id",id)
    //             var buyModalProduct = document.createElement("td");
    //             var buyModalPrice = document.createElement("td");
    //             var buyModalQuantity = document.createElement("td");
    //             var buyModalTotal = document.createElement("td");
    //             buyModalProduct.textContent = result.rows.item(i).productname;
    //             buyModalPrice.textContent = result.rows.item(i).productprice;  
    //             buyModalQuantity.textContent = result.rows.item(i).incart;
    //             buyModalTotal.textContent = buyModalPrice.textContent * buyModalQuantity.textContent;
    //             buyModalProducts.appendChild(buyModalProduct)
    //             buyModalProducts.appendChild(buyModalPrice)
    //             buyModalProducts.appendChild(buyModalQuantity)
    //             buyModalProducts.appendChild(buyModalTotal)
    //             document.getElementById("productTable").appendChild(buyModalProducts);                 
    //             var tableTotalPrice = document.createElement("tr");            
    //             var gold = document.createElement("img");
    //             var goldTotal = document.createElement("img");
    //             var goldTotalPrice = document.createElement("img");
    //             gold.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");       
    //             goldTotal.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA");       
    //             goldTotalPrice.setAttribute("src","data:image/webp;base64,UklGRmABAABXRUJQVlA4TFMBAAAvEUAEEIfBNrJtJeeFuMUWklMgxbq7ZLw22EaS5KRfoVzlkgDERcAEtAwhSZKUQ7A/wLHc+TOcwRjssIltK85hEUCJD3oGN7jYIi1tjERGAIgQoUCEDBViHx9BQeEMJxQUBBUIuRcFN3ig4Nx3sp3GMn9YpERvCZ+LggjwkFJs//hHdkUMET4P4ypnyzfbs0vB8ln+UH6NlACHkW2ryT3I/y/OxyGGu6T/9pIiIvo/AUgIJCQQqI+OgwiEBOLQHg7tYQjQsbHBwwlA6Ph6R2mWpdH7vBdCat6J5SHkZrcSATp8zGbBzOxeApIO7zhJ8yKN41ulPoe3WWwht2QAdPh2NgthZt2vBCTVz8VmtViu1otHpT7lNXT/rvt34dID/K4M8xDmodx5QJLb7q6X6/Vy3W2dJIF3vqzKsiq9c4j+1DvvnHd+CiBJ4+nwZKQ+IBAIBAIA")            
    //         }
    //         tableTotalPrice.textContent = cartTotalArray.reduce((a, b) => a + b)
    //         document.getElementById("productTable").appendChild(tableTotalPrice);       
    //     })   
    // //         tx.executeSql("DROP TABLE CART",[],
    // //  function(tx,results){console.log("Successfully Dropped")},
    // //  function(tx,error){console.log("Could not delete")}
    // //  );     
    // })
    // var cartBuyButton = document.createElement("button")
    // cartBuyButton.setAttribute("class","cartBuyButton");
    // cartBuyButton.setAttribute("id","cartBuyButtonid")
    // cartBuyButton.innerHTML = "Buy Products";
    // //let dec = result.rows.item(i).rowid
    // document.getElementById("productList").appendChild(cartBuyButton);
    // cartBuyButton.addEventListener("click", function(){buyPage()});
    cart()



}
