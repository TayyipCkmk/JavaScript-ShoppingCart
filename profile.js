var selectedProductUser = localStorage.getItem("userid");
if (selectedProductUser == undefined) {
    window.location ="index.html"
}else {
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var dbc = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var updateUserid = document.getElementById("updateUserid");
    var updatePass = document.getElementById("updatePass");
    var updateEmail = document.getElementById("updateEmail");
    var updateAddress = document.getElementById("updateAddress");
    var producktInCart = [];
    var script = document.createElement("script");
        script.src = "loginControl.js"
        document.head.appendChild(script);

    db.transaction(function(tx){
       tx.executeSql("SELECT * FROM LOGS",[],function(x,rs){
            console.log(rs.rows);
            var rowInfo = rs.rows
            var rowLen = rs.rows.length;
          
            for (var i = 0; i < rowLen; i++) {
                 var rowUserid = rowInfo[i].userid;
                    //localStorage.setItem("userid",JSON.stringify(rowUserid));
                if (rowUserid == JSON.parse(selectedProductUser)) {
                    tx.executeSql("SELECT userid,password,email,address,rowid FROM LOGS WHERE userid=?",[rowUserid],function(x,result) {
                      //  console.log(result.rows);
                        var selectRow = result.rows;
                        var selectUserid = selectRow[0].userid;
                        var selectPassword = selectRow[0].password;
                        var selectEmail = selectRow[0].email;
                        var selectAddress = selectRow[0].address;                  
                       // var useridValue =  updateUserid.value  = selectUserid
                        var passValue = updatePass.value    = selectPassword
                        var emailValue = updateEmail.value   = selectEmail
                        var addressValue = updateAddress.value = selectAddress
    
                        var pressUpdate = document.querySelector(".pressUpdate")
                            pressUpdate.addEventListener("click",function() {
                            if (!localStorage.getItem("userid")) {
                                window.location ="index.html"
                            }else if (updatePass.value == false) {
                                alert("You Must Write Password");
                            }else if (updateEmail.value == false) {
                                alert("You Must Write Email");
                            }else if (updateAddress.value == false) {
                                alert("You Must Write Address");
                            }else {
                                if (updatePass.value == passValue && updateEmail.value == emailValue && updateAddress.value == addressValue) {
                                    alert("All Is Same")
                                    }else {
                                        db.transaction(function(tx) {
                                            tx.executeSql("UPDATE LOGS SET password=?,email=?,address=? WHERE userid=?",[updatePass.value,updateEmail.value,updateAddress.value,selectUserid])
                                                alert("Informations Updated")
                                        //localStorage.setItem("userid",JSON.stringify(updateUserid.value)); 
                                        })
                                        // debugger
                                        // db.transaction(function(tx) {                                
                                        //     tx.executeSql("SELECT * FROM CART",[], function(x,result) { 
                                        //         console.log(result)
                                        //         var len = result.rows.length;                                 
                                        //         for(var i = 0; i < len; i++) {
                                        //             var cartUpdate = result.rows[i].userid;
                                        //             var cartUpdateRowid = result.rows[i].rowid;                                        
                                        //        tx.executeSql("UPDATE CART SET userid=? WHERE rowid=? AND userid=?",[selectedProductUser,cartUpdateRowid,cartUpdate])  
                                        //         }                                                                   
                                        //    })
                                        // })                                                   
                                    }
                            }                                  
                                        //console.log(updateAddress.value);
                                        // if (updateUserid.value != useridValue) {
                                        //     console.log("!=name")
                                        //     if (updateUserid.value == false) {
                                        //        alert("bosname")
                                        //     }else {
                                        //         console.log("if1")
                                        //     }
                                        // }else if (updatePass.value != passValue) {
                                        //     console.log("!=pass")
                                        //     if (updatePass.value == false) {
                                        //         alert("bospass")
                                        //     }else {
                                        //         console.log("if2")
                                        //     }
                                        // }else if (updateEmail.value != emailValue) {
                                        //     console.log("=!mail")
                                        //     if (updateEmail.value == false) {
                                                
                                        //     }else {
                                        //         console.log("if3")
                                        //     }
                                        // }else if (updateAddress.value != addressValue) {
                                        //     console.log("!=address")
                                        //     if (updateAddress.value == false) {
                                                
                                        //     }else {
                                        //         console.log("if4")
                                        //     }
                                        // }else {
                                        //     console.log("hepsiesit")                           
                                        // }
                        })                  
                    })
                }            
            }     
       })      
    })
    
    dbc.transaction(function(tx) {
        tx.executeSql("SELECT incart FROM CART WHERE userid=? ",[selectedProductUser], function(x,result) {
            var len = result.rows.length;
            for (var i = 0; i < len; i++) {
                var addCart = result.rows[i].incart;
                var addCartInt = parseInt(addCart);
                producktInCart.push(addCartInt);
                document.getElementById("span").innerHTML = producktInCart.reduce((a, b) => a + b)
            }   
        })                     
    })
    /* 
    deneme.then((döndüğüm parametre)=>{
            //dönen datayla işlemini yap
    })
    
    function deneme () {
        return new Promise((res,reject)=> {
             // İstediğin işlemi yaptın 
             res("dönen data") 
             //işlem bittiği için geri döndürdük
        })
    }
    */
}
