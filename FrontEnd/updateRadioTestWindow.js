var examRadioId;
var radioTestName;
var radioTestDetails;
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
    if(sessionStorage.getItem("empId")==null || sessionStorage.getItem("examRadioId")==null)
        window.location.href="loginPrompt.html";
    console.log(sessionStorage.getItem("empId")+":"+sessionStorage.getItem("examPathoId"));
    examRadioId=sessionStorage.getItem("examRadioId");
    radioTestName=document.forms["testDetails"]["radioTest"];
    radioTestDetails=document.forms["testDetails"]["examDetails"];
    resId=document.forms["testDetails"]["testRes"];
    var url="http://localhost:8080/examinationRadios/"+examRadioId;
    testStatusInput=document.forms["testDetails"]["radioTestStat"];
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
            docId=data.docId;
            empId=data.empId;
            radioTestDetails.value=data.examRadioDetails;
            radioTestName.value=data.examRadioName;
            testStatusInput.value=data.examStatus;
            resultId=data.examRadioRes;   
            
            if(resultId==0)
                resId.value="Not Uploaded";
            else
                resId.value="Uploaded";
            
        }
    }
    httpObj.send();
    
}

function updateTestRadio(id)
{
    var url="http://localhost:8080/examinationRadios";
    var objHttp=createCORSRequest("PUT",url);
    objHttp.setRequestHeader("Content-type","application/json");
    objHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            console.log("Updated"+this.responseText);
            window.alert("Results Updated Successfully");
            sessionStorage.removeItem("examRadioId");
            window.location.href="updateRadioTest.html";
        }
    }
    var data=JSON.stringify({
        "examRadioId" : examRadioId ,
        "examRadioName" : radioTestName.value ,
        "examRadioDetails" : radioTestDetails.value, 
        "patId" : patId ,
        "empId" : empId ,
        "docId" : docId ,
        "examStatus" : testStatusInput.value,
        "examRadioRes" : id
    });
    console.log("JSON Radio:"+data);
    objHttp.send(data);
    
}

function uploadDoc()
{
    var fileData=new FormData;
    if(document.forms["testDetails"]["resUpload"].value=="")
    {
        updateTestRadio(resultId);
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
                updateTestRadio(downId);
            }
    };
    httpObj1.send(fileData);
    return false;
}

function goBack()
{
    sessionStorage.removeItem("examRadioId");
    window.location.href="updateRadioTest.html";
    console.log(window.location.href);
    return false;
}