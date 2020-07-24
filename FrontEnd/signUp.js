var useravail=-1;
var userSaved="";
/*
 *   creates CORS enabled XMLHttpRequest
 */
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


function checkUsernameAvailability()
{
    var username=document.forms["signUpForm"]["user"];
    if(username.value=="")
    {
        window.alert("Enter a Username First");
        document.getElementById("userAvail").innerHTML="";
        
    }
    else 
    {
        var url="http://localhost:8080/employees/username";
        var xhttp=createCORSRequest("POST",url);
        xhttp.setRequestHeader("Content-type","application/json")
        xhttp.onload=function(){
            if(this.readyState==4 && this.status==200)
            {
                var data1=this.responseText;
                console.log("JSON:"+data1);
                if(data1=="Username Not Available")
                {
                    var pTag=document.getElementById("userAvail");
                    pTag.innerHTML="Username Not Available";        
                    pTag.style="color:brown";
                    useravail=0;
                    userSaved=username.value;
                    
                }
                else{
                    var pTag=document.getElementById("userAvail");
                    pTag.innerHTML="Username Available";        
                    pTag.style="color:blue";
                    userSaved=username.value;
                    useravail=1;
                    
                }
            }
        }
        var req=JSON.stringify({"username":username.value,"password":""});
        xhttp.send(req);
    }
    return false;
}



function validateSignUp()
{
    var firstName=document.forms["signUpForm"]["fname"];
    var lastName=document.forms["signUpForm"]["lname"];
    var username=document.forms["signUpForm"]["user"];
    var password=document.forms["signUpForm"]["pass"];
    var desig=document.getElementById("desigInput");
    var addr=document.forms["signUpForm"]["addr"];
    var phone=document.forms["signUpForm"]["phone"];
    
    if(firstName.value=="" || lastName.value=="" || username.value==""|| password.value==""|| phone.value=="" )
    {
        window.alert("Field Empty");
        return false;
    }
    else
    {
    
        var url="http://localhost:8080/employees/username";
        var xhttp=createCORSRequest("POST",url);
        xhttp.setRequestHeader("Content-type","application/json");
        xhttp.onload=function()
        {
            if(this.readyState==4 && this.status==201)
            {
                var data1=this.responseText;
                console.log("JSON:"+data1);
                var url1="http://localhost:8080/employees";
                var http1=createCORSRequest("POST",url1);
                http1.setRequestHeader("Content-type","application/json");
                http1.onload=function()
                {
                    if(this.readyState==4 && this.status==201)
                    {
                        window.alert("Sign Up Successful");
                        window.location.href="login.html";
                        console.log("Received"+this.responseText);
                        return false;
                    }
                    else{
                        window.alert("Server Error");
                        return false;
                    }
                    
                }
                var empData = JSON.stringify( {"empUsername":username.value,"empFirstName":firstName.value,"empLastName":lastName.value,"empAddr":addr.value,"empDesig":desig.value,"empPhone":phone.value} );
                http1.send(empData);
                console.log("Employee Data Stored");
            }
            else if(this.readyState==4 && this.status==409){
                window.alert("Username Not Available");
                console.log("Username in Use");
                return false;
            }
            else{
                window.alert("Server Error");
                return false;
                
            }
        }
        var logData=JSON.stringify({"username":username.value,"password":password.value});
        xhttp.send(logData);
        console.log("Credentials Stored");
        
        
            
        
        
    }
    return false;
}

