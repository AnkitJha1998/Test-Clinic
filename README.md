# Test-Clinic
This was an application which was created during my Internship at Cerner. Here we had to do a Full-Stack Development implementing Buisness logic for a Test Clinic.


<img width="480" alt="Build" src="https://user-images.githubusercontent.com/37044020/88452419-262d7000-ce7c-11ea-8b93-061a1fef9040.png">

This is the code coverage for the Spring Boot Back-End For this application


Here there are 4 Roles from which this application can be Used. They are Receptionist, Pathologist, Radiologist and Lab Technician.


<img width="480" alt="Login" src="https://user-images.githubusercontent.com/37044020/88425802-a5378f80-ce0d-11ea-8784-ba13fad5d23a.png">

To get started, we need to start from login.html

## Receptionist

This role can Enter New Patients, Add Examinations and Search for patients, examinations.

<img width="480" alt="Receptionist" src="https://user-images.githubusercontent.com/37044020/88425740-889b5780-ce0d-11ea-8055-98bff28a346d.png">

Reception Home Page

Searching is very easy here

<img width="480" alt="SearchById" src="https://user-images.githubusercontent.com/37044020/88425884-cc8e5c80-ce0d-11ea-91a4-4170f97642ef.png">

Here Patient search yields so much detail, above is by ID search and below is by Name Search
<img width="480" alt="SearchByName" src="https://user-images.githubusercontent.com/37044020/88426409-c2209280-ce0e-11ea-8836-6d0290aee43d.png">


## Lab Technician

This accepts the tests and assigns it to Pathologist and Radiologist.

This is it's Home Page

<img width="480" alt="Home" src="https://user-images.githubusercontent.com/37044020/88426509-f1370400-ce0e-11ea-9db8-72cc976353bc.png">

Here we can see all the tests assigned to the user as well as edit the tests assigned to users or tests loaded by Patient or Lab Technician.

Now a Lab Techinician can See what Tests are assigned to them.
<img width="480" alt="Tests Assigned" src="https://user-images.githubusercontent.com/37044020/88452068-4c054580-ce79-11ea-9377-a1ec7ab0d0fc.png">

Now here it is possible to assign pathology and radiology sub-tests using this role's portal

<img width="480" alt="Assign Sub-Test Case" src="https://user-images.githubusercontent.com/37044020/88452096-7c4ce400-ce79-11ea-8716-df578b2d6da8.png">
<img width="480" alt="AddRadioTest" src="https://user-images.githubusercontent.com/37044020/88452104-8a026980-ce79-11ea-934a-002beb9db1d6.png">


This role is able to download Test results for the patients to get their reports.
<img width="480" alt="Download Test Results" src="https://user-images.githubusercontent.com/37044020/88452113-a8686500-ce79-11ea-95e4-f54ba3da77e5.png">

Lab Technician also can search for other Tests that are stored
<img width="480" alt="TestSearch" src="https://user-images.githubusercontent.com/37044020/88452137-ca61e780-ce79-11ea-9073-74c86293b608.png">


## Radiologist and Pathologist
Radiologist and Pathologist Have the same UI except that radiology is switched in pathology

<img width="480" alt="Home" src="https://user-images.githubusercontent.com/37044020/88452162-05fcb180-ce7a-11ea-90d5-51367a3dd39b.png">

This is the Home page of Radiologist

Here they can specifically see what all cases are assigned to them.
<img width="480" alt="AssignedToMe" src="https://user-images.githubusercontent.com/37044020/88452175-288eca80-ce7a-11ea-85a4-cbe3e9ca5dff.png">

Here Edit Test Tab allows radiologist to edit and upload test results.
<img width="480" alt="Edit Test" src="https://user-images.githubusercontent.com/37044020/88452194-58d66900-ce7a-11ea-9327-76de2408b2af.png">
<img width="480" alt="Edit Test Window" src="https://user-images.githubusercontent.com/37044020/88452199-6855b200-ce7a-11ea-8fbd-f47e7b614c5c.png">

This role also has access to search for other tests stored on the server.
<img width="480" alt="SearchTest1" src="https://user-images.githubusercontent.com/37044020/88452225-95a26000-ce7a-11ea-9e15-b4356b87b27e.png">

## Admin Role

Admin role is very crucial for maintaining back end issues. To add doctors in the list, no role is correct to do so. So Admin has to have a portal to be able to do so. From here they can monitor all doctors and employees in the system.

<img width="480" alt="Home" src="https://user-images.githubusercontent.com/37044020/88452271-f0d45280-ce7a-11ea-96bf-f79b59ff7e35.png">

Home Page for Admin. Here the admin can enter the doctor details into the system

<img width="480" alt="doctorList" src="https://user-images.githubusercontent.com/37044020/88452273-f2057f80-ce7a-11ea-8670-4efdf20f12e2.png">

List for Doctors

<img width="480" alt="PatientList" src="https://user-images.githubusercontent.com/37044020/88452272-f16ce900-ce7a-11ea-8edc-4c19682884f0.png">

List For Patients

<img width="480" alt="EmployeeList" src="https://user-images.githubusercontent.com/37044020/88452274-f29e1600-ce7a-11ea-9c92-c276683e8730.png">

List for Employees

