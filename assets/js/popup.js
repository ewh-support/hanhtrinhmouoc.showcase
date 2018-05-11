function PopUp(hideOrshow) {
    if (hideOrshow == 'hide') document.getElementById('ac-wrapper').style.display = "none";
    else document.getElementById('ac-wrapper').removeAttribute('style');
}

window.document.ready = function () {
    console.log('localStorage', localStorage.value)
    // if(localStorage.value = "Saved")
    //     PopUp('hide')
    // else
        // PopUp('show');

}

/* Validate */
function validateForm(){
        var name = document.forms["register-form"]["name"].value;
        if (name == "") {
            alert("Bạn phải nhập tên của mình");
            return false;
        }
}

/* Post */
function submitData() {
    console.log('submitData');
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var age = document.getElementById('age').value;
    var sex = document.getElementById('sex').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    axios.post('http://localhost:3500/api/Requests', {
            name: name,
            address: address,
            age: age,
            sex: sex,
            phone: phone,
            email: email,

        })
        .then(function (response) {
            console.log('axios res', response);
            //luu vao local storage
        })
        .catch(function (error) {
            console.log('axios err', error);
        });

    if (typeof (Storage) !== "undefined") {
        // Store
        localStorage.setItem("value", "Saved");
    } else {
        console.log('not support');
    }
}