var express = require('express');

/*Create a set of messages used in the application*/
var messages = {
	COMPANY_REG_SUCCESS : "Successfully registered the company.",
	COMPANY_REG_FAILURE : "Could not register the company",
	COMPANY_NAME_MISSING : "Please enter company name.",
	COMPANY_DATA_MISSING : "Please enter the company data.",
	RECRUITER_DATA_MISSING : "Please enter the recruiter data.",
	RECRUITER_REG_SUCCESS : "Successfully registered the recruiter.",
	RECRUITER_PROFILE_EXISTS : "Recruiter email id already exists.",
	EMAIL_PHONE_MISSING : "Please enter email and phone number.",
	USER_REG_SUCCESS : "Successfully created new user.",
	USER_PROFILE_EXISTS : "User profile already exists",
	USER_DATA_MISSING : "Please enter the user data",
	USER_AUTH_FAILED : "Authentication failed. User not found.",
	USER_PWD_WRONG : "Authentication failed. Passwords did not match.",
	GET_STUDENTS_SUCCESS : "Successfully retreived student data.",
	GET_STUDENTS_FAILED : "Failed to retreive student data",
	CREATE_STUDENT_SUCCESS : "Successfully created new student",
	CREATE_STUDENT_FAILED : "Failed to create new student"
};

/*export the error handler functionality*/
module.exports = messages;