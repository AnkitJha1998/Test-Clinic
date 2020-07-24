var testId;
var testName;
var testDetails;
var patId;
var labTechId;
var jsonDatUpdate;
var tableEle;
var div1,div2,div3,divUpdate;
var myId;
var testName,testDetails;
var currentDiv;
var currentId;

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

function toggle(integers)
{
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
    divUpdate.style.display="none";
    tableEle.innerHTML="";
    if(integers==1){
        currentDiv=1;
        div1.style.display="block";
        
    }
    else if(integers==2){
        currentDiv=2;
        div2.style.display="block";
        loadList();
    }
    else {
        currentDiv=3;
        div3.style.display="block";
        
    }    
}

window.onload=function()
{
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    else
        myId=sessionStorage.getItem("empId");
    testId=document.forms["testDet"]["testId"];
    testName=document.forms["testDet"]["testName"];
    testDetail=document.forms["testDet"]["testDetails"];
    patId=document.forms["testDet"]["patId"];
    labTechId=document.forms["testDet"]["labTechId"];
    div1=document.getElementById("patIdDiv");
    div2=document.getElementById("toMeDiv");
    div3=document.getElementById("labTechIdDiv");
    divUpdate=document.getElementById("editDetails");
    tableEle=document.getElementById("searchRes");
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
    divUpdate.style.display="none";
    testName=document.forms["testDet"]["testName"];
    testDetail=document.forms["testDet"]["testDetails"];
}

function updateData()
{
    tableEle.innerHTML="";
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
    divUpdate.style.display="block";
    testName.value=jsonDatUpdate.examName;
    testDetail.value=jsonDatUpdate.examDetails;    
}

function updateTest(testId)
{
    var url="http://localhost:8080/examinations/"+testId;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            jsonDatUpdate=JSON.parse(this.responseText);
            console.log(jsonDatUpdate);
            updateData();
        }
    }
    httpObj.send();
    return false;
}

function loadLabTechSearch()
{
    if(labTechId.value=="")
    {
        window.alert("Id Not Entered");
        return false;
    }
    if(isNaN(labTechId.value==""))
    {
        window.alert("Entry not an integer");
        return false;
    }
    currentId=labTechId.value;
    var url="http://localhost:8080/examinations/labTech-test?labTechId="+labTechId.value;
    console.log(url);
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var innerStrin="<tr><th class=\"other\">Test Id</th><th class=\"other\">Test Name</th><th class=\"other\">Test Details</th><th class=\"other\"></th></tr>";
            var json=JSON.parse(this.responseText);
            if(json==null)
            {
                innerStrin="";
                return;
            }
            for(var i=0;i<json.length;i++)
            {
                    innerStrin+="<tr><td class=\"other\">"+json[i].examId+"</td><td class=\"other\">"+json[i].examName+"</td><td class=\"other\">"+json[i].examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"Update\" onclick=\"return updateTest("+json[i].examId+")\" style=\"border-radius:20px;\"></td></tr>";   
            }
            tableEle.innerHTML=innerStrin;
        }
    }
    httpObj.send();
    return false;
}

function loadPatSearch()
{
    if(patId.value=="")
    {
        window.alert("Id Not Entered");
        return;
    }
    if(isNaN(patId.value)==true)
    {
        window.alert("Entered Value Not an Integer");
        return;
    }
    currentId=patId.value;
    var url="http://localhost:8080/examinations/patient-test?patientId="+patId.value;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var innerStrin="<tr><th class=\"other\">Test Id</th><th class=\"other\">Test Name</th><th class=\"other\">Test Details</th><th class=\"other\"></th></tr>";
            var json=JSON.parse(this.responseText);
            if(json==null)
            {
                innerStrin="";
                return;
            }
            for(var i=0;i<json.length;i++)
            {
                    innerStrin+="<tr><td class=\"other\">"+json[i].examId+"</td><td class=\"other\">"+json[i].examName+"</td><td class=\"other\">"+json[i].examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"Update\" onclick=\"return updateTest("+json[i].examId+")\" style=\"border-radius:20px;\"></td></tr>";
            }
            tableEle.innerHTML=innerStrin;
        }
    }
    httpObj.send();
    return false;
}

function loadList()
{
    var url="http://localhost:8080/examinations/labTech-test?labTechId="+myId;
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var innerStrin="<tr><th class=\"other\">Test Id</th><th class=\"other\">Test Name</th><th class=\"other\">Test Details</th><th class=\"other\"></th></tr>";
            var json=JSON.parse(this.responseText);
            if(json==null)
            {
                innerStrin="";
                return;
            }
            for(var i=0;i<json.length;i++)
            {
                if(json[i].labTechId==myId)
                {
                    innerStrin+="<tr><td class=\"other\">"+json[i].examId+"</td><td class=\"other\">"+json[i].examName+"</td><td class=\"other\">"+json[i].examDetails+"</td><td class=\"other\"><input type=\"button\" value=\"Update\" onclick=\"return updateTest("+json[i].examId+")\" style=\"border-radius:20px;\"></td></tr>";
                }
            }
            tableEle.innerHTML=innerStrin;
        }
    }
    httpObj.send();
    return false;
}

function updateFunction()
{
    if(testName.value=="")
    {
        window.alert("Test Not Mentioned");
        return false;
    }
    var url2="http://localhost:8080/examinations/test-update";
    var httpObj2=createCORSRequest("PUT",url2);
    httpObj2.setRequestHeader("Content-type","application/json");
    httpObj2.onload=function()
    {
        if(this.readyState==4 && this.status==200)
            {
                var idExam=this.responseText;
                console.log("ID:",idExam);
                window.alert("Test Updated Successfully");
                window.location.href="labTechnician.html";
            }
        else
            {
                window.alert("Error"+ this.responseText);
            }
    }
    var jsonData=JSON.stringify({"examId":jsonDatUpdate.examId,"patId" : jsonDatUpdate.patId , "docId" : jsonDatUpdate.docId , "examName" : testName.value, "examDetails" : testDetail.value , "examRes" : 0 , "examRadioId" : jsonDatUpdate.examRadioId , "examPathoId" : jsonDatUpdate.examPathoId , "labTechId" : jsonDatUpdate.labTechId });
    httpObj2.send(jsonData);
}

function logOut()
{
    sessionStorage.clear();
}

function goBack()
{
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="none";
    divUpdate.style.display="none";
    switch (currentDiv)
    {
        case 1:
            div1.style.display="block";
            patId.value=currentId;
            loadPatSearch();
            break;
        case 2:
            loadList();
            break;
        case 3:
            div3.style.display="block";
            labTechId.value=currentId;
            loadLabTechSearch();
            break;
    }
}