song = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}


function draw() {
	image(video, 0, 0, 600, 500);

	fill("red");
	stroke("red");


	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		number_left = Number(leftWristY); 
		remove_decimals = floor(number_left);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		song.setVolume(volume);	
	}

}


function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
		
  }
}
function draw(){
	image(video, 0, 0, 600, 500);
fill("red");
stroke("red");


if(scoreRightWrist >0.002){
	circle(rightWristX,rightWristY,20);


if(rightWristY>0 && rightWristX <=100){
	document.getElementById("speed").innerHTML = "Speed = 0.5x";
	song.rate(0.5);
}
if(rightWristY>200 && rightWristX <=300){
	document.getElementById("speed").innerHTML = "Speed = 1.5x";
	song.rate(1.5);
}
if(rightWristY>100 && rightWristX <=200){
	document.getElementById("speed").innerHTML = "Speed = 1x";
	song.rate(1);
}
if(rightWristY>300 && rightWristX <=400){
	document.getElementById("speed").innerHTML = "Speed = 2x";
	song.rate(2);
}
if(rightWristY>400 && rightWristX <=500){
	document.getElementById("speed").innerHTML = "Speed = 2.5x";
	song.rate(2.5);
}
}
}
