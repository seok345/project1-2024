OPENAPI_KEY =""
smodel35 = "gpt-3.5-turbo"
smodelmini = "gpt-4o-mini"
squestion = "황진이가 누구지"
function talk(){
    data ={
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: squestion
            }
        ]
    }

    $.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        alert(response.choices[0].messge.content)
    }).fail(function(error){
        console.log(error)
        errormsg = error.status + " : " + error.responseJSON.error.code + " - " + error.responseJSON.error.code.messages
        alert(errormsg)
    }
    )
        
    
}

talk()
