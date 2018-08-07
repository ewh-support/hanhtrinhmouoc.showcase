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
        'v7lk50GPXHeUlMkzzNA5EG-6EV6kMXKYKW0HMYteBJUajrdxk6kjb0IJqNiLzTWMDEAiR_DL_ZlQH9gkPpHsK3qtxh3T5kO-9z_dYUiTzBrOeFL2IRMpiq-sc5RxiyP4WpIk5X3OzWPNPzjtUKaFAQLfEK4LatFhvQbJ-MmuCcCRguK0tzGPj5giHQvHACrOkxag3AlyJuMKTkbZ2zqfoOht9VFuitOpKxEmso7jWRkNkadujjJiIhzFDt4DgIVJ-WDtE5lUBq-Fk1BfpoFeXE65Py132mmWp3HYXhYuR7zhZVGeYTyrGIupRsLsociHa2SwQYHH7Tw9lQSfs3lN89FTmpB3PNM9o5NAiy7FspHEkGcCJpD3lgi94QqqSvnWqW7St860WD030CfuTBjtU0ZqzW4jfEHg5xPlYRP8uGUJb2Xvp_wg_KZ5W7-nfJ5OEelri1oYSZ6V0eQk-ibNos_PqKoXAFZRs_fixDO5rcvwEv7a6zH2A9zny3PBw3vIjL1TIwPpvfRSRxcpALtwJw';
    let data = axios.get(webApiUrl, {
        headers: {
            "Authorization": `Bearer ${tokenStr}`
        }
    });
    return data;
}).then(res => {
    console.log('res.data', res.data);    
    //find img-src and add url before binding 
    var find = '<img src="';
    var re = new RegExp(find, 'g');
    res.data.BodyContent = res.data.BodyContent.replace(re, '<img src="http://hanhtrinhmouoc.thanhnien.vn');

    //rivet
    rivets.bind($('#rv-binding'), {
        items: res.data
    }) 
    //console.log(res.data);

    document.getElementById("fb-like-1").setAttribute("data-href", res.data.Url);
    document.getElementById("fb-like-2").setAttribute("data-href", res.data.Url);
    document.getElementById("fb-comment").setAttribute("data-href", res.data.Url);


}).catch(err => {
    //console.log(err);
})

rivets.formatters.date = function (value) {
    return moment(value).format('DD.MM.YYYY')
}

rivets.binders.src = function (el, value) {
    el.src = value;
};

rivets.binders.href = function (el, value) {
    el.href = '/anh-chi-tiet/?id=' + value
}

//bind-list-related
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

var list_related_9 = jsonObj1.rss.channel.item.slice(0,9);
console.log('list_related_9',list_related_9);

var items = list_related_9.slice(0,3);
events = {
    prevPage: function (e, model) {
        //console.log('prev');
        //console.log('prev | model.current_page', model.current_page);
        
        var numPages = Math.ceil(model.data.length / model.limit);
       // console.log('prev | numPages', numPages);

        model.items = [];
        if (model.current_page > 1) {
            model.current_page--;
            
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }

            if (model.current_page == 1) {
                //btn-prev.style.visibility = "hidden";
                document.getElementById("btn-prev").disabled = true;

            } else {
                //btn-prev.style.visibility = "visible";
                document.getElementById("btn-prev").disabled = false;

            }
        
            if (model.current_page == numPages) {
                //btn-next.style.visibility = "hidden";
                document.getElementById("btn-next").disabled = true;
                
            } else {
                //btn-next.style.visibility = "visible";
                document.getElementById("btn-next").disabled = false;
            }

        }
    },

    nextPage: function (e, model) {
      //  console.log('next');
    //    console.log('next | model.current_page', model.current_page);
        
        var numPages = Math.ceil(model.data.length / model.limit);
        
      //  console.log('next | numPages', numPages);

        model.items = [];
        if (model.current_page < numPages) {
            model.current_page++;
            //change page
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }

            if (model.current_page == 1) {
                //btn-prev.style.visibility = "hidden";
                document.getElementById("btn-prev").disabled = true;

            } else {
                //btn-prev.style.visibility = "visible";
                document.getElementById("btn-prev").disabled = false;

            }
        
            if (model.current_page == numPages) {
                //btn-next.style.visibility = "hidden";
                document.getElementById("btn-next").disabled = true;
                
            } else {
                //btn-next.style.visibility = "visible";
                document.getElementById("btn-next").disabled = false;
            }

        }
      
    }
}

rivets.bind(document.querySelector('#bind-list-related'), {
    items: items,
    data: list_related_9,
    current_page: 1,
    limit: 3,
    controller: events
});