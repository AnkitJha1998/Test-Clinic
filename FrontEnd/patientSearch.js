var patId;
var fName;
var lName;
var div1;
var div2;
var tableEle;
var tableTestEle;

window.onload=function()
{   
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    div1=document.getElementById("nameSearch");
    div2=document.getElementById("idSearch");
    tableEle=document.getElementById("searchRes");
    div1.style.display="none";
    div2.style.display="none";
    fName=document.forms["searchParam"]["fName"];
    lName=document.forms["searchParam"]["lName"];
    patId=document.forms["searchParam"]["patId"];
    tableTestEle=document.getElementById("searchResTests");
     
}

function toggle(val1)
{
    if(val1==1)
    {
        div1.style.display="block";
        div2.style.display="none";
        tableEle.innerHTML="";
        tableTestEle.innerHTML="";
        
    }
    else if(val1==2)
    {
        div2.style.display="block";
        div1.style.display="none";
        tableEle.innerHTML="";
        tableTestEle.innerHTML="";
    }
}
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


function loadTestInfo()
{
    var url="http://localhost:8080/examinations/patient-test?patientId="+patId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            console.log(data);
            if(data.length==0)
            {
                window.alert("No Tests for the User");
                return;
            }
            console.log("data Load");
            var toBeHtml="<tr><th class=\"top\">Test Assigned To This Patient</th></tr>";
            toBeHtml+="<tr><th class=\"top\">Test Id</th><th class=\"top\">Name</th></tr>";
            
            for(var i=0;i<data.length;i++)
            {
                toBeHtml+="<tr><td class=\"top\">"+data[i].examId+"</td><td class=\"top\">"+data[i].examName+"</td></tr>";    
            }
            
            tableTestEle.innerHTML=toBeHtml;
        }
    }
    httpObj.send();
}

function searchById()
{
    if(isNaN(patId.value))
        {
            window.alert("Id Field not having a number")
            return;
        }
    if(patId.value=="")
    {
        window.alert("Fields Empty")
        return;
    }
    var url="http://localhost:8080/patients/"+patId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            if(data==null)
            {
                return;
            }
            var toBeHtml="<tr><th class=\"top\">Search Results</th></tr>";
            toBeHtml+="<tr><td class=\"top\">Patient Name</td><td class=\"top\">"+data.patFirstName+" "+data.patLastName+"</td></tr>";
            toBeHtml+="<tr><td class=\"top\">Patient Phone</td><td class=\"top\">"+data.patPhone+"</td></tr>";
            toBeHtml+="<tr><td class=\"top\">Patient Allergies</td><td class=\"top\">"+data.patAllergies+"</td></tr>";
            toBeHtml+="<tr><td class=\"top\">Patient Emergency Name</td><td class=\"top\">"+data.patEmergencyName+"</td></tr>";
            toBeHtml+="<tr><td class=\"top\">Patient Emergency Contact Details</td><td class=\"top\">"+data.patEmergencyPhone+"</td></tr>";
            tableEle.innerHTML=toBeHtml;
        }
    }
    httpObj.send();
    loadTestInfo();
    
}

function searchByName()
{
    var url="http://localhost:8080/patients/name?";
    if(fName.value!="" && lName.value!="")
        url+="firstName="+fName.value+"&lastName="+lName.value;
    else if(fName.value!="")
        url+="firstName="+fName.value;
    else if(lName.value!="")
        url+="lastName="+lName.value;
    
    console.log("URL Pat Search:"+url);
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            console.log("JSON:"+this.responseText);
            var toBeHtml="<tr><th class=\"top\">Search Results</th></tr><tr><td class=\"top\">Patient Id</td><td class=\"top\">Patient Name</td></tr>";
            tableEle.innerHTML=toBeHtml;
            for(var i=0;i<data.length;i++)
            {
                var row=tableEle.insertRow();
                var cell1=row.insertCell();
                var cell2=row.insertCell();
                cell1.innerHTML=data[i].patId;
                cell1.style="padding:15px;";
                cell2.innerHTML=data[i].patFirstName+" "+data[i].patLastName;
                cell2.style="padding:15px;";
            }
        }
    }
    httpObj.send();
}
function logOut()
{
    sessionStorage.clear();
}