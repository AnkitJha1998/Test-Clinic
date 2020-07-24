var testId;
var patName;
var labTechName;
var patId;
var labId;
var testPatho;
var testRadio;
var tableEle;
var examName;
var examDetails;
var tableTestEle;

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


window.onload=function()
{
    testId=document.forms["searchBox"]["testId"];
    tableEle=document.getElementById("searchParam");
    tableTestEle=document.getElementById("searchTestParam");
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
}

function addTestPathoName(pathoId)
{
    if(pathoId==0)
        return;
    var url="http://localhost:8080/examinationPathos/"+pathoId;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            var dat=tableTestEle.innerHTML;
            dat+="<tr><th class=\"other\">Pathology Test Name</th><td class=\"other\">"+jsonData.examPathoName+"</td></tr>";
            tableTestEle.innerHTML=dat;
        }
    }
    httpObj.send();
}

function addTestRadioName(radioId)
{
    if(radioId==0)
        return;
    var url="http://localhost:8080/examinationRadios/"+radioId;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            var dat=tableTestEle.innerHTML;
            dat+="<tr><th class=\"other\">Radiology Test Name</th><td class=\"other\">"+jsonData.examRadioName+"</td></tr>";
            tableTestEle.innerHTML=dat;
        }
    }
    httpObj.send();
}



function obtainNames()
{
    var url="http://localhost:8080/patients/"+patId;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            patName=jsonData.patFirstName+" "+jsonData.patLastName;
            var url="http://localhost:8080/employees/"+labId;
            var httpObj=createCORSRequest("GET",url);
            httpObj.open("GET",url,true);
            httpObj.onload=function()
            {       
                if(this.readyState=4 && this.status==200)
                {
                    var data=JSON.parse(this.responseText);
                    labTechName=data.empFirstName+" "+data.empLastName;
                    
                    var toBeHtml="";
                    toBeHtml+="<tr><th class=\"other\">Test Name</th><td class=\"other\">"+examName+"</td></tr>";
                    toBeHtml+="<tr><th class=\"other\">Exam Details</th><td class=\"other\">"+examDetails+"</td></tr>";
                    toBeHtml+="<tr><th class=\"other\">Patient Name</th><td class=\"other\">"+patName+"</td></tr>";
                    toBeHtml+="<tr><th class=\"other\">Lab Technician Name</th><td class=\"other\">"+labTechName+"</td></tr>";
                    tableEle.innerHTML=toBeHtml;
                    if(testRadio!=0 || testPatho!=0)
                    {
                        tableTestEle.innerHTML="";
                        addTestPathoName(testPatho);
                        addTestRadioName(testRadio);
                    }
                    
                    
                    
                }
            }
            httpObj.send();
        }
    }
    httpObj.send();
    
}


function loadTest()
{
    if(isNaN(testId.value))
        {
            window.alert("Entered Id not an integer");
            return;
        }
    if(testId.value=="")
    {
        window.alert("No Id Entered");
        return;
    }
    var url="http://localhost:8080/examinations/"+testId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            if(data==null)
                {
                    window.alert("Test Does not exist");
                    tableEle.innerHTML="";
                    tableTestEle.innerHTML="";
                    return;
                }
            patId=data.patId;
            labId=data.labTechId;
            console.log("Values:"+data.patId+" "+data.labTechId)
            examDetails=data.examDetails;
            examName=data.examName;
            testPatho=data.examPathoId;
            testRadio=data.examRadioId;
            obtainNames();
            
        }
    }
    httpObj.send();
    
}

function logOut()
{
    sessionStorage.clear();
}