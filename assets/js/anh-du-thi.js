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
//console.log(jsonObj1.rss.channel.item);

/* Binding */
rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.binders.href = function (el, value) {
    el.href = '/anh-chi-tiet/?id=' + value
}

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

var row1Col2 = [];
var row2Col1 = [];
var row3Col2 = [];

for (let i = 1; i <= 2; i++) {
    row1Col2.push(jsonObj1.rss.channel.item[i]);
}
//console.log(row1Col2);
for (let i = 4; i <= 5; i++) {
    row2Col1.push(jsonObj1.rss.channel.item[i]);
}

for (let i = 7; i <= 8; i++) {
    row3Col2.push(jsonObj1.rss.channel.item[i]);
}

rivets.bind($('#bind-row1-col1'), {
    items: jsonObj1.rss.channel.item[0]
})

rivets.bind($('#bind-row1-col2'), {
    items: row1Col2
})

rivets.bind($('#bind-row2-col1'), {
    items: row2Col1
})

rivets.bind($('#bind-row2-col2'), {
    items: jsonObj1.rss.channel.item[3]
})
rivets.bind($('#bind-row3-col1'), {
    items: jsonObj1.rss.channel.item[6]
})

rivets.bind($('#bind-row3-col2'), {
    items: row3Col2
})