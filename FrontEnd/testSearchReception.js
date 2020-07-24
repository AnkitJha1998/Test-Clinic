var testId;
var patName;
var labTechName;
var patId;
var labId;
var tableEle;
var examName;
var examDetails;
var divTable;

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
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    testId=document.forms["searchBox"]["testId"];
    tableEle=document.getElementById("searchParam");
    divTable=document.getElementById("displayTable");
    divTable.style.display="none";
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
                    toBeHtml+="<tr><td class=\"top\">Test Name</td><td class=\"top\">"+examName+"</td></tr>";
                    toBeHtml+="<tr><td class=\"top\">Exam Details</td><td class=\"top\">"+examDetails+"</td></tr>";
                    toBeHtml+="<tr><td class=\"top\">Patient Name</td><td class=\"top\">"+patName+"</td></tr>";
                    toBeHtml+="<tr><td class=\"top\">Lab Technician Name</td><td class=\"top\">"+labTechName+"</td></tr>";
                    divTable.style.display="block";
                    tableEle.innerHTML=toBeHtml;
                    
                }
            }
            httpObj.send();
        }
    }
    httpObj.send();
    
}


function loadTest()
{
    if(testId.value=="")
    {
        window.alert("No Id Entered");
        return;
    }
    if(isNaN(testId.value))
        {
            window.alert("Entered Id not an integer");
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
                window.alert("Test Does Not Exist");
                return;
            }
            patId=data.patId;
            labId=data.labTechId;
            console.log("Values:"+data.patId+" "+data.labTechId)
            examDetails=data.examDetails;
            examName=data.examName;
            obtainNames();
            
        }
    }
    httpObj.send();
    
}

function logOut()
{
    sessionStorage.clear();
}
