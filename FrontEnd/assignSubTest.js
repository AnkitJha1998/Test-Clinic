var examinationId=0;
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
    document.getElementById("divRes").style.display="none";
}

function loadTest()
{
    var testId=document.forms["idSearch"]["testId"];
    if(isNaN(testId.value))
        {
            window.alert("Entered Id not an integer");
            return false;
        }
    if(testId.value=="")
    {
        window.alert("Id Field Empty");
        document.getElementById("divRes").style.display="none";
        return false;
    }
    var url="http://localhost:8080/examinations/"+testId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var tableEle=document.forms["idSearch"]["testId"];
            var tableEle=document.getElementById("testIdRes");
            var data=JSON.parse(this.responseText);
            if(data==null)
                {
                    window.alert("Test Does not exist");
                    tableEle.innerHTML="";
                    document.getElementById("divRes").style.display="none";
                    return;
                }
            
                document.getElementById("divRes").style.display="block";
                examinationId=data.examId;
                var htmlText="<tr><td class=\"other\">Test Id</td><td class=\"other\">"+data.examId+"</td></tr>";
                htmlText+="<tr><td class=\"other\">Test Name</td><td class=\"other\">"+data.examName+"</td></tr>";
                htmlText+="<tr><td class=\"other\">Test Details</td><td class=\"other\">"+data.examDetails+"</td></tr>";
                if(data.examPathoId==0)
                htmlText+="<tr><td class=\"other\">Pathology Sub-Test</td><td class=\"other\">Not Assigned</td></tr>";
                else
                    htmlText+="<tr><td class=\"other\">Pathology Sub-Test</td><td class=\"other\">"+data.examPathoId+"</td></tr>"
                if(data.examRadioId==0)
                htmlText+="<tr><td class=\"other\">Radiology Sub-Test</td><td class=\"other\">Not Assigned</td></tr>";
                else
                    htmlText+="<tr><td class=\"other\">Radiology Sub-Test</td><td class=\"other\">"+data.examRadioId+"</td></tr>"
                
                tableEle.innerHTML=htmlText;
        }
    }
    httpObj.send();
    return false;
}

function addRadio()
{
    if (examinationId==0)  
    {
        window.alert("Test Id Not Mentioned");
        return;
    }
    sessionStorage.setItem("examinationId",examinationId);
    window.location.href="addRadioSubTest.html";
    document.getElementById("idSearch").innerHTML="";
}

function addPatho()
{
    if (examinationId==0)  
    {
        window.alert("Test Id Not Mentioned");
        return;
    }
    sessionStorage.setItem("examinationId",examinationId);
    window.location.href="addPathoSubTest.html";
    document.getElementById("idSearch").innerHTML="";
}

function logOut()
{
    sessionStorage.clear();
}