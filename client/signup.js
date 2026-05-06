async function signup() {
    event.preventDefault();
    console.log("reached here...");

    const name = document.getElementById("name").value;
    console.log("name", name);

    const email = document.getElementById("email").value;
    console.log("email", email);

    const password = document.getElementById("pass").value;
    console.log("password", password);


    const json_data = JSON.stringify({name,email,password});
    console.log("json_data",json_data);



    try{
        
    
    

    let response = await fetch("api/auth/sign-up", {
        method: "POST",
        headers: {
            "content type ": "application/json",
        },


        body: json_data

    });

    console.log(response);

}
catch(err){
    console.log("error while fetching :", err);
}
    


}