
function Validation () {
    this.checkRong = function (value, id) {
        if(value.trim() != "") {
            return true; 
        }
        showErr(id, "(*) Không được để trống");
        return false; //có rỗng
    }

    this.emailCheck = function (email, id, mesage) {
        var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, mesage);
        return false;
    }

    this.nameCheck = function (name, id, mesage) {
        var reg = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if(name.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, mesage);
        return false;
    }

    this.passwordCheck = function (password, id, message) {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if(password.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }

    this.phoneCheck = function (phone, id, message) {
        var reg = /^[0-9]+$/;
        if(phone.match(reg)) {
            getEle(id).innerText = "";
            return true;
        }
        showErr(id, message);
        return false;
    }
}