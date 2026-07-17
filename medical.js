const form = document.getElementById("myForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) 
{

    event.preventDefault();
    clearErrors();

    if (isLocked) 
    {
        document.getElementById("passwordError").innerHTML =
            "Password is locked. Try again after 30 Seconds.";
        return;
    }

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let department = document.getElementById("department");
    let HealthDescription = document.getElementById("healthdescription");

    let gender = document.querySelector('input[name="gender"]:checked');
    let PreferredServices = document.querySelectorAll('input[name="Preferred Service"]:checked');
    let valid = true;

    if (firstName.value.trim() == "") 
    {

        showError(firstName, "firstNameError", "First name is required.");
        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(firstName.value.trim()))
    {

        showError(firstName, "firstNameError", "Only letters are allowed.");
        valid = false;

    }
    else 
    {

        showSuccess(firstName);

    }

    if (lastName.value.trim() == "") 
    {

        showError(lastName, "lastNameError", "Last name is required.");
        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(lastName.value.trim())) 
    {

        showError(lastName, "lastNameError", "Only letters are allowed.");
        valid = false;

    }
    else {

        showSuccess(lastName);

    }


    if (email.value.trim() == "") 
    {

        showError(email, "emailError", "Email is required.");
        valid = false;

    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) 
    {

        showError(email, "emailError", "Invalid email address.");
        valid = false;

    }
    else 
    {

        showSuccess(email);

    }


    if (password.value == "") 
    {

        showError(password, "passwordError", "Password is required.");
        valid = false;

    }
    else if (password.value != "PASSWORD") 
    {
        wrongAttempts++;
        showError(
            password,
            "passwordError",
            "Wrong Password! Attempt " + wrongAttempts + " of 3."
        );

        valid = false;

        if (wrongAttempts >= 3) {

            isLocked = true;

            document.getElementById("passwordError").innerHTML =
                "Too many wrong attempts. Password locked for 30 seconds.";

            password.disabled = true;

            setTimeout(function () 
            {

                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;

                document.getElementById("passwordError").innerHTML =
                    "Password unlocked. Try again.";

            }, 30000);

        }

    }
    else 
    {

        wrongAttempts = 0;
        showSuccess(password);

    }

    if (gender == null) 
    {

        document.getElementById("genderError").innerHTML = "Please select your gender.";
        valid = false;

    }

    if (department.value == "") 
    {

        showError(
            department,
            "departmentError",
            "Please select a department."
        );

        valid = false;

    }
    else {

        showSuccess(department);

    }


    if (PreferredServices.length == 0) 
    {

        document.getElementById("serviceError").innerHTML =
            "Select at least one preferred service.";

        valid = false;

    }


    if (healthdescription.value.trim() == "") 
    {

        showError(healthdescription, "healthdescriptionError", "Health description is required.");
        valid = false;

    }
    else if (healthdescription.value.trim().length < 20) 
    {

        showError
        (
            healthdescription,
            "healthdescriptionError",
            "Health description must be at least 20 characters."
        );

        valid = false;

    }
    else 
    {

        showSuccess(healthdescription);

    }

    if (valid) 
    {

        alert("'Appointment Registration Completed Successfully!'");

        form.reset();

        clearErrors();

    }

});


function showError(input, errorId, message)
 {

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;

}

function showSuccess(input) {

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");

}

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.innerHTML = "";

    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");

    });

}
