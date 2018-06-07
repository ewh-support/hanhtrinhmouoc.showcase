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

//get 3 image top shares
var scoreByPattern = jsonObj1.rss.channel.item.map(value => {
    return value.numofshares;
})

function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i);
        if (outp.length > count) {
            outp.sort(function (a, b) {
                return inp[b] - inp[a];
            });
            outp.pop();
        }
    }
    return outp;
}

//console.log(scoreByPattern);

var indices = findIndicesOfMax(scoreByPattern, 3);
//console.log(indices);

var list_3_newest_image = [];
for (const iterator of indices) {
    list_3_newest_image.push(jsonObj1.rss.channel.item[iterator]);
}

var imgCol2 = [];
for (let i = 1; i <= 2; i++) {
    imgCol2.push(list_3_newest_image[i]);
}
console.log('img', imgCol2);

rivets.bind($('#bind-newest-image-col1'), {
    items: list_3_newest_image[0]
})
rivets.bind($('#bind-newest-image-col2'), {
    items: imgCol2
})
