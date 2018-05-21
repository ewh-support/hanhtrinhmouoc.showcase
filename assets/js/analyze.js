// console.log('XML2Json');

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

var count1 = 0;
var count2 = 0;
var total_count = 0;
//bài viết, type = 1
//bài ảnh, type = 2
var xmlDoc1 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=1"); // XML
var xmlDoc2 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=2"); // XML
var x2js = new X2JS();
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON
var jsonObj2 = x2js.xml2json(xmlDoc2); // Convert XML to JSON
// console.log(jsonObj1.rss.channel.item);
// console.log(jsonObj2.rss.channel.item);
//console.log(jsonObj1.rss.channel.totalrow);
//console.log(jsonObj2.rss.channel.totalrow);
count1 = jsonObj1.rss.channel.totalrow;
count2 = jsonObj2.rss.channel.totalrow;
total_count = Number(count1) + Number(count2);

span_bai_du_thi = document.getElementById("bai-du-thi");
span_bai_anh = document.getElementById("bai-anh");
span_bai_viet = document.getElementById("bai-viet");
txt_bai_viet = document.createTextNode(count1);
txt_bai_anh = document.createTextNode(count2);
txt_bai_du_thi = document.createTextNode(total_count);
span_bai_viet.appendChild(txt_bai_viet);
span_bai_anh.appendChild(txt_bai_anh);
span_bai_du_thi.appendChild(txt_bai_du_thi);
