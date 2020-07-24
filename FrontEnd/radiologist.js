var userFullName="";
var imgIndex=0;
window.onload=onPageLoadFunction;
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
function onPageLoadFunction()
{   
    imgHandler();
    var empUser=sessionStorage.getItem("user");
    console.log("Username:"+empUser);
    var empId=sessionStorage.getItem("empId");
    console.log("Id:"+empId);
    if(empId==null)
        window.location.href="loginPrompt.html";
    var urlEmp="http://localhost:8080/employees/"+empId;
    var httpObj=createCORSRequest("GET",urlEmp);
    httpObj.open("GET",urlEmp,true);
    httpObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            userFullName=jsonData.empFirstName+" "+jsonData.empLastName;
            document.getElementById("welcomeMessage").innerHTML=userFullName;
        }
    };
    httpObj.send();
}

function imgHandler()
{   
    var eles=document.getElementsByClassName("slideShow");
    for(var i=0;i<eles.length;i++)
        eles[i].style.display="none";
    imgIndex++;
    if(imgIndex>eles.length)
        imgIndex=1;
    eles[imgIndex-1].style.display="block";
    var h33=document.getElementById("slideShow1");
    switch(imgIndex)
    {
        case 1: h33.innerHTML="Tests Assigned To Me";
            break;
        case 2: h33.innerHTML="Edit Tests";
            break;
        case 3: h33.innerHTML="Search Tests";
            break;
    }
    setTimeout(imgHandler,4000);
}
function logOut()
{
    sessionStorage.clear();
}