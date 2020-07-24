var patId;
var labTechId;
var testId;
var div1,div2,div3;
var tableEle;
var pathoId;
var radioId;


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

function downloadDocRadio(id)
{
    
    var url="http://localhost:8080/examinationRadios/"+id;
    var httpObj=createCORSRequest("GET",url,true);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            if(data.examRadioRes==0)
            {
                window.alert("No Reports To Download");
                return;
            }
            window.open("http://localhost:8080/documents/"+data.examRadioRes);
        }
    }
    httpObj.send();
}

function downloadDocPatho(id)
{
    var url="http://localhost:8080/examinationPathos/"+id;
    var httpObj=createCORSRequest("GET",url,true);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            if(data.examPathoRes==0)
            {
                window.alert("No Reports To Download");
                return;
            }
            window.open("http://localhost:8080/documents/"+data.examPathoRes);
        }
    }
    httpObj.send();
}

function toggle(integers)
{
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
    tableEle.innerHTML="";
    if(integers==1)
        div1.style.display="block";
    else if(integers==2){
        div2.style.display="block";
       
    }
    else 
        div3.style.display="block";
    pathoId=0;
    radioId=0;
}

window.onload=function()
{
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    testId=document.forms["testDet"]["testId"];
    patId=document.forms["testDet"]["patId"];
    labTechId=document.forms["testDet"]["labTechId"];
    tableEle=document.getElementById("searchRes");
    div1=document.getElementById("patIdDiv");
    div2=document.getElementById("toMeDiv");
    div3=document.getElementById("labTechIdDiv");
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
}

