var emailaddressInput;
var labelconEls;
var timer;
document.addEventListener("DOMContentLoaded", function() {

    emailaddressInput = document.getElementById("emailAddress");
    labelconEls = document.getElementsByClassName("label-container");
    document.getElementById("btnSubmit").addEventListener("click", onSubmitFunc);
    document.getElementById("btnDismiss").addEventListener("click", function() {

        showHideForm('show');
        emailaddressInput.value = "";
    });
    emailaddressInput.addEventListener("keyup", validateWhileType);
});

function onSubmitFunc(e)
{
    e.preventDefault();
    
    var email = emailaddressInput.value;
    if (!validateEmail(email) || email.trim().length === 0) {

        for (var counter = 0; counter < labelconEls.length; counter++) {

            for (var counter2 = 0; counter2 < labelconEls[ counter ].childNodes.length; counter2++) {

                if (labelconEls[ counter ].childNodes[ counter2 ].tagName === "SPAN") {

                    labelconEls[ counter ].childNodes[ counter2 ].style.display = "inline";
                    if (email.trim().length === 0) {

                        labelconEls[ counter ].childNodes[ counter2 ].innerHTML = "The email field is left empty";
                    } else {

                        labelconEls[ counter ].childNodes[ counter2 ].innerHTML = "Valid email required";
                    }
                }
            }
        }

        emailaddressInput.classList.add("error");
    } else {

        showHideForm("hide");
        
        document.getElementById("messageEmailHolder").innerHTML = email.trim();
    }
}

function validateWhileType(e)
{
    e.preventDefault();
    if(typeof timer !== undefined){

        clearTimeout(timer);
    }

    timer = setTimeout(function() {
        if (validateEmail(e.target.value) || e.target.value.trim().length === 0) {

            for (var counter = 0; counter < labelconEls.length; counter++) {

                for (var counter2 = 0; counter2 < labelconEls[ counter ].childNodes.length; counter2++) {
    
                    if (labelconEls[ counter ].childNodes[ counter2 ].tagName === "SPAN") {
    
                        labelconEls[ counter ].childNodes[ counter2 ].style.display = "none";
                    }
                }
            }
    
            emailaddressInput.classList.remove("error");
        }
    }, 500);
}

function showHideForm(operation)
{
    if (operation==="hide") {

        var successMessageContainers = document.getElementsByClassName("success-message-container");
        var newsletterContainer = document.getElementsByClassName("newsletter-container");
        for (var counter = 0; counter < successMessageContainers.length; counter++) {

            successMessageContainers[counter].removeAttribute("style");
            for (var counter1 = 0; counter1 < newsletterContainer.length; counter1++) {

                newsletterContainer[counter1].style.display = "none";
            }
        }
    } else {

        var successMessageContainers = document.getElementsByClassName("success-message-container");
        var newsletterContainer = document.getElementsByClassName("newsletter-container");
        for (var counter1 = 0; counter1 < newsletterContainer.length; counter1++) {

            newsletterContainer[counter1].removeAttribute("style");
            for (var counter = 0; counter < successMessageContainers.length; counter++) {

                successMessageContainers[counter].style.display = "none";
            }
        }
    }
}

function validateEmail (email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};