function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send();
    return xhttp.responseXML;
}
var xmlDoc1 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=2"); // XML
var x2js = new X2JS();
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON
console.log(jsonObj1.rss.channel.item);

/* Binding */
rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

rivets.bind($('#bind-bai-anh'), {
    items: jsonObj1.rss.channel.item
})
