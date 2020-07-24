var examId;
var patId;
var docId;
var examName;
var examDetails;
var examPatho;
var examRadio;
var labTechId;
var textTestName;
var textDetails;
var textLabId;
var textpatId;
var textdocId;
var fName;
var lName;


var fnameInp;
var lnameInp;

var testPathoId21;

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
    examId=sessionStorage.getItem("examinationId");
    var url="http://localhost:8080/examinations/"+examId;
    var httpObj=createCORSRequest("GET",url);
    textTestName=document.getElementById("pathoTest");
    textDetails=document.forms["testDetails"]["examDetails"];
    textpatId=document.forms["testDetails"]["patId"];
    textLabId=document.forms["testDetails"]["empId"];
    textdocId=document.forms["testDetails"]["docId"];
    fnameInp=document.forms["testDetails"]["empFirstNameInp"];
    document.getElementById("headerTag").style.display="none";
    lnameInp=document.forms["testDetails"]["empLastNameInp"];
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
            labTechId=data.labTechId;
            examDetails=data.examDetails;
            examPatho=data.examPathoId;
            examRadio=data.examRadioId;
            examName=data.examName;
            docId=data.docId;
            textpatId.value=patId;
            textdocId.value=docId;
        }
    }
    httpObj.send();
    
}

function returnEvent()
{
    sessionStorage.setItem("examinationId","");
    window.location.href="assignSubTest.html";
}


function displayTable(value)
{
    if(value.empDesig!="PATHOLOGIST")
        return;
    
    var row=tabEle.insertRow();
    var cell1=row.insertCell();
    var cell2=row.insertCell();
    cell1.innerHTML=value.empFirstName+" "+value.empLastName;
    cell2.innerHTML=value.empId;
    
}
function checkData()
{
    if(this.readyState==4 && this.status==200)
    {
        var getJsonData=JSON.parse(this.responseText);
        if(getJsonData==null)
        {
            window.alert("No Data To display");
            document.getElementById("headerTag").style.display="none";
            return;
        }
        else if(getJsonData.length==0)
        {
            window.alert("No Data To display");
            document.getElementById("headerTag").style.display="none";
            return;
        }
        document.getElementById("headerTag").style.display="block";
        var listt=0;
        var tabEle=document.getElementById("searchResults");
        var innerString="<tr><th></th><th>Pathologist Id</th><th>Pathologist Name</th></tr>"
        for(var i=0;i<getJsonData.length;i++)
        {
            if(getJsonData[i].empDesig=="PATHOLOGIST")
            {
                
                if(listt==0)
                    innerString+="<tr><td><input type=\"radio\" name=\"testStatus\" value=\""+getJsonData[i].empId+"\" checked></td><td>"+getJsonData[i].empId+"</td><td>"+getJsonData[i].empFirstName+" "+getJsonData[i].empLastName+"</td></tr>";
                else
                    innerString+="<tr><td><input type=\"radio\" name=\"testStatus\" value=\""+getJsonData[i].empId+"\"></td><td>"+getJsonData[i].empId+"</td><td>"+getJsonData[i].empFirstName+" "+getJsonData[i].empLastName+"</td></tr>";
                listt++;
            }
        }
        tabEle.innerHTML=innerString;
    }
}

function deleteRows()
{
    var table=document.getElementById("searchResults");
    table.innerHTML="<tr><th>Pathologist Name</th><th>Employee Id</th></tr>";
}
function listPathologists()
{
    deleteRows();
    var url="http://localhost:8080/employees";
    if(fnameInp.value=="" && lnameInp.value=="")
        url+="";
    else if(fnameInp.value!="" && lnameInp.value=="")
        url+="/searchName?firstName="+fnameInp.value;
    else if(fnameInp.value=="" && lnameInp.value!="")
        url+="/searchName?lastName="+lnameInp.value;
    else
        url+="/searchName?firstName="+fnameInp.value+"&lastName="+lnameInp.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=checkData
    httpObj.send();
    return false;   
}

function validate()
{
    if(textLabId.value=="")
        {
            window.alert("Enter Pathologist Id");
            return false;
        }
    return true;
    
}

function addData()
{
    if(textDetails.value=="" || document.forms["testDetails"]["testStatus"]==null )
    {
        window.alert("Test Details or Pathologist Data Missing");
        return false;
    }
    var url1="http://localhost:8080/examinationPathos";
    var httpObj1=createCORSRequest("POST",url1);
    httpObj1.setRequestHeader("Content-type","application/json");
    httpObj1.onload=function()
    {
        if(this.readyState==4 && this.status==201)
        {
            testPathoId21=this.responseText;
            var url2="http://localhost:8080/examinations/test-update";
            var httpObj2=createCORSRequest("PUT",url2);
            httpObj2.setRequestHeader("Content-type","application/json"); 
            httpObj2.onload=function()
            {
                if(this.readyState==4 && this.status==200)
                {
                    window.alert("Test Added Successfully");
                    sessionStorage.setItem("examinationId","");
                    window.location.href="assignSubTest.html";
                }
            };
            var jsonData=JSON.stringify({
                "examId" : examId ,
                "patId" : patId , 
                "docId" : docId , 
                "examName" : examName ,
                "examDetails" : examDetails ,
                "examRes" : 0 ,
                "examRadioId" : examRadio,
                "examPathoId" : testPathoId21,
                "labTechId" : labTechId
            });
            httpObj2.send(jsonData);
        }
    };
    var jsonData=JSON.stringify({
        "examPathoName" : textTestName.value , 
        "examPathoDetails" : textDetails.value ,
        "patId" : textpatId.value ,
        "docId" : textdocId.value ,
        "empId" : document.forms["testDetails"]["testStatus"].value ,
        "examStatus" : document.getElementById("pathoTestStat").value,
        "examPathoRes" : 0 });
    httpObj1.send(jsonData);
}

function goBack()
{
    sessionStorage.removeItem("examinationId");
    window.location.href="assignSubTest.html";
}
