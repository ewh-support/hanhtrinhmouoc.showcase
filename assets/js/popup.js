var _data = [];

function PopUp(hideOrshow) {
    if (hideOrshow == 'hide') document.getElementById('popup-register').style.display = "none";
    else document.getElementById('popup-register').removeAttribute('style');

}

// window.document.ready = function () {
$("document").ready(function(){
    // setTimeout(function () {
    //console.log('window.localStorage;', window.localStorage);

    if (localStorage.hideRegisterDialog == undefined || localStorage.hideRegisterDialog == 'false') {
        PopUp('show');
    } else {
        PopUp('hide');
    }
    // localStorage.clear();
    // PopUpAlert('show');

    // }, 0);

});

/* onClose */
function onClose() {
    PopUp('hide');
}

/* Validate */

/* Post */
function submitData() {
    console.log('submit');
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var id = 0;
    if (name && phone && email) {
        axios.post('http://128.199.153.64:3500/api/Requests', {
            name: name,
            phone: phone,
            email: email

        }).then(function (response) {
            this._data.push(response.data);
            PopUp('hide');
            PopUpAlert('show');
            // console.log('res axios post', response.data);
            // console.log(response.data["id"] + 25000);
            // console.log(response.data["name"]);

        }).catch(function (error) {
            //console.log('axios err', error);
        });

        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("hideRegisterDialog", "true");
        } else {
            //console.log('Browser not support');
        }
    } else {
        console.log('Thiếu thông tin');
        // alert('Bạn nhập thiếu thông tin !');
    }
}

function PopUpAlert(hideOrshow) {
    //console.log('alert popup', this._data);
    if (hideOrshow == 'hide')
        document.getElementById('popup-alert').style.display = "none";
    else {
        document.getElementById('popup-alert').removeAttribute('style');
        $("#name-result").text(this._data[0]["name"]);
        $("#code-result").text(this._data[0]["id"]+25000);
    }

}