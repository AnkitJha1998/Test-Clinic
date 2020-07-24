var table;
var empId;
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
    table=document.getElementById("searchParam");
    empId=sessionStorage.getItem("empId");
    if(empId==null)
        window.location.href="loginPrompt.html";
    var innerCode="<tr><th class=\"other\">Test Id</th><th class=\"other\">Test Name</th><th class=\"other\">Test Details</th><th class=\"other\">Test Status</th><th class=\"other\">Test Results</th></tr>";
    console.log("Id Employee:"+empId);
    var url="http://localhost:8080/examinationPathos";
    var httpObj=createCORSRequest("GET",url);
    httpObj.open("GET",url,true);
    httpObj.onload=function()
    {
        if(this.readyState=4 && this.status==200)
        {
            var data=JSON.parse(this.responseText);
            
            for(var i=0;i<data.length;i+=1)
            {
                if(data[i].empId!=empId)
                    continue;
                innerCode+="<tr><td class=\"other\">"+data[i].examPathoId+"</td><td class=\"other\">"+data[i].examPathoName+"</td><td class=\"other\">"+data[i].examPathoDetails+"</td><td class=\"other\">"+data[i].examStatus+"</td><td class=\"other\">";
                if(data[i].examPathoRes==0)
                    innerCode+="Not Uploaded";
                else
                    innerCode+="<input type=\"button\" value=\"View Results\" onclick=\"download("+data[i].examPathoRes+")\" style=\"border-radius: 20px\">";
                innerCode+="</td></tr>";
                
                   
            }
            table.innerHTML=innerCode;
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