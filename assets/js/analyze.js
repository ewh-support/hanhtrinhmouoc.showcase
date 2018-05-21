console.log('sumary');
var count1 = 0;
var count2 = 0;
var total_count = 0;
//bài viết, type = 1
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
var xmlDoc2 = loadXMLDoc("http://hanhtrinhmouoc.thanhnien.vn/tinrss?type=2"); // XML
var x2js = new X2JS();
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON
var jsonObj2 = x2js.xml2json(xmlDoc2); // Convert XML to JSON
console.log(jsonObj1);
console.log(jsonObj2);
console.log(jsonObj1.rss.channel.totalrow);
console.log(jsonObj2.rss.channel.totalrow);
count1= jsonObj1.rss.channel.totalrow;
count2= jsonObj2.rss.channel.totalrow;
total_count = Number(count1)+Number(count2);
//console.log(Number(count1)+Number(count2));
//document.getElementById("bai-du-thi").value = Number(count1)+Number(count2);
//document.getElementById("bai-anh").value = jsonObj2.rss.channel.totalrow;
//document.getElementById("bai-viet").value = jsonObj1.rss.channel.totalrow;

span_bai_du_thi = document.getElementById("bai-du-thi");
span_bai_anh = document.getElementById("bai-anh");
span_bai_viet = document.getElementById("bai-viet");
txt_bai_viet = document.createTextNode(count1);
txt_bai_anh = document.createTextNode(count2);
txt_bai_du_thi = document.createTextNode(total_count);
span_bai_du_thi.appendChild(txt_bai_viet);
span_bai_anh.appendChild(txt_bai_anh);
span_bai_viet.appendChild(txt_bai_du_thi);
