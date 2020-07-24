var patFirstName;
var patLastName;
var patPhone;
var patAddr;
var patAller;
var patEmerName;
var patEmerPhone;
var docId;
var docFirstNameInput;
var docLastNameInput;

var docCheck;
var hospCheck;

var tableEle;
window.onload=function()
{
    if(sessionStorage.getItem("empId")==null)
        window.location.href="loginPrompt.html";
    patFirstName=document.forms["patientSignIn"]["patFirstName"];
    patLastName=document.forms["patientSignIn"]["patLastName"];
    patPhone=document.forms["patientSignIn"]["patPhone"];
    patAddr=document.forms["patientSignIn"]["patAddr"];
    patAller=document.forms["patientSignIn"]["patAller"];
    patEmerName=document.forms["patientSignIn"]["patEmerName"];
    patEmerPhone=document.forms["patientSignIn"]["patEmerPhone"];
    docFirstNameInput=document.forms["patientSignIn"]["docFirstName"];
    docLastNameInput=document.forms["patientSignIn"]["docLastName"];
    document.getElementById("headingTag").style.display="none";
    
    docCheck=-1;
    hospCheck=-1;
    
    tableEle=document.getElementById("docList");
    
    
}

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



function patientDataHandler()
{
    if(this.readyState==4 && this.status==201)
    {
        console.log("JSON Id:"+this.responseText);
        window.alert("Patient Data Added Successfuly Successful, Patient Id:"+this.responseText);
        window.location.href="receptionist.html";
    }
}


function validateData()
{
    if(patFirstName.value=="" || patLastName.value=="" || patPhone.value=="" || patAddr.value=="" || patAller.value=="" || patEmerName.value=="" || patEmerPhone.value=="")
        {
            window.alert("Fields Empty");
            return false;
        }
    else return true;
}

function storePatientData()
{
    if(validateData()==false)
        return;
    var url="http://localhost:8080/patients";
    var httpObj=createCORSRequest("POST",url,true);
    httpObj.setRequestHeader("Content-type","application/json");
    httpObj.onload=patientDataHandler;
    var postDataObj = JSON.stringify({"patFirstName":patFirstName.value, "patLastName":patLastName.value , "patPhone":patPhone.value , "patAddr":patAddr.value , "patAllergies":patAller.value , "patEmergencyName":patEmerName.value , "patEmergencyPhone":patEmerPhone.value , "patDocId": parseInt(docId.value)});
    console.log("JSON::"+postDataObj);
    httpObj.send(postDataObj);
    return false;
}

function logOut()
{
    sessionStorage.clear();
}

function refreshValuesD()
{
    docCheck=-1;
    docId.value="";
    docFirstName.value="";
    docLastName.value="";
    docAddr.value="";
    docPhone.value="";
    return false;
}

function refreshValuesH()
{
    hospCheck=-1;
    hospId.value="";
    hospName.value="";
    hospAddr.value="";
    hospPhone.value="";
    return false;   
}

function doctorList()
{
    tableEle.innerHTML="";
    var url="http://localhost:8080/doctors";
    var xmlHttp=createCORSRequest("GET",url);
    xmlHttp.open("GET",url,true);
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var strEle="<tr><th></th><th>DocID</th><th>Name</th><th>Phone</th><th>Hopital Name</th><th>Address</th></tr>";
            var jsonArr=JSON.parse(this.responseText);
            
            for(var i=0;i<jsonArr.length;i++)
            {   
                if(i==0)
                    strEle+="<tr><td style=\"padding:15px;\"><input type=\"radio\" name=\"docIdList\" value=\""+jsonArr[i].docId+"\" checked></td><td style=\"padding:15px;\">"+jsonArr[i].docId+"</td><td style=\"padding:15px;\">"+jsonArr[i].docFirstName+" "+jsonArr[i].docLastName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docPhone+"</td><td style=\"padding:15px;\">"+jsonArr[i].hospName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docAddress+"</td></tr>";
                else
                    strEle+="<tr><td style=\"padding:15px;\"><input type=\"radio\" name=\"docIdList\" value=\""+jsonArr[i].docId+"\"></td><td style=\"padding:15px;\">"+jsonArr[i].docId+"</td><td style=\"padding:15px;\">"+jsonArr[i].docFirstName+" "+jsonArr[i].docLastName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docPhone+"</td><td style=\"padding:15px;\">"+jsonArr[i].hospName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docAddress+"</td></tr>";
            }
            tableEle.innerHTML=strEle;
            docId=document.forms["patientSignIn"]["docIdList"];
        }
    }
    xmlHttp.send();
}

function docNameList()
{
    tableEle.innerHTML="";
    var url="http://localhost:8080/doctors";
    if(docFirstNameInput.value=="" && docLastNameInput.value=="")
        url="http://localhost:8080/doctors";
    else if(docFirstNameInput.value!="" && docLastNameInput.value=="")
        url+="/doctor-name?firstName="+docFirstNameInput.value;
    else if(docFirstNameInput.value=="" && docLastNameInput.value!="")
        url+="/doctor-name?lastName="+docLastNameInput.value;
    else
        url+="/doctor-name?firstName="+docFirstNameInput.value+"&lastName="+docLastNameInput.value;
    var xmlHttp=createCORSRequest("GET",url);
    xmlHttp.open("GET",url,true);
    xmlHttp.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var strEle="<tr><th></th><th>DocID</th><th>Name</th><th>Phone</th><th>Hopital Name</th><th>Address</th></tr>";
            var jsonArr=JSON.parse(this.responseText);
            if(this.responseText==null)
            {
                window.alert("No Data Available");
                return;
            }
            document.getElementById("headingTag").style.display="block";
            for(var i=0;i<jsonArr.length;i++)
            {   
                if(i==0)
                    strEle+="<tr><td style=\"padding:15px;\"><input type=\"radio\" name=\"docIdList\" value=\""+jsonArr[i].docId+"\" checked></td><td style=\"padding:15px;\">"+jsonArr[i].docId+"</td><td style=\"padding:15px;\">"+jsonArr[i].docFirstName+" "+jsonArr[i].docLastName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docPhone+"</td><td style=\"padding:15px;\">"+jsonArr[i].hospName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docAddress+"</td></tr>";
                else
                    strEle+="<tr><td style=\"padding:15px;\"><input type=\"radio\" name=\"docIdList\" value=\""+jsonArr[i].docId+"\"></td><td style=\"padding:15px;\">"+jsonArr[i].docId+"</td><td style=\"padding:15px;\">"+jsonArr[i].docFirstName+" "+jsonArr[i].docLastName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docPhone+"</td><td style=\"padding:15px;\">"+jsonArr[i].hospName+"</td><td style=\"padding:15px;\">"+jsonArr[i].docAddress+"</td></tr>";
            }
            tableEle.innerHTML=strEle;
            docId=document.forms["patientSignIn"]["docIdList"];
        }
    }
    xmlHttp.send();
}