function loadTestSearch()
{
    if(isNaN(testId.value))
        {
            window.alert("Entered Id not an integer");
            return;
        }
    if(testId.value=="")
    {
        window.alert("No ID entered");
        return;
    }
    var url="http://localhost:8080/examinations/"+testId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            console.log("Data::"+data);
            if(data==null){
                window.alert("No Test Data")
                return;
            }
            var innerString="<tr><th class=\"other\">Test Id</th><th class=\"other\">Name</th><th class=\"other\">Test Details</th><th>Pathology Test Reports</th><th>Radiology Test Reports</th></tr>";
            if(data.examPathoId!=0 && data.examRadioId!=0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
            else if(data.examPathoId==0 && data.examRadioId!=0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
            else if(data.examRadioId==0 && data.examPathoId!=0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\">Not Assigned</td></tr>";
            else
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\">Not Assigned</td></tr>";
            tableEle.innerHTML=innerString;
        }
    }
    httpObj.send();
}



function loadLabTechSearch()
{
    if(isNaN(labTechId.value))
        {
            window.alert("Entered Id not an integer");
            return;
        }
    if(labTechId.value=="")
    {
        window.alert("No ID entered");
        return;
    }   
    var url="http://localhost:8080/examinations/labTech-test?labTechId="+labTechId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var data11=JSON.parse(this.responseText);
            console.log(data11.length+"::"+"Data:"+data11);
            if(data11.length==0){
                window.alert("No Test Data");
                return;
            }
            var innerString="<tr><th class=\"other\">Test Id</th><th class=\"other\">Name</th><th class=\"other\">Test Details</th><th>Pathology Test Reports</th><th>Radiology Test Reports</th></tr>";
            
            for(var i=0;i<data11.length;i++)
            {
                pathoId=0;
                radioId=0;
                data=data11[i];
                if(data.examPathoId!=0 && data.examRadioId!=0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
                else if(data.examPathoId==0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
                else if(data.examRadioId==0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\">Not Assigned</td></tr>";
                else
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\">Not Assigned</td></tr>";
            
            }
            tableEle.innerHTML=innerString;
        }
    }
    httpObj.send();
}



function loadPatSearch()
{
    if(isNaN(patId.value))
        {
            window.alert("Entered Id not an integer");
            return;
        }
    if(patId.value=="")
    {
        window.alert("No ID entered");
        return;
    }
    var url="http://localhost:8080/examinations/patient-test?patientId="+patId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var data11=JSON.parse(this.responseText);
            if(data11.length==0){
                window.alert("No Test Data");
                return;
            }
            var innerString="<tr><th class=\"other\">Test Id</th><th class=\"other\">Name</th><th class=\"other\">Test Details</th><th>Pathology Test Reports</th><th>Radiology Test Reports</th></tr>";
            
            for(var i=0;i<data11.length;i++)
            {
                pathoId=0;
                radioId=0;
                data=data11[i];
                if(data.examPathoId!=0 && data.examRadioId!=0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
                else if(data.examPathoId==0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocRadio("+data.examRadioId+")\"></td></tr>";
                else if(data.examRadioId==0)
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"View Results\" onclick=\"return downloadDocPatho("+data.examPathoId+")\"></td><td class=\"other\">Not Assigned</td></tr>";
                else
                innerString+="<tr><td class=\"other\">"+data.examId+"</td><td class=\"other\">"+data.examName+"</td><td class=\"other\">"+data.examDetails+"</td><td class=\"other\">Not Assigned</td><td class=\"other\">Not Assigned</td></tr>";
            
            }
            tableEle.innerHTML=innerString;
        }
    }
    httpObj.send();
}


function obtainNames()
{
    var url="http://localhost:8080/patients/"+patId1;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            patName=jsonData.patFirstName+" "+jsonData.patLastName;
            var url="http://localhost:8080/employees/"+labId1;
            var httpObj=createCORSRequest("GET",url);
            httpObj.open("GET",url,true);
            httpObj.onload=function()
            {       
                if(this.readyState=4 && this.status==200)
                {
                    var data=JSON.parse(this.responseText);
                    labTechName=data.empFirstName+" "+data.empLastName;
                    
                    var toBeHtml="";
                    toBeHtml+="<tr><th>Test Name</th><td>"+examName1+"</td></tr>";
                    toBeHtml+="<tr><th>Exam Details</th><td>"+examDetails1+"</td></tr>";
                    toBeHtml+="<tr><th>Patient Name</th><td>"+patName1+"</td></tr>";
                    toBeHtml+="<tr><th>Lab Technician Name</th><td>"+labTechName1+"</td></tr>";
                    if(testRadio1!=0 || testPatho1!=0)
                    {
                        toBeHtml+="<tr><th>Sub Test Ids</th></tr>"
                        if(testPatho1!=0)
                            toBeHtml+="<tr><th>Pathology Test Id</th><td>"+testPatho1+"</td></tr>";
                        if(testRadio1!=0)
                            toBeHtml+="<tr><th>Radiology Test Id</th><td>"+testRadio1+"</td></tr>";
                    }
                    else
                    {
                        toBeHtml+="<tr><th>No Sub Tests</th></tr>"        
                    }
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
    if(isNaN(testId1.value))
        {
            window.alert("Entered Id not an integer");
            return;
        }
    if(testId1.value=="")
    {
        window.alert("No ID entered");
        return;
    }
    var url="http://localhost:8080/examinations/"+testId1.value;
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
            patId1=data.patId;
            labId1=data.labTechId;
            console.log("Values:"+data.patId+" "+data.labTechId)
            examDetails1=data.examDetails;
            examName1=data.examName;
            testPatho1=data.examPathoId;
            testRadio1=data.examRadioId;
            obtainNames();        
        }
    }
    httpObj.send();
    
}

function downloadTests()
{
    if(tableEle.innerHTML=="")
    {
        window.alert("Search For a Test First");
        return false;
    }
    if(testPatho!=0)
    {
        var url="http://localhost:8080/examinationPathos/"+testPatho;
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
                if(data.examPathoRes==0)
                {
                    window.alert("No Results uploaded for Pathology Test");
                    return;
                }
                var url="http://localhost:8080/documents/"+data.examPathoRes;    
                window.open(url);
            }
        }
        httpObj.send();        
    }
    if(testRadio!=0)
    {
        var url="http://localhost:8080/examinationRadios/"+testRadio;
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
                if(data.examRadioRes==0)
                {
                    window.alert("No Results uploaded for Radiology Test");
                    return;
                }
                var url="http://localhost:8080/documents/"+data.examRadioRes;    
                window.open(url);
            }
        }
        httpObj.send();
    }
    return false;
}

function logOut()
{
    sessionStorage.clear();
}