$(document).ready(function(){

    let selectedRow = "";
    showEmployeeData();

    // DISPLAY LIST OF EMPLOYEES
    $("#viewLink").click(function(){
        selectedRow = "";
        $("#updateDelete").show();
        hideAll();
        showEmployeeData();
    });

    //DISPLAY FORM FOR ADDING NEW EMPLOYEES TO THE LIST
    $("#addLink").click(function(){
        selectedRow = "";
        $("#updateDelete").hide();
        hideAll();
        $("#addDiv").show();
    });

    //VERIFY AN EMPLOYEE EXISTS IN THE LIST
    $("#verifyLink").click(function(){
        hideAll();
        $("#verifyDiv").show();
    });

    $("#updateLink").click(function(){
        if(selectedRow == "") {
            alert("You must first select a row to update.");
        }else{
            $("#updateDelete").hide();
            hideAll();
            //POPULATING FORM FIELDS FROM EXISTING SELECTED ROW
            $("#updateName").val(employeeList[selectedRow.id].name);
            $("#updateOfficeNum").val(employeeList[selectedRow.id].officeNum);
            $("#updatePhoneNum").val(employeeList[selectedRow.id].phoneNum);
            $("#updateDiv").show();
        }
    });

    //REMOVE THE CURRENTLY SELECTED EMPLOYEE FROM THE LIST AND REDISPLAY UPDATED LIST
    $("#deleteLink").click(function(){
        if(selectedRow == ""){
            alert("You must select a row to delete.");
        }else{
            delete employeeList[selectedRow.id];
            $("#viewLink").trigger('click');
        }
    });

    //CHANGE BACKGROUND COLOR OF SELECTED ROW AND SAVE THE SELECTED ROW FOR USE WITH
    //THE DELETE/UPDATE LINK
    //THIS IS A SPECIAL CASE WHERE WE USED DELEGATION TO ASSIGN EVENTS TO A .empRow CLASS
    //SO THAT THE EVENTS WILL TRIGGER FOR ROWS THAT ARE ADDED AFTER INITIAL PAGE LOAD
    $("#employeeDiv").on('click', '.empRow', function(){
        selectedRow = this;
        $('tr').css('background-color', 'white');
        $(this).css('background-color', 'yellow');
    });

    //HIDE ALL DIVS
    function hideAll(){
        $("#employeeDiv, #addDiv, #updateDiv, #verifyDiv, #errorDiv").hide();
    }

    $("#btnAdd").click(function(){
        let name = $("#name").val();
        let officeNum = $("#officeNum").val();
        let phoneNum = $("#phoneNum").val();
        employeeList.push({"name":name, "officeNum":officeNum, "phoneNum":phoneNum});
        hideAll();
        $("#updateDelete").show();
        showEmployeeData();
    });

    //UPDATE THE EXISTING EMPLOYEE INFO FROM FORM INPUT
    $("#btnUpdate").click(function(){
        let name = $("#updatedName").val();
        let officeNum = $("#updatedOfficeName").val();
        let phoneNum = $("#updatedPhoneNum").val();
        employeeList[selectedRow.id].name = $("#updatedName").val();
        employeeList[selectedRow.id].officeNum = $("#updatedOfficeNum").val();
        employeeList[selectedRow.id].phoneNum = $("#updatedPhoneNum").val();
        hideAll();
        $("#updateDelete").show();
        showEmployeeData();
    });




    function showEmployeeData(){
        $("#tblEmployees").empty();
        let employees= getEmployeeData();
        $("#tblEmployees").append(employees);
        $("#employeeDiv").show();
    };

    function getEmployeeData(){
        let tbody = document.getElementById("employeeTBody");
        let tr = "";
        for (var i in employeeList){
        tr = tr + "<tr>" +
        "<td>" + employeeList[i].name + "<br>" +
        employeeList[i].officeNum + "<br>" +
        employeeList[i].phoneNum + "<br><br>" +
        "</td></tr>"
        }
        return tr;
    }

});


