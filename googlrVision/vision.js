const GOOGLEAPI_KEY = "";

function processFile(event) {
    const content = event.target.result;
    imagestring = content.replace(/^data:image\/(jpeg|png);base64,/, '');  
    document.getElementById("gimage").src = content; 
}

function uploadFiles(files) {
    const file = files[0]
    const reader = new FileReader()
    reader.onloadend = processFile
    reader.readAsDataURL(file)
}

function analyze() {
    if (!imagestring) {
        alert("먼저 이미지를 업로드하세요.")
        return;
    }

    const data = {
        requests: [{
            image: {
                content: imagestring 
            },
            features: [{
                type: "FACE_DETECTION",
                maxResults: 100
            }]
        }]
    };

    $.ajax({
        type: "POST",
        url: 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLEAPI_KEY,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        const faces = response.responses[0].faceAnnotations;
        if (faces && faces.length > 0) {
            let resultText = `총 ${faces.length}개의 얼굴 감지:\n\n`;
            faces.forEach((face, index) => {
                resultText += `얼굴 #${index + 1}:\n`;
                resultText += `  감정 표현: ${detectEmotions(face)}\n`;
            });
            $("#result").val(resultText)
        } else {
            $("#result").val("얼굴 감지 못함")
        }
    }).fail(function (error) {
        console.error(error);
        $("#result").val("얼굴 인식 중 오류 발생.")
    });
}

function detectEmotions(face) {
    const likelihoods = {
        VERY_UNLIKELY: "거의 없음",
        UNLIKELY: "적음",
        POSSIBLE: "가능성 있음",
        LIKELY: "높음",
        VERY_LIKELY: "매우 높음"
    };

    let emotions = '';
    emotions += `웃음: ${likelihoods[face.joyLikelihood]}\n`;
    emotions += `슬픔: ${likelihoods[face.sorrowLikelihood]}\n`;
    emotions += `화남: ${likelihoods[face.angerLikelihood]}\n`;
    emotions += `놀람: ${likelihoods[face.surpriseLikelihood]}\n`;

    return emotions;
}