function PopUp(hideOrshow) {
    if (hideOrshow == 'hide') document.getElementById('ac-wrapper').style.display = "none";
    else document.getElementById('ac-wrapper').removeAttribute('style');
}

window.document.ready = function () {
    ////console.log('localStorage.setVal', localStorage.setVal);
    
    // PopUp('hide');
    // //console.log('window.localStorage;', window);
    
    if (localStorage.hideRegisterDialog == undefined || localStorage.hideRegisterDialog == 'false') {
        PopUp('show');
    } else {
        PopUp('hide');
    }
    // localStorage.clear();

}
/* onClose */
function onClose(){
    PopUp('hide');
}


/* Validate */

/* Post */
function submitData() {
    console.log('submit');
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var age = document.getElementById('age').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    if (name && address && age && phone && email) {
        axios.post('http://128.199.153.64:3500/api/Requests', {
                name: name,
                address: address,
                age: age,
                phone: phone,
                email: email,

            })
            .then(function (response) {
                //console.log('axios res', response);
                console.log('res');
                alert('Cảm ơn bạn đã đăng ký tham gia chương trình !');
                PopUp('hide');
            })
            .catch(function (error) {
                //console.log('axios err', error);
            });

        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("hideRegisterDialog", "true");
        } else {
            //console.log('Browser not support');
        }
    } else {
        //console.log('Thiếu thông tin');
        alert('Bạn nhập thiếu thông tin !');
    }


}