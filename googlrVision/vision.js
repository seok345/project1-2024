//https://github.com/gang-0730/project1-2024
CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLE_API_KEY;

GOOGLEAPI_KEY = "AIzaSyBZCWwGS6gDDuBfqhiilC33DuNjWgp8taE"
function processFile(event){
    content = event.target.result
    imagestring = content.replace('data:image/jpeg;base64,','')
    document.getElementById("gimage").src = content

}


function uploadFiles(files){
    file = files[0]
    reader = new FileReader()
    reader.onloadend = processFile
    reader.readAsDataURL(file)
}

function analyze(){
    data ={
        requests: [{
            image:{
                content: imagestirng
            },
            features:[{
                type:"FACE__DETECTION",
                maxResults:100
            }]
        }]
            }
    

    $.ajax({
        type:"POST",
        url: "POST https://vision.googleapis.com/v1/images:annotate" + "?key="+ GOOGLEAPI_KEY,
        headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        
    }).fail(function(error){
        console.log(error)
       
    }

    )
}
