var _data = [];

function PopUp(hideOrshow) {
    if (hideOrshow === 'hide') {
        document.getElementById('popup-register').style.display = "none";
        document.getElementById('myModal').style.display = "none";
    }

    if (hideOrshow == 'show') {
        document.getElementById('popup-register').style.display = "block";
        document.getElementById('myModal').style.display = "block";
    }

}

// window.document.ready = function () {
$("document").ready(function () {
    // setTimeout(function () {
    // console.log('window.localStorage;', window.localStorage);
    //PopUp('show');
    console.log('localStorage', localStorage);
    console.log('localStorage.hideRegisterDialog175', localStorage.hideRegisterDialog175);
    if (localStorage.hideRegisterDialog175 === undefined || localStorage.hideRegisterDialog175 === 'false') {
        PopUp('show');
    } else {
        PopUp('hide');
    }
    // localStorage.clear();
    // PopUpAlert('show');

    // }, 0);
    // axios.get('http://hanhtrinhmouoc.thanhnien.vn/tinrss?page=1&type=1')
    //     .then(response => {
    ////         console.log('res', response);
    //     });
})

/* onClose */
function onClose() {
    PopUp('hide');
}

/* Validate */

/* Post */
function submitData() {
    //console.log('submit');
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var id = 0;
    var from = 'anhtuan6294@gmail.com';
    var subject = 'Xác nhận tham gia rút thăm trúng thưởng';
  
    if (name && phone && email) {
        axios.post('http://128.199.153.64:3500/api/Requests', {
            name: name,
            phone: phone,
            email: email

        }).then(function (response) {
            this._data.push(response.data);
            PopUp('hide');
            PopUpAlert('show');
            //console.log('axios POST', response.data);
            return getRes = response.data;
        }).then(getRes => {
            ////console.log('getRes', getRes)
            let code = getRes.id + 25000;
            let name = getRes.name;
            let from = 'hanhtrinhmouoc@dulichhoanmy.com';
            axios.post('http://128.199.153.64:3500/api/Containers/sendEmail', {
                to: getRes.email,
                from: from,
                subject: "Xác nhận tham gia rút thăm trúng thưởng",
                _code: code.toString(),
                _name: name
            }).then(res => {
                //console.log('mail res', res);
            }).catch(err => {
                // console.log('mail err', err);
            })
        }).catch(function (error) {
            //console.log('axios err', error);
        });

        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("hideRegisterDialog175", "true");
        } else {
            ////console.log('Browser not support');
        }
    } else {
        //console.log('Thiếu thông tin');
        // alert('Bạn nhập thiếu thông tin !');
    }
}

function PopUpAlert(hideOrshow) {
    ////console.log('alert popup', this._data);
    if (hideOrshow == 'hide') {
        document.getElementById('popup-alert').style.display = "none";
        document.getElementById('myModal').style.display = "none";
    } else if (hideOrshow == 'show') {
        document.getElementById('popup-alert').style.display = "block";
        document.getElementById('myModal').style.display = "block";

        $("#name-result").text(this._data[0]["name"]);
        $("#code-result").text(this._data[0]["id"] + 25000);
    }

}