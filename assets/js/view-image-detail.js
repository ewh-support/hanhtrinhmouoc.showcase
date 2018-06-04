//promise
function getUrl() {
    return new Promise((resolve, error) => {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('=') + 1);
        resolve(id);
    })
}

getUrl().then(res => {
    var webApiUrl = 'http://hanhtrinhmouoc.thanhnien.vn/api/post/getbyid/' + res;
    const tokenStr =
        'tp2RquyT1DN_riEYYYT_jUaZKptQUrA-8EZZu1EpJl2e43r0XbsTzT4EgIl2cbnA2uVlKiuoOIzFJGyt5nw66pRQVYAwcBzfAeOHIHXBWhdhy9wVnfpWcrvPStqRAu2kmzsN8JpBA5tbFvT6LZvskW4IQzSSKce-KrtZ5kyoIiFRteNkgleM7Y0yIq5APtLCgt-XH1N8V3OFtPFqLKVPWyaqxY-5gh0osluPglK6LQ1RH-DFXYGV3q26J03FWafpLGly-0u8-6iEPmnM0jb3hy9KCURGdxz0aMnq7lUza1AdwwFAw9XcQdwpP2fGnoROmJjJECOlQ6ujbXcEjaENKdTt2aTxcWPHITIjho2XWVq1Bv_SKprb5xriaQ_ZbzIOkdlHRdVlpG4fHC59wPV33RLlimWHgoAZ3aGAz4-HOs_MISi7v3qZC-gJUnFD62KGFyt3QCvrhFzbfTpcK9oyFFZxDQPNXKgA7Av7-fCX4UczpGBG4nw3vMyIqTrne7puh6FRaZZNinDIeREeZ67IGw';
    let data = axios.get(webApiUrl, {
        headers: {
            "Authorization": `Bearer ${tokenStr}`
        }
    });
    return data;
}).then(res => {
    console.log(res.data);    
    //find img-src and add url before binding 
    var find = '<img src="';
    var re = new RegExp(find, 'g');
    res.data.BodyContent = res.data.BodyContent.replace(re, '<img src="http://hanhtrinhmouoc.thanhnien.vn');

    //rivet
    rivets.bind($('#rv-binding'), {
        items: res.data
    }) 
    console.log(res.data);
    document.getElementById("fb-like-1").setAttribute("data-href", res.data.Url);
    document.getElementById("fb-like-2").setAttribute("data-href", res.data.Url);
}).catch(err => {
    console.log(err);
})

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}