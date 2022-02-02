localStorage.removeItem("userid");
var loginBtn = document.querySelector('.auth .login');
var signupBtn = document.querySelector('.auth .signup');
var loginSection = document.querySelector('#login');
var signupSection = document.querySelector('#signup');
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var loginRs;
var  passRs;
var admin = "";

signupBtn.addEventListener('click', function() {
  loginSection.classList.remove('show');
  signupSection.classList.add('show');
  loginBtn.classList.remove('selected');
  signupBtn.classList.add('selected');
});

loginBtn.addEventListener('click', function() {
  signupSection.classList.remove('show');
  loginSection.classList.add('show');
  signupBtn.classList.remove('selected');
  loginBtn.classList.add('selected');
});

if (admin == "") {
    db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE LOGS (name ,surname ,userid unique, password ,email, address,admin )'); 
       tx.executeSql('INSERT INTO LOGS (name ,surname ,userid ,password ,email, address, admin) VALUES ("","","admin","admin","","","x")');             
    })
}

var pressSign = document.querySelector(".pressSign");
    pressSign.addEventListener("click", function() {
        //console.log("button clicked");
        var count = 0;
        var signName        = document.getElementById("signName").value;
        var signSurname     = document.getElementById("signSurname").value;
        var signUserid      = document.getElementById("signUserid").value;
        var signPass        = document.getElementById("signPass").value;
        var consirmSignpass = document.getElementById("consirmSignpass").value;
        var signEmail       = document.getElementById("signEmail").value;
        var signAddress     = document.getElementById("signAddress").value; 
            if (signName == false) {
                alert("You Must Write Name")
            }else if (signSurname == false) {
                alert("You Must Write Surname")
            }else if (signUserid == false ) {
                alert("You Must Write Username")
            }else if (signPass == false)  {
                alert("You Must Write Password")
            }else if (consirmSignpass == false) {
                alert("You Must Write Password Again")
            }else if (consirmSignpass != signPass) {
                alert("Passwords Must Be Same")
            }else if (signEmail == false) {
                alert("You Must Write Email")
            }else if (signEmail.match(mailformat) == null) {
                alert("You Have Entered An Invalid Email Address!");
            }else if (signAddress == false) {
                alert("You Must Write Address")
            }else{
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM LOGS ",[],function(x,result) {
                        var rowInfo = result.rows
                        var rowLen = result.rows.length;
                        for (var i = 0; i < rowLen; i++) {
                            var rowUserid = rowInfo[i].userid;
                            if (rowUserid == signUserid) {
                                alert("This Username Exists");
                                count++;
                                break;
                            }              
                        }
                            if (count == 0){
                                    db.transaction(function (tx) { 
                                        //tx.executeSql('CREATE TABLE LOGS (name ,surname ,user unique, password ,email, address, admin )'); 
                                        tx.executeSql('INSERT INTO LOGS (name ,surname ,userid ,password ,email, address, admin) VALUES (?,?,?,?,?,?,"")', [signName,signSurname,signUserid,signPass,signEmail,signAddress]); 
                                        alert("Signing up is successful")  
                                        document.getElementById("signName").value        = "";
                                        document.getElementById("signSurname").value     = "";
                                        document.getElementById("signUserid").value      = "";
                                        document.getElementById("signPass").value        = ""; 
                                        document.getElementById("consirmSignpass").value = "";
                                        document.getElementById("signEmail").value       = "";
                                        document.getElementById("signAddress").value     = "";                                    
                                        //  db.transaction(function(tx) {
                                        //   tx.executeSql('SELECT user FROM LOGS', [], function(tx, results) {
                                        //     var len=results.rows.length;
                                        //     console.log(len);
                                        //   });
                                        //  });
                                    });
                            }
                    })
                })                       
            }                 
    });
var pressLogin = document.querySelector(".pressLogin");
    pressLogin.addEventListener("click", function() {
        var userid = document.getElementById("userid").value;
        var pass = document.getElementById("pass").value;
        console.log("button clicked");
        // window.location.assign('shop.html');
        db.transaction(function (tx) {   
            tx.executeSql('SELECT * FROM LOGS WHERE userid=?', [userid],function(x,rs) {
                console.log(rs);

                loginRs = Object.assign([],rs.rows);
                var logUserid = loginRs.map(item => item.userid);
                
                passRs = Object.assign([], rs.rows);
                var logPass = passRs.map(item => item.password)
                            
                admin = Object.assign([],rs.rows);
                var logAdmin = admin.map(item => item.admin);

                if (userid == false) {
                    alert("You Must Write Name")
                }else if (pass == false) {
                    alert("You Must Write Password") 
                }else if (logAdmin != "") {
                    alert("Admin")
                    window.location.assign('admin.html');
                }else {
                    if (logUserid == userid) { 
                        if (logPass == pass) {
                            alert("Welcome");
                            window.location.assign('shop.html');
                        }else {
                            alert("Password Wrong");
                        }     
                    }else {
                        alert("Username Wrong")
                    }
                }         
            }) 
            localStorage.setItem("userid",JSON.stringify(userid));
            //    tx.executeSql("DROP TABLE LOGS",[],
            // function(tx,results){console.log("Successfully Dropped")},
            // function(tx,error){console.log("Could not delete")}
            // ); 
            // tx.executeSql('INSERT INTO LOGS (id, log) VALUES (userid.value, pass.value)'); 
            // tx.executeSql('insert into LOGS(username,password) values(?,?)', [userid,pass], function(transaction, result) {
            // console.log(result.insertId);
            // }, function(transaction, error) {
                //console.log(error);
            // }); 
        
        });
    });



