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
var xmlDoc1 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=1"); // XML
var x2js = new X2JS();
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON
//console.log(jsonObj1.rss.channel.item);

/* Binding */
rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.binders.href = function (el, value) {
    el.href = '/bai-chi-tiet/?id=' + value
}

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

rivets.bind($('#bind-bai-viet'), {
    items: jsonObj1.rss.channel.item
})

//bind-newest-blog
var findThreeNewestBlog = jsonObj1.rss.channel.item.map(value => {
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

var findIndicesBlog = findIndicesOfMax(findThreeNewestBlog, 3);
//console.log(indices);

var threeNewestBlog = [];
for (const iterator of findIndicesBlog) {
    threeNewestBlog.push(jsonObj1.rss.channel.item[iterator]);
}

rivets.bind($('#bind-newest-blog'), {
    items: threeNewestBlog
})