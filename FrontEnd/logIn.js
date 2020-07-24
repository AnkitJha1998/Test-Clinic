function entListener(event)
{
    if(event.keyCode==13 || event.which==13)
    {
        logInValidate();
    }
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



var authenticateStatus=false;
function recvAuthenticateFn()
{
        if(this.readyState==4 && this.status==200)
        {
            var pTag=document.getElementById("logInStatus");
            pTag.innerHTML="";
            var receiveData=this.responseText;
            console.log("Authenticate Status:"+receiveData);
            if(receiveData=="Authentication Successful")
                authenticateStatus=true;
            else
                console.log("Authentication Failed !");
            if(authenticateStatus==true){
                document.getElementById("logInStatus").innerHTML=receiveData;
                loginPage();
                document.getElementById("logInStatus").innerHTML="";
            }
                
            else
                document.getElementById("logInStatus").innerHTML=receiveData;
        }
}
function authenticate()
{
    var user=document.forms["loginForm"]["user"];
    var pass=document.forms["loginForm"]["pass"];
    var url="http://localhost:8080/login";
    var httpObj=createCORSRequest("POST",url);
    httpObj.setRequestHeader("Content-type","application/json");
    httpObj.onload=recvAuthenticateFn;
    var logData=JSON.stringify({"username":user.value,"password":pass.value});
    console.log("Authentication Initiated");
    httpObj.send(logData);
}

function reviewEmployeeDataByUsername()
{
    if(this.readyState==4 && this.status==200)
        {
            var jsonDataArray=JSON.parse(this.responseText);
            if(jsonDataArray.length==0)
            {
                sessionStorage.setItem("empUsername",user.value);
                window.location.href="admin.html";
                return;
            }
            var jsonData=jsonDataArray[0];
            var empId=jsonData.empId;
            var empDesig=jsonData.empDesig;
            sessionStorage.setItem("empId",empId);
            console.log("Id:"+empId+"::Desig:"+empDesig);
            if(empDesig=="RECEPTIONIST")
                window.location.href="receptionist.html";
            else if(empDesig=="PATHOLOGIST")
                window.location.href="pathologist.html";
            else if(empDesig=="RADIOLOGIST")
                window.location.href="radiologist.html";
            else if(empDesig=="LAB_TECHNICIAN")
                window.location.href="labTechnician.html";
            
        }
}
function loginPage()
{
    var user=document.forms["loginForm"]["user"];
    sessionStorage.setItem("user",user.value);
    var urlEmployee="http://localhost:8080/employees/username?user="+user.value;
    var httpObj=createCORSRequest("GET",urlEmployee);
    httpObj.open("GET",urlEmployee,true);
    httpObj.onload=reviewEmployeeDataByUsername;
    httpObj.send();
}



function logInValidate()
{
    
    var user=document.forms["loginForm"]["user"];
    var pass=document.forms["loginForm"]["pass"];
       if(user.value==""||pass.value=="") {
           window.alert("Username and/or Password field Empty");
           user.value="";
           pass.value="";
       }
        else{
            authenticate();
            console.log("Next Stage in progress");
            if(authenticateStatus==false)
                console.log("Authentication Failed");
        }
}