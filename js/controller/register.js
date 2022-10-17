window.addEventListener("load", function(){
    checkValid();
});

var validation = new Validation();

//checkbox
function myFunc(element) {
    var checkBox = document.querySelectorAll(".specialCheckBox input");
    checkBox.forEach(function(item) {
        item.checked = false;
    });
    element.querySelector("input").checked = true;
}

function getEle(id) {
    return document.getElementById(id);
}

function getInfo () {
    var email = getEle("email").value;
    var name = getEle("name").value;
    var password = getEle("password").value;
    var passwordConfirm = getEle("confirm").value;
    var phone = getEle("phone").value;
    var gender = document.querySelector(".specialCheckBox input").checked;
    var button = document.querySelector(".RegFormButton button");
    var isValid;
    if (isValid = validation.checkRong(email, "emailError")) {
        isValid &= validation.emailCheck(email, "emailError", "(*) Email phải đúng định dạng.");
    }
    
    if (isValid &=validation.checkRong(name, "nameError")) {
        isValid &= validation.nameCheck(name, "nameError", "(*) Tên không được chứa số.");
    }

    if(isValid &= validation.checkRong(password, "passwordError")) {
        isValid &= validation.passwordCheck(password, "passwordError", "(*) Password phải chứa ký tự, số, ký tự đặc biệt, và ký tự in hoa!");
    }
    
    if(password === passwordConfirm) {
        getEle("confirmError").innerText = "";
        isValid &= true;
    }
    else {
        showErr("confirmError", "(*) Password nhập lại không đúng!");
        isValid &= false;
    }

    if(validation.checkRong(phone, "phoneError")) {
        getEle("phoneError").innerText = "";
        getEle("phone").value = phone.substring(0, 10);
        isValid &= validation.phoneCheck(phone, "phoneError", "(*) Sđt chỉ được điền số!");
    }
    else {
        isValid &= false;
    }
        
    
    if(isValid) {
        button.disabled = false;
        var user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.gender = gender;
        user.phone = phone;
        return user;
    }
    else {
        button.disabled = true;
    }
}

document.querySelector(".RegFormButton button").addEventListener("click", function(event) {
    var user = getInfo();
    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: user
    });
    promise.then(function(result) {
        alert(result.data.message);
    });
    promise.catch(function(err) {
        showErr("emailError", err.response.data.message);
    });
    event.preventDefault();
});

function showErr (id, message) {
    getEle(id).innerText = message;
}

//CHECKVALID REAL TIME
function checkValid () {
    var input = document.querySelectorAll(".formItemInner input");
    input.forEach((item) => {
        item.addEventListener("keyup", () => {
            getInfo();
        });
    });
}
