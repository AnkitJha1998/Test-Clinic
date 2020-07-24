var examPathoId;
var pathoTestName;
var pathoTestDetails;
var patId;
var docId;
var empId;
var resId;
var resultId;
var testStatus;
var testStatusInput;

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

  } 
    else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}



window.onload=function()
{
    if(sessionStorage.getItem("empId")==null || sessionStorage.getItem("examPathoId")==null)
        window.location.href="loginPrompt.html";
    console.log(sessionStorage.getItem("empId")+":"+sessionStorage.getItem("examPathoId"));
    examPathoId=sessionStorage.getItem("examPathoId");
    pathoTestName=document.forms["testDetails"]["pathoTest"];
    pathoTestDetails=document.forms["testDetails"]["examDetails"];
    resId=document.forms["testDetails"]["testRes"];
    var url="http://localhost:8080/examinationPathos/"+examPathoId;
    var httpObj=createCORSRequest("GET",url);
    testStatusInput=document.forms["testDetails"]["pathoTestStat"];
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
            docId=data.docId;
            empId=data.empId;
            testStatus=data.examStatus;
            pathoTestDetails.value=data.examPathoDetails;
            pathoTestName.value=data.examPathoName;
            testStatusInput.value=data.examStatus;
            resultId=data.examPathoRes;
            
            if(resultId==0)
                resId.value="Not Uploaded";
            else
                resId.value="Uploaded";
            
        }
    }
    httpObj.send();
    
}

function updateTestPatho(id)
{
    var url="http://localhost:8080/examinationPathos";
    var objHttp=createCORSRequest("PUT",url);
    objHttp.setRequestHeader("Content-type","application/json");
    objHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            console.log("Updated"+this.responseText);
            window.alert("Results Updated Successfully");
            sessionStorage.removeItem("examPathoId");
            window.location.href="updatePathoTest.html";
        }
    }
    var data=JSON.stringify({
        "examPathoId" : examPathoId ,
        "examPathoName" : pathoTestName.value ,
        "examPathoDetails" : pathoTestDetails.value, 
        "patId" : patId ,
        "empId" : empId ,
        "docId" : docId ,
        "examStatus" : testStatusInput.value,
        "examPathoRes" : id
    });
    console.log("JSON Patho:"+data);
    objHttp.send(data);
    
}

function uploadDoc()
{
    var fileData=new FormData;
    if(pathoTestDetails.value=="")
    {
        window.alert("Enter Test Details Also");
        return false; 
    }
    if(document.forms["testDetails"]["resUpload"].value=="")
    {
        updateTestPatho(resultId);
        return;
    }
    else{
        var fileName=document.forms["testDetails"]["resUpload"].value;
        var ext=fileName.substring(fileName.lastIndexOf('.')+1) ;
        console.log("Extension:" + ext);            
        if( ext!="pdf" )
        {
            window.alert("File not in Pdf Format");
            return;
        }
    }
    
    fileData.append("file",document.forms["testDetails"]["resUpload"].files[0])
    var url="http://localhost:8080/documents";
    var httpObj1=createCORSRequest("POST",url);
    httpObj1.onload=function()
    {
        if(this.readyState==4 && this.status==200)
            {
                var downId=this.responseText;
                updateTestPatho(downId);
            }
    };
    httpObj1.send(fileData);
    return false;
}

function goBack()
{
    sessionStorage.removeItem("examPathoId");
    window.location.href="updatePathoTest.html";
    console.log(window.location.href);
    return false;
}