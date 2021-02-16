var canvas=document.getElementById('canvas'),
context=canvas.getContext('2d');
image=new Image();
image2=new Image();

//functions...

function drawGround(){
    context.fillStyle='rgba(234,181,67,0.7)';
    
    context.lineWidth=0.5;
    for(var i=0;i<8;i++){
        for(var j=0;j<12;j++){
            context.save();
            context.translate(j*100,i*100);
            context.fillRect(0,0,100,100);
            context.restore();
        }
    }
    
}

function drawStore(){
    context.fillStyle='rgba(216, 152, 68,0.5)';
   
    context.beginPath();
    context.fillRect(300,150,570,330);
    context.closePath();
}

function drawRoof(){
    context.lineWidth=4;
    context.strokeStyle='rgb(31, 29, 153)';
    context.fillStyle='rgb(74, 71, 235)';
    context.lineJoin="round";

    //아래쪽 지붕
    context.beginPath();
    context.moveTo(295,60);
    context.lineTo(260,170);

    //아래쪽 지붕의 처마 
    for(var i=0;i<17;i++){
        context.arc(280+(i*40),170,20,Math.PI,0,false);
    }
    
    context.lineTo(890,60);
    context.closePath();
    context.stroke();
    context.fill();

    //위쪽 지붕
    context.beginPath();
    context.moveTo(310,0);
    context.lineTo(275,80);

    //위쪽 지붕의 처마
    for(var i=0;i<16;i++){
        context.arc(295+(i*40),80,20,Math.PI,0,false);
        }
    
    context.lineTo(870,0);
    context.closePath();
    context.stroke();
    context.fill();
    }

function drawSign(){

    //간판 흰색 배경 
    context.fillStyle='white';
    context.beginPath();
    context.fillRect(460,10,280,80);
    context.closePath();

    //너굴상점 간판 비트맵 이미지 
    image.src='Resource/store_sign.jpg';
    image.onload=function(e){
        context.drawImage(image,460,10,80,80);
    };

    //간판 텍스트 
    context.fillStyle='black';
    context.font="45px 궁서";
    context.fillText('너굴상점',555,65);

    //클릭 안내 텍스트
    context.fillStyle='black'
    context.font="20px Arial";
    context.fillText('Please click anywhere',20,30);
    }

function drawWindow(){
    context.lineWidth=9;
    context.strokeStyle='rgb(240, 190, 126)';

    //창문 틀 
    context.shadowColor='rgb(206, 155, 88)';
    context.shadowOffsetY=3;
    context.shadowOffsetX=-3;
    context.shadowBlur=1;

    context.lineJoin="round";
    context.lineCap="butt";

    context.beginPath();
    context.moveTo(700,190);
    context.lineTo(800,190);
    context.lineTo(800,290);
    context.lineTo(700,290);
    context.lineTo(700,190);
    context.closePath();
    context.stroke();
    
    //창문
    context.fillStyle='black';
    context.fillRect(705,195,42.5,42.5);
    context.fillRect(752.5,195,42.5,42.5);
    context.fillRect(752.5,242.5,42.5,42.5);
    context.fillRect(705,242.5,42.5,42.5);
    context.closePath();
    
}

function drawDoor(){
    context.lineWidth=13;
    context.strokeStyle='rgb(240, 190, 126)';
    
    //문 틀
    context.shadowColor='rgb(206, 155, 88)';
    context.shadowOffsetY=-3;
    context.shadowOffsetX=-3;
    context.shadowBlur=5;

    context.lineJoin="miter";
    context.lineCap="butt";

    context.beginPath();
    context.moveTo(360,480);
    context.lineTo(360,230);
    context.lineTo(530,230);
    context.lineTo(530,480);
    context.stroke();
    context.closePath();

    
    //문 안쪽
    context.shadowOffsetX=0;
    context.shadowOffsetY=0;
    context.shadowBlur=0;

    context.fillStyle='rgb(182, 102, 56)';
    context.fillRect(368,237,155,241.5);

    
    //문 내부 창문 틀
    context.strokeStyle='rgb(209, 118, 65)';

    context.beginPath();
    context.moveTo(413,280);
    context.lineTo(478,280);
    context.lineTo(478,320);
    context.lineTo(413,320);
    context.lineTo(413,280);
    context.stroke();
    context.closePath();

    //문 내부 창문
    context.fillStyle='rgb(236, 226, 166)';
    context.fillRect(416.5,283.8,58,34);

    //문 손잡이
    context.shadowOffsetY=5;
    context.shadowColor="black";
    context.shadowBlur=5;

    context.fillStyle='rgb(73, 69, 69)';
    context.fillRect(390,350,13.5,40);

    context.shadowOffsetY=0;
    context.shadowBlur=0;
}

function drawWeeds(){
context.strokeStyle='rgb(168, 236, 104)';

context.shadowColor='rgb(46, 66, 27)';
context.shadowOffsetY=4;
context.shadowBlur=5;

//제일 왼쪽 큰 잡초
context.lineWidth=4;
var endPoints=[{x:100,y:600},{x:110,y:550},],
controlPoints=[{x:95,y:600},{x:85,y:560},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

//제일 왼쪽 작은 잡초
context.lineWidth=3;
var endPoints=[{x:103,y:600},{x:125,y:570},],
controlPoints=[{x:98,y:600},{x:105,y:565},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

//제일 오른쪽 큰 잡초
context.lineWidth=4;
var endPoints=[{x:1100,y:130},{x:1113,y:97},],
controlPoints=[{x:1098,y:120},{x:1095,y:103},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

//제일 오른쪽 작은 잡초
context.lineWidth=3;
var endPoints=[{x:1093,y:130},{x:1085,y:108},],
controlPoints=[{x:1095,y:115},{x:1088,y:110},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

//가운데 큰 잡초
context.lineWidth=4;
var endPoints=[{x:955,y:480},{x:965,y:447},],
controlPoints=[{x:955,y:455},{x:960,y:452},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

//가운데 작은 잡초
context.lineWidth=3;
var endPoints=[{x:950,y:480},{x:940,y:458},],
controlPoints=[{x:947,y:467},{x:948,y:465},];

context.beginPath();
context.moveTo(endPoints[0].x,endPoints[0].y);
context.bezierCurveTo(controlPoints[0].x,controlPoints[0].y,
    controlPoints[1].x,controlPoints[1].y,endPoints[1].x,endPoints[1].y);
context.stroke();

}

function drawRocks(){
    context.fillStyle='rgb(182, 177, 189)';

    context.shadowColor='rgb(56, 55, 55)';
    context.shadowBlur=4;
    context.shadowOffsetY=2;

    //오른쪽 작은 바위
    context.beginPath();
    context.moveTo(1043,290);
    context.lineTo(1054,348);
    context.lineTo(1075,360);
    context.lineTo(1100,345);
    context.lineTo(1090,310);
    context.closePath();
    context.fill();

    //왼쪽 작은 바위
    context.beginPath();
    context.moveTo(173,240);
    context.lineTo(184,288);
    context.lineTo(205,300);
    context.lineTo(230,295);
    context.lineTo(220,260);
    context.closePath();
    context.fill();

    //오른쪽 큰 바위
    context.shadowOffsetY=3;
   
    context.beginPath();
    context.moveTo(995,280);
    context.lineTo(970,350);
    context.lineTo(1020,380);
    context.lineTo(1055,350);
    context.lineTo(1043,285);
    context.closePath();
    context.fill();

    //왼쪽 큰 바위
    context.beginPath();
    context.moveTo(125,220);
    context.lineTo(100,290);
    context.lineTo(150,320);
    context.lineTo(185,290);
    context.lineTo(173,225);
    context.closePath();
    context.fill();

    context.shadowOffsetY=0;
    context.shadowBlur=0;
}

function drawNeogool(){
    
    //너굴 몸통
    context.fillStyle='rgb(179, 106, 46)';
    context.beginPath();
    context.moveTo(650,630);
    context.bezierCurveTo(640,470,780,470,780,630);
    context.fill();
    
    //왼팔
    context.beginPath();
    context.moveTo(668,540);
    context.bezierCurveTo(620,546,610,557,620,570);
    context.bezierCurveTo(630,573,640,570,660,565);
    context.fill();

    //오른팔
    context.beginPath();
    context.moveTo(753,535);
    context.bezierCurveTo(795,540,805,530,815,535);
    context.bezierCurveTo(835,545,800,570,760,555);
    context.fill();

    //발
    context.strokeStyle='rgb(179, 106, 46)';
    context.lineCap="round";
    context.lineWidth=23;
    context.beginPath();
    context.moveTo(685,638);
    context.lineTo(685,678);
    context.stroke();

    context.beginPath();
    context.moveTo(735,638);
    context.lineTo(735,678);
    context.stroke();

    //앞치마
    context.fillStyle='rgb(89, 46, 207)';
    context.beginPath();
    context.moveTo(650,600);
    context.bezierCurveTo(660,570,770,570,780,600);
    context.lineTo(790,650);
    context.bezierCurveTo(770,680,660,680,640,650);
    context.moveTo(650,600);
    context.fill();

    image2.src='Resource/leaf.png';
    image2.onload=function(e){
        context.drawImage(image2,700,600,30,30);
    };

    //너굴 왼쪽 귀
    context.fillStyle='rgb(179, 106, 46)';
    context.save();
    context.beginPath();
    context.rotate((Math.PI/180)*10);
    context.scale(1.3,1);
    context.arc(625,265,18.5,0,2*Math.PI,true);
    context.restore();
    context.fill();

    //너굴 오른쪽 귀
    context.save();
    context.beginPath();
    context.rotate((Math.PI/180)*165);
    context.scale(1.3,1);
    context.arc(-410,-563,18.5,0,2*Math.PI,true);
    context.restore();
    context.fill();
    
     //너굴 왼쪽 귀 안쪽
     context.fillStyle='rgb(223, 127, 147)';
     context.beginPath();
     context.arc(660,405,13,0,2*Math.PI);
     context.fill();
 
    //너굴 오른쪽 귀 안쪽
    context.beginPath();
    context.arc(753,403,13,0,2*Math.PI);
    context.fill();

    //너굴 얼굴
    context.fillStyle='rgb(179, 106, 46)';
    var centerX=710;
    centerY=470;
    radiusX=80;
    radiusY=63;
    resol=0.01;
    increase_resol=resol;
    end_angle=Math.PI*2-resol;

    context.beginPath();
    context.moveTo(centerX+radiusX*Math.cos(0),centerY+radiusY*Math.sin(0));
    for(;increase_resol<end_angle;increase_resol+=resol){
        context.lineTo(centerX+radiusX*Math.cos(increase_resol),
        centerY+radiusY*Math.sin(increase_resol));
    }

    context.closePath();
    context.fill();
    
    //너굴 얼굴 짙은부분 
    context.fillStyle='rgb(68, 31, 19)';
    context.beginPath();
    context.moveTo(705,420);
    context.bezierCurveTo(630,428,643,480,644,477);
    context.bezierCurveTo(673,518,680,433,760,488);
    context.bezierCurveTo(780,500,800,420,705,420);
    context.fill();

    
    //너굴 왼쪽 눈 (갈색,흰색,보라색 순서대로)
    context.fillStyle='rgb(179, 106, 46)';
    context.beginPath();
    context.moveTo(660,455);
    context.bezierCurveTo(663,423,690,443,688,445);
    context.fill();

    context.fillStyle='rgb(255,255,255)';
    context.beginPath();
    context.moveTo(660,455);
    context.bezierCurveTo(655,460,688,485,688,445);
    context.fill();

    context.fillStyle='rgb(89, 46, 207)';
    context.beginPath();
    context.moveTo(667,452);
    context.quadraticCurveTo(675,470,683,447);
    context.fill();

    //너굴 오른쪽 눈
    context.fillStyle='rgb(179, 106, 46)';
    context.beginPath();
    context.moveTo(730,443);
    context.bezierCurveTo(728,436,755,425,758,455);
    context.fill();

    context.fillStyle='rgb(255,255,255)';
    context.beginPath();
    context.moveTo(730,443);
    context.bezierCurveTo(722,468,761,473,758,455);
    context.fill();

    context.fillStyle='rgb(89, 46, 207)';
    context.beginPath();
    context.moveTo(736,445);
    context.quadraticCurveTo(739,467,753,453);
    context.fill();
    context.closePath();

    //너굴 코
    context.fillStyle='rgb(68, 31, 19)';
    context.shadowColor='rgb(41, 19, 12)';
    context.shadowBlur=4;
    context.shadowOffsetY=2.5;

    context.beginPath();
    context.arc(713,495,13,0,2*Math.PI);
    context.fill();

    context.shadowBlur=0;
    context.shadowOffsetY=0;
}

function click_one(){
context.canvas.onmousedown=function(e){

    context.fillStyle='white';
    context.strokeStyle='white';
    context.lineWidth=10;
    context.lineJoin='round';
    
    context.beginPath();
    context.moveTo(280,550);
    context.lineTo(530,550);
    context.lineTo(530,680);
    context.lineTo(280,680);
    context.lineTo(280,550);
    context.fill();
    context.stroke();

    context.lineCap="round";
    context.lineWidth=30;
    context.strokeStyle='rgb(160, 218, 143)';
    context.beginPath();
    context.moveTo(310,548);
    context.lineTo(380,548);
    context.stroke();

    context.fillStyle='black';
    context.font="13px 굴림";
    context.fillText('너굴',330,553);

    context.font="18px 굴림"
    context.fillText('나는 이 마을에서',310,588);
    context.fillText('가게를 경영하고 있는',310,618);
    context.fillText('너굴이라고 해구리',310,648);
    }
}

//initialization
drawGround();
drawStore();
drawRoof();
drawSign();
drawWindow();
drawDoor();
drawWeeds();
drawRocks();
drawNeogool();
click_one();

