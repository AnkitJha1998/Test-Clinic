var tableEle;
function createCORSRequest(method,url)
{
    var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


function boldSettings(values)
{
    switch(values)
    {
        case 1:
            document.getElementById("p1").innerHTML="<b>Add Doctor Details</b>"
            document.getElementById("p2").innerHTML="List All Patients";
            document.getElementById("p3").innerHTML="List All Doctors";
            document.getElementById("p4").innerHTML="List All Employees";
            break;
        case 2:
            document.getElementById("p1").innerHTML="Add Doctor Details"
            document.getElementById("p2").innerHTML="<b>List All Patients</b>";
            document.getElementById("p3").innerHTML="List All Doctors";
            document.getElementById("p4").innerHTML="List All Employees";
            break;
        case 3:
            document.getElementById("p1").innerHTML="Add Doctor Details"
            document.getElementById("p2").innerHTML="List All Patients";
            document.getElementById("p3").innerHTML="<b>List All Doctors</b>";
            document.getElementById("p4").innerHTML="List All Employees";
            break;
        case 4:
            document.getElementById("p1").innerHTML="Add Doctor Details"
            document.getElementById("p2").innerHTML="List All Patients";
            document.getElementById("p3").innerHTML="List All Doctors";
            document.getElementById("p4").innerHTML="<b>List All Employees</b>";
            break;
            
    }
}
function load(val)
{
    if(val==1){
        document.getElementById("1").style.display="block"; 
        document.getElementById("2").style.display="none";
        boldSettings(1);
    }
    else
    {
        document.getElementById("2").style.display="block"; 
        document.getElementById("1").style.display="none";
        if(val==2){
            boldSettings(2);
            loadPatientData();
        }
        if(val==3){
            boldSettings(3);
            loadDoc();
        }
        if(val==4){
            boldSettings(4);
            loadEmp();
        }
    }
}

window.onload=function(){
    load(1);
    tableEle=document.getElementById("listData");
    document.getElementById("p1").innerHTML="<b>Add Doctor Details</b>";
    if(sessionStorage.getItem("empUsername")==null)
        window.location.href="loginPrompt.html";
    else
        console.log(sessionStorage.getItem("empUsername"));
}

function storeDoctorData()
{
    var Fname=document.forms["docDetails"]["docFirstName"];
    var Lname=document.forms["docDetails"]["docLastName"];
    var phone=document.forms["docDetails"]["docPhone"];
    var address=document.forms["docDetails"]["docAddr"];
    var hospName=document.forms["docDetails"]["hospName"];
    
    if(Fname.value=="" || Lname.value=="" || phone.value=="" || hospName.value=="" )
    {
        window.alert("Fields Empty")
    }
    var url="http://localhost:8080/doctors";
    var xmlHttp=createCORSRequest("POST",url);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==201)
        {
            Fname.value="";
            Lname.value="";
            phone.value="";
            address.value=""; 
            hospName.value=""; 
            window.alert("Doctor Data Saved Successfully. Doctor Id : "+this.responseText);
        }
    }
    var jsonDat=JSON.stringify({
        "docFirstName" : Fname.value,
        "docLastName" : Lname.value,
        "docPhone" : phone.value,
        "docAddress" : address.value,
        "hospName" : hospName.value
    });
    console.log("This is Saved: "+jsonDat);
    xmlHttp.send(jsonDat);
    return false;
}

function loadPatientData()
{
    tableEle.innerHTML="";
    var url="http://localhost:8080/patients";
    var xmlHttp=createCORSRequest("GET",url);
    xmlHttp.open("GET",url,true);
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var strEle="<tr><th>PatID</th><th>Name</th><th>Phone</th><th>Address</th><th>Allergies</th><th>Energency Contact Name</th><th>Emergency Contact Phone</tr>";
            var jsonArr=JSON.parse(this.responseText);
            for(var i=0;i<jsonArr.length;i++)
            {
                strEle+="<tr><td>"+jsonArr[i].patId+"</td><td>"+jsonArr[i].patFirstName+" "+jsonArr[i].patLastName+"</td><td>"+jsonArr[i].patPhone+"</td><td>"+jsonArr[i].patAddr+"</td><td>"+jsonArr[i].patAllergies+"</td><td>"+jsonArr[i].patEmergencyName+"</td><td>"+jsonArr[i].patEmergencyPhone+"</td></tr>"
            }
            tableEle.innerHTML=strEle;
        }
    }
    xmlHttp.send();
}

function loadDoc()
{
    tableEle.innerHTML="";
    var url="http://localhost:8080/doctors";
    var xmlHttp=createCORSRequest("GET",url);
    xmlHttp.open("GET",url,true);
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var strEle="<tr><th>DocID</th><th>Name</th><th>Phone</th><th>Hopital Name</th><th>Address</th></tr>";
            var jsonArr=JSON.parse(this.responseText);
            
            for(var i=0;i<jsonArr.length;i++)
            {
                strEle+="<tr><td>"+jsonArr[i].docId+"</td><td>"+jsonArr[i].docFirstName+" "+jsonArr[i].docLastName+"</td><td>"+jsonArr[i].docPhone+"</td><td>"+jsonArr[i].hospName+"</td><td>"+jsonArr[i].docAddress+"</td></tr>"
            }
            tableEle.innerHTML=strEle;
        }
    }
    xmlHttp.send();
}

function loadEmp()
{
    tableEle.innerHTML="";
    var url="http://localhost:8080/employees";
    var xmlHttp=createCORSRequest("GET",url);
    xmlHttp.open("GET",url,true);
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var strEle="<tr><th>EmpID</th><th>Name</th><th>Phone</th><th>Address</th><th>Username</th><th>Designation</th></tr>";
            var jsonArr=JSON.parse(this.responseText);
            for(var i=0;i<jsonArr.length;i++)
            {
                strEle+="<tr><td>"+jsonArr[i].empId+"</td><td>"+jsonArr[i].empFirstName+" "+jsonArr[i].empLastName+"</td><td>"+jsonArr[i].empPhone+"</td><td>"+jsonArr[i].empAddr+"</td><td>"+jsonArr[i].empUsername+"</td><td>"+jsonArr[i].empDesig+"</td></tr>"
            }
            tableEle.innerHTML=strEle;
        }
    }
    xmlHttp.send();
}

function logOut()
{
    sessionStorage.clear();
    console.log("User:"+sessionStorage.getItem("empUsername"));
}