exports.logOutUser(result) {
	if(result.status == "success"){
			switchToPage("/");
		}else{
			alert("Logout failed.");
		}
	}

