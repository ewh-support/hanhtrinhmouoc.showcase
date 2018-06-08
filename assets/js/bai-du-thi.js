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
console.log(jsonObj1.rss.channel);

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

// rivets.bind($('#bind-bai-viet'), {
//     items: jsonObj1.rss.channel.item
// })
var items_bai_viet = jsonObj1.rss.channel.item.slice(0,6);
console.log('items_bai_viet',items_bai_viet);
events = {
    prevPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
        // console.log('numPages', numPages);
        // console.log('model.current_page', model.current_page);
        // console.log('model.data', model.data);
        // console.log('model.item', model.items);
        model.items = [];
        if (model.current_page > 1) {
            model.current_page--;
            
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }
        }
    },

    nextPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
        // console.log('numPages', numPages);
        // console.log('model.current_page', model.current_page);
        // console.log('model.data', model.data);
        // console.log('model.item', model.items);
        model.items = [];
        if (model.current_page < numPages) {
            model.current_page++;
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }
        }
      
    }
}

rivets.bind(document.querySelector('#bind-bai-viet'), {
    items: items_bai_viet,
    data: jsonObj1.rss.channel.item,
    current_page: 1,
    limit: 6,
    controller: events
});



//3 bài nhiều share nhất
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

var findIndicesBlog = findIndicesOfMax(findThreeNewestBlog, 15);
//console.log(indices);

var threeNewestBlog = [];
for (const iterator of findIndicesBlog) {
    threeNewestBlog.push(jsonObj1.rss.channel.item[iterator]);
}

// rivets.bind($('#bind-newest-blog'), {
//     items: threeNewestBlog
// })

//pagination

var items = threeNewestBlog.slice(0,3);

controller = {
    prevPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
        // console.log('numPages', numPages);
        // console.log('model.current_page', model.current_page);
        // console.log('model.data', model.data);
        // console.log('model.item', model.items);
        model.items = [];
        if (model.current_page > 1) {
            model.current_page--;
            
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }
        }
    },

    nextPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
        // console.log('numPages', numPages);
        // console.log('model.current_page', model.current_page);
        // console.log('model.data', model.data);
        // console.log('model.item', model.items);
        model.items = [];
        if (model.current_page < numPages) {
            model.current_page++;
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }
        }
      
    }
}

rivets.bind(document.querySelector('#bind-newest-blog'), {
    items: items,
    data: threeNewestBlog,
    current_page: 1,
    limit: 3,
    controller: controller
});