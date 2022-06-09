Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_Snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

prediction_1 = "";
prediction_2 = "";

console.log("ml5.version:",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/AdCb-gCFR/model.json",modelLoaded);

function modelLoaded()
{
    console.log("modelLoaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "The second prediction is " + prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }

    else
    {
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak();

        if(result[0].label=="Best")
        {
            document.getElementById("update_emoji1").innerHTML="&#128077;";
        }
        if(result[0].label=="Amazing")
        {
            document.getElementById("update_emoji1").innerHTML="&#128076;";
        }
        if(result[0].label=="Victory")
        {
            document.getElementById("update_emoji1").innerHTML="&#9996;";
        }

        if(result[1].label=="Best")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(result[1].label=="Amazing")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(result[1].label=="Victory")
        {
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
    }
}