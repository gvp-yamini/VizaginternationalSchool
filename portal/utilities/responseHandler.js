var express = require('express');

/*Create a handler for the error messages*/
var handler = (function(){
	/**
	 *@function {setResponse} - Set the response with the status and the message
	 *param {Object} - response - HTTP response Object
	 *param{Number} - statusCode - HTTP status code
	 *param{bool} - successFlag - Success ture or false
	 *param{String} - message - Message to be embedded to the response.
	 *return {Object}
	*/
	function setResponse(response,statusCode,successFlag,message){
		/*Set up the response*/
		return response.status(statusCode).json({
			success: successFlag, 
			message: message
		});
	}

	/**
	 *@function {setToken} - Set the response with the token
	 *param {Object} - response - HTTP response Object
	 *param{Number} - statusCode - HTTP status code
	 *param{Object} - token - JWT token
	 *return {object}
	*/
	function setToken(response,statusCode,token){
		return response.status(statusCode).json({
			success: true, 
			token: token
		});
	}

	/*Reveal the errorHandler method*/
	return {
		setResponse : setResponse,
		setToken : setToken
	}
})();

/*export the error handler functionality*/
module.exports = handler;