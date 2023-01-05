harry_potter="";
peter_pan="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_left_wrist_y=0;
score_right_wrist_y=0;
status_of_song="";
status_of_song2="";


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw(){
    image(video,0,0,600,500);

    fill("pink");
    stroke("blue");

    status_of_song = harry_potter.isPlaying();
    status_of_song2=peter_pan.isPlaying();

    if(score_left_wrist_y > 0.1){
        circle(left_wrist_x,left_wrist_y,20);
        harry_potter.stop();

        if(status_of_song2==false){
            peter_pan.play();
            document.getElementById("song").innerHTML="Playing Peter Pan Song";
        }
    }

    if(score_right_wrist_y > 0.1){
        circle(right_wrist_x,right_wrist_y,20);
        peter_pan.stop();

        if(status_of_song==false){
            harry_potter.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
        }
    }
   
}


function preload(){
    harry_potter=loadSound("music.mp3");
    peter_pan=loadSound("music2.mp3");
}

function modelLoaded(){
    console.log("Model is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
       score_left_wrist_y = results[0].pose.keypoints[9].score;
       score_right_wrist_y = results[0].pose.keypoints[10].score;

       left_wrist_x=results[0].pose.leftWrist.x;
       left_wrist_y=results[0].pose.leftWrist.y;
       console.log("left wrist x = " + left_wrist_x + "left wrist y = " + left_wrist_y );

       right_wrist_x=results[0].pose.rightWrist.x;
       right_wrist_y=results[0].pose.rightWrist.y;
       console.log("right wrist x = " + right_wrist_x + "right wrist y = " + right_wrist_y );

       
       
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}




