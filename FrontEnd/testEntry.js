var testName;
var testDetail;
var patientId;
var labTechId;
var docId;
var stringToBeAdded;
var lists;
var labTechFirstName;
var labTechLastName;
window.onload=function()
{
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    testName=document.forms["testDetails"]["examName"];
    testDetail=document.forms["testDetails"]["examDetails"];
    patientId=document.forms["testDetails"]["patId"];
    labTechFirstName=document.forms["testDetails"]["labTechFirstName"];
    labTechLastName=document.forms["testDetails"]["labTechLastName"];
    docId=0;
    lists=0;
    (document.getElementById("headingTag")).style.display="none";
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


function checkData()
{
    if(this.readyState==4 && this.status==200)
    {
        var getJsonData=JSON.parse(this.responseText);
        stringToBeAdded="<tr><th></th><th class=\"top\">EmpId</th><th class=\"top\">Lab Technician Name</th></tr>";
        var tabEle=document.getElementById("searchResults");
        if(getJsonData==null)
        {
            window.alert("No Data To Display");
            return;
        }
        (document.getElementById("headingTag")).style.display="block";   
        for(var i=0;i<getJsonData.length;i++)
        {
            value1=getJsonData[i];
            if(value1.empDesig!="LAB_TECHNICIAN")
                continue;
            if(lists==0)
            {
                stringToBeAdded+="<tr><td><input type=\"radio\" name=\"labTechList\" value=\""+value1.empId+"\" checked></td><td class=\"top\">"+value1.empId+"</td><td class=\"top\">"+value1.empFirstName+" "+value1.empLastName+"</td></tr>";
                lists++;
            }
            else
                stringToBeAdded+="<tr><td><input type=\"radio\" name=\"labTechList\" value=\""+value1.empId+"\" ></td><td class=\"top\">"+value1.empId+"</td><td class=\"top\">"+value1.empFirstName+" "+value1.empLastName+"</td></tr>";
        }
        tabEle.innerHTML=stringToBeAdded;
        
        labTechId=document.forms["testDetails"]["labTechList"];
    }
}


function loadAllLabTechs()
{
    lists=0;
    var url="http://localhost:8080/employees";
    if(labTechFirstName.value=="" && labTechLastName.value=="")
        url="http://localhost:8080/employees";
    else if(labTechFirstName.value!="" && labTechLastName.value=="")
        url+="/searchName?firstName="+labTechFirstName.value;
    else if(labTechFirstName.value=="" && labTechLastName.value!="")
        url+="/searchName?lastName="+labTechLastName.value;
    else
        url+="/searchName?firstName="+labTechFirstName.value+"&lastName="+labTechLastName.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=checkData
    httpObj.send();   
    return false;
    
}

function validate()
{
    if(testName.value=="" || testDetail.value=="" || patientId.value == "" || labTechId.value == "")
    {
        window.alert("Fields Empty");
        return false;
    }
    else if(isNaN(patientId.value) || isNaN(labTechId.value))
    {
        window.alert("Enter integer in Id Fields");
        return false;
    }
    return true;
}

function uploadData()
{
    var url2="http://localhost:8080/examinations";
    var httpObj2=createCORSRequest("POST",url2);
    httpObj2.setRequestHeader("Content-type","application/json");
    httpObj2.onload=function()
    {
        if(this.readyState==4 && this.status==201)
            {
                var idExam=this.responseText;
                console.log("ID:",idExam);
                window.alert("Test Added Successfully, Test Id: "+idExam);
                window.location.href="receptionist.html"
            }
        else
            {
                window.alert("Server Error");
            }
    }
    var jsonData=JSON.stringify({"patId" : patientId.value , "docId" : docId , "examName" : testName.value, "examDetails" : testDetail.value , "examRes" : 0 , "examRadioId" : 0 , "examPathoId" : 0, "labTechId" : parseInt(labTechId.value) });
    httpObj2.send(jsonData);
}

function saveExaminationDetails()
{
    if(validate()==false)
        return;
    var url1="http://localhost:8080/patients/"+patientId.value;
    var httpObj1=createCORSRequest("GET",url1);
    httpObj1.open("GET",url1,true);
    httpObj1.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var patData=JSON.parse(this.responseText);
            docId=patData.patDocId;
            uploadData();
        }
    };
    httpObj1.send();
    
}
function logOut()
{
    sessionStorage.clear();
}
