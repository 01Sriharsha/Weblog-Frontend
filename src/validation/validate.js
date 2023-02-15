//Registration Form validation

// Validate Username Field
export const validateUsername = (error, values) => {

    if (!values.username) {
        error.username = "Username cannot be empty!!";
    }
    else if (values.username.length < 3) {
        error.username = "Username must conatin atleast 3 characters!!";
    }
    return error;

}

// Validate Email Field
export const validateEmail = (error, values) => {

    if (!values.email) {
        error.email = "Email cannot be empty!!";
    }
    else if (!(/^[A-Za-z0-9]+[@][a-zA-Z]+[\.][a-z]{2,3}$/.test(values.email))) {
        error.email = "Enter valid email";
    }
    return error;

}

// Validate Password Field
export const validatePassword = (error, values) => {

    if (!values.password) {
        error.password = "Password cannot be empty!!";
    }
    else if (!(/^[A-Za-z\.\-\s]+[@$#][a-zA-Z0-9]+$/.test(values.password))) {
        error.password = "Password must contain atleast 1 Uppercase , 1 Special character and a combination of digits and characters";
    }
    else if (values.password.length < 4) {
        error.password = "Password must contain more than 4 characters";
    }
    return error;

}

//Validate Confirm Password
export const validateCPassword = (error, values) => {

    if (!values.cpassword) {
        error.cpassword = "Confirm Password cannot be empty!!";
    }
    else if (values.cpassword !== values.password) {
        error.cpassword = "Password Doesn't Match";
    }
    return error;

}

// Validate About Field
export const validateAbout = (error, values) => {

    if (!values.about) {
        error.about = "About cannot be empty!!";
    }
    else if (values.about.length < 15) {
        error.about = "About must conatin atleast 15 characters!!";
    }
    return error;
}



//Validate Post details
export const validatePost = (error, values) => {
    //validate post title
    if (values.title.length === 0) {
        error.title = "*title cannot be empty"
    }
    else if (values.title.length < 4) {
        error.title = "*title must contain atleast 4 characters"
    }

    //validate post content
    if (values.content.length === 0) {
        error.content = "*content cannot be empty"
    }

    //validate post categoryId
    if (values.categoryId === "" || values.categoryId==='0') {
        error.categoryId = "*Please select a category to post"
    }
    return error;
}