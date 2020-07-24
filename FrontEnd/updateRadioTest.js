var testId;
var tableEle;

var patId;
var patName;

var empId;
var empTechName;

var docId;
var docName;

var examName;
var examDetails;
var examRes;

var examStatus;

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

window.onload=function(){
    
    testId=document.forms["idSearch"]["testId"];
    tableEle=document.getElementById("testIdRes");
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    document.getElementById("divHeader1").style.display="none";
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
            var url1="http://localhost:8080/employees/"+empId;
            var httpObj1=createCORSRequest("GET",url1);
            httpObj1.open("GET",url1,true);
            httpObj1.onload=function()
            {       
                if(this.readyState=4 && this.status==200)
                {
                    var data=JSON.parse(this.responseText);
                    empTechName=data.empFirstName+" "+data.empLastName;
                    
                    var url2="http://localhost:8080/doctors/"+docId;
                    var httpObj2=createCORSRequest("GET",url2);
                    httpObj2.open("GET",url2,true);
                    httpObj2.onload=function()
                    {       
                        if(this.readyState=4 && this.status==200)
                        {
                            var data=JSON.parse(this.responseText);
                            docName=data.docFirstName+" "+data.docLastName;
                            
                            var toBeHtml="";
                            toBeHtml+="<tr><th class=\"other\">Pathology Test Name</th><td class=\"other\">"+examName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Pathology Test Details</th><td class=\"other\">"+examDetails+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Patient Name</th><td class=\"other\">"+patName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Doctor Name</th><td class=\"other\">"+docName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Pathologist Name</th><td class=\"other\">"+empTechName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Test Status</th><td class=\"other\">"+examStatus+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Test Results</th><td class=\"other\">";
                            if(examRes==0)
                                toBeHtml+="Not Uploaded";
                            else
                                toBeHtml+="Uploaded";
                            toBeHtml+="</td></tr>";
                            tableEle.innerHTML=toBeHtml;
                            
                        }
                    }
                    httpObj2.send();
                    
                }
            }
            httpObj1.send();
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
    var url="http://localhost:8080/examinationRadios/"+testId.value;
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
                     document.getElementById("divHeader1").style.display="none";
                    tableEle.innerHTML="";
                    return;
                }
            document.getElementById("divHeader1").style.display="block";
            patId=data.patId;
            empId=data.empId;
            docId=data.docId;
            
            examDetails=data.examRadioDetails;
            examName=data.examRadioName;
            examRes=data.examRadioRes;
            examStatus=data.examStatus;
            obtainNames();
            
        }
    }
    httpObj.send();
    
}

function examUpdate()
{
    if(testId.value=="")
    {
        window.alert("Search for a test to update");
        return;
    }
    sessionStorage.setItem("examRadioId",testId.value);
    window.location.href="updateRadioTestWindow.html";
}

function logOut()
{
    sessionStorage.clear();
}




