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
var x2js = new X2JS();


var xmlDoc1 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=2"); // XML
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON
//console.log(jsonObj1.rss.channel.item);

/* Binding */
rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.binders.href = function (el, value) {
    el.href = '/anh-chi-tiet/?id=' + value;
}

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

rivets.bind($('#bind-bai-anh-moi-nhat'), {
    items: jsonObj1.rss.channel.item[0]
})

rivets.bind($('#bind-new-second'), {
    items: jsonObj1.rss.channel.item[1]
})

var col1Row2 = [];
for (let i = 3; i <= 4; i++) {
    col1Row2.push(jsonObj1.rss.channel.item[i]);
}

var col2Row1 = [];
for (let i = 5; i <= 6; i++) {
    col2Row1.push(jsonObj1.rss.channel.item[i]);
}

rivets.bind($('#bind-col1-row2'), {
    items: col1Row2
})

rivets.bind($('#bind-col2-row1'), {
    items: col2Row1
})

//bài dự thi
var xmlDoc2 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=1"); // XML
var jsonObj2 = x2js.xml2json(xmlDoc2); // Convert XML to JSON
//console.log('obj2', jsonObj2.rss.channel.item);

var newest_blog = [];
for (let i = 0; i < 6; i++) {
    newest_blog.push(jsonObj2.rss.channel.item[i]);
}

rivets.bind($('#bind-bai-viet'), {
    items: newest_blog
})

rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.binders.href = function (el, value) {
    el.href = '/bai-chi-tiet/?id=' + value
}

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

//find 6 ảnh mới nhất
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

var indices = findIndicesOfMax(scoreByPattern, 6);
//console.log(indices);

var list_6_newest_image = [];
for (const iterator of indices) {
    list_6_newest_image.push(jsonObj1.rss.channel.item[iterator]);
}

//console.log('list', list_6_newest_image);

var imgCol1Row2 = [];
for (let i = 2; i <= 3; i++) {
    imgCol1Row2.push(list_6_newest_image[i]);
}

var imgCol2Row1 = [];
for (let i = 4; i <= 5; i++) {
    imgCol2Row1.push(list_6_newest_image[i]);
}
//console.log('img', imgCol2Row1);

rivets.bind($('#bind-newest-image-col1-row1'), {
    items: list_6_newest_image[0]
})
rivets.bind($('#bind-newest-image-col1-row2'), {
    items: imgCol1Row2
})
rivets.bind($('#bind-newest-image-col2-row1'), {
    items: imgCol2Row1
})
rivets.bind($('#bind-newest-image-col2-row2'), {
    items: list_6_newest_image[1]
})