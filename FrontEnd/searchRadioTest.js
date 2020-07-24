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
var toBeHtml1="";

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
                            toBeHtml+="<tr><th class=\"other\">Radiology Test Name</th><td class=\"other\">"+examName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Radiology Test Details</th><td class=\"other\">"+examDetails+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Patient Name</th><td class=\"other\">"+patName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Doctor Name</th><td class=\"other\">"+docName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Radiologist Name</th><td class=\"other\">"+empTechName+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Test Status</th><td class=\"other\">"+examStatus+"</td></tr>";
                            toBeHtml+="<tr><th class=\"other\">Test Results</th><td class=\"other\">";
                            if(examRes==0)
                                toBeHtml+="Not Uploaded";
                            else
                                toBeHtml+="<input type=\"button\" style=\"border-radius:20px\" value=\"View Results\" onclick=\"download("+examRes+")\">";
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
        window.alert("Id Field Empty");
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
                    tableEle.innerHTML="";
                    return;
                }
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


function loadAll()
{
    var url="http://localhost:8080/examinationRadios";
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {   
            toBeHtml1="<tr><th class=\"other1\">Test Id</th><th class=\"other1\">Test Name</th><th class=\"other1\">Test Details</th><th class=\"other1\">Test Status</th><th class=\"other1\">Test Results</th></tr>";
            var data1=JSON.parse(this.responseText);
            for(var i=0;i<data1.length;i++){
                data=data1[i];
                patId=data.patId;
                empId=data.empId;
                docId=data.docId;
                
                examDetails=data.examRadioDetails;
                examName=data.examRadioName;
                examRes=data.examRadioRes;
                examStatus=data.examStatus;
                if(examRes!=0)
                    toBeHtml1+="<tr><td class=\"other1\">"+data.examRadioId+"</td><td class=\"other1\">"+examName+"</td><td class=\"other1\">"+examDetails+"</td><td class=\"other1\">"+examStatus+"</td><td class=\"other1\"><input type=\"button\" value=\"View Results\" style=\"border-radius:20px;\" onclick=\"download("+examRes+")\"></td></tr>";
                else
                    toBeHtml1+="<tr><td class=\"other1\">"+data.examRadioId+"</td><td class=\"other1\">"+examName+"</td><td class=\"other1\">"+examDetails+"</td><td class=\"other1\">"+examStatus+"</td><td class=\"other1\">Not Uploaded</td></tr>";
                
            }
            console.log(toBeHtml1);
            tableEle.innerHTML=toBeHtml1;
        }
    }
    httpObj.send();
}

function download(id)
{
    var url="http://localhost:8080/documents/"+id;
    window.open(url);
}


function logOut()
{
    sessionStorage.clear();
}
