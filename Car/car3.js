var canvas = document.getElementById('car');
var ctx = canvas.getContext("2d"); 

var animate = function() {
	requestAnimationFrame(animate);
	ctx.globalAlpha = 1.0;
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	drawBackground();
	drawSmoke();
	car();
}

var startX = 675;
var startY = 350;
var startRadius = 10;
var startAlpha = 1.0;
var maxRadius = 80;

var originalSpeed = 1;
var speed = originalSpeed;
var maxSpeed = 5;

var alphaMod = 1.0;

// Smoke class object.
function Smoke(x, y) {
	this.x = x;
	this.y = y;
	this.radius = startRadius;
	this.alpha = startAlpha;
	
	//draw the smoke object.
	this.draw = function() {
		ctx.beginPath();
		
		// Causes a vibration effect to smoke. 
		var dx = Math.random() * 10;
		var dy = Math.random() * 8;
		
		ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
		ctx.arc(this.x + dx, this.y + dy, this.radius, 0, 2* Math.PI);
		ctx.arc(this.x + dx, this.y - dy, this.radius, 0, 2* Math.PI);
		ctx.arc(this.x - dx, this.y + dy, this.radius, 0, 2* Math.PI);
		ctx.arc(this.x - dx, this.y - dy, this.radius, 0, 2* Math.PI);
		
		ctx.closePath();

		var color = "rgba(121,119,118,";
		color += this.alpha;
		color += ")";
		ctx.fillStyle = color;

		ctx.fill();
	}
	
	// Make slight modifications to animate the smoke.
	this.update = function() {
		this.y -= speed;
		this.x += speed;
		if (this.radius < maxRadius) {
			this.radius += 0.5;
		}
		
		if (this.x - this.radius > canvas.width) {
			this.x = startX;
			this.y = startY;
			this.radius = startRadius;
			this.alpha = 1.0
		} else {
			this.alpha *= 0.988;
		}

		this.draw();
	}
}

var dx = 30;
var dy = 30;

// Smoke Array is to simulate realistic smoke.
var smokeArray = [];

for (var i = 0; i < 4; i++) {
	var sm = new Smoke(startX + dx, startY + dy);
	smokeArray.push(sm);
	dx = -dx;
	dy = -dy;
}

// Slider to change speed of animation.
function animationSpeedChanged(value) {
	var diff = maxSpeed * value / 100;
	
	speed = Math.max(originalSpeed * diff, 1);
}

// Draws smoke objects.
function drawSmoke() {
	for (var i = 0; i < smokeArray.length; i++) {
		smokeArray[i].update();
	}
}

//draws all the backgrounds
function drawBackground() {
	drawSky();
	drawRoad1();
	drawRoadLine();
	drawRoad2();
}

//sky background
function drawSky() {
	ctx.beginPath();
	ctx.moveTo(1,-1);
	ctx.lineTo(802,-1);
	ctx.lineTo(802,466);
	ctx.lineTo(1,466);
	ctx.lineTo(1,-1);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "#95c8d6";
	ctx.fill();
}

//road 1
function drawRoad1() {
    ctx.beginPath();
    ctx.moveTo(-101,465);
    ctx.lineTo(866,232);
    ctx.lineTo(952,589);
    ctx.lineTo(-15,823);
    ctx.lineTo(-101,465);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#2a2c30";
    ctx.fill();
}

// RoadLine class object. Animates the road lines.
function RoadLine(x1, y1, x2, y2) {
	this.startX1 = x1;
	this.startY1 = y1;
	this.diffX = x2 - x1;
	this.diffY = y2 - y1;
	
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	
	//Draws Road Lines.
	this.draw = function() {
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.closePath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = "10";
		ctx.stroke();
	}
	
	// Make modifications to animate the roadline. 
	this.update = function() {
		this.x1 += speed * 2;
		this.y1 += speed * 2 * slope;
		this.x2 = this.x1 - this.diffX;
		this.y2 = this.y1 - this.diffY;
		
		if (this.x1 > canvas.width) {
			this.x2 = 0;
			this.y2 = 576;
			this.x1 = this.x2 - this.diffX;
			this.y1 = this.y2 - this.diffY;
		} 
		
		this.draw();
	}
}

var roadLine = new RoadLine(-51, 591, 111, 543);
var slope = -0.296296;


function drawRoadLine() {
	roadLine.update();
}

//Draws a background of road.
function drawRoad2() {
    ctx.shadowColor ="rgba(0,0,0,0)";
    ctx.strokeStyle ="rgba(0,0,0,1)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-54,819);
    ctx.lineTo(1008,476);
    ctx.lineTo(1079,595);
    ctx.lineTo(17,938);
    ctx.lineTo(-54,819);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#929599";
    ctx.fill();
}

// draws the car. 
function car() { 
// body frame
	ctx.beginPath();
	ctx.moveTo(721,322);
	ctx.bezierCurveTo(728,332,716,358,716,364);
	ctx.bezierCurveTo(713,367,706,373,702,376);
	ctx.bezierCurveTo(702,367,701,349,700,340);
	ctx.bezierCurveTo(700,335,699,331,694,318);
	ctx.bezierCurveTo(678,315,688,316,688,317);
	ctx.bezierCurveTo(679,311,670,319,665,320);
	ctx.bezierCurveTo(663,325,658,335,656,340);
	ctx.bezierCurveTo(654,353,650,379,648,392);
	ctx.bezierCurveTo(648,395,649,401,649,404);
	ctx.bezierCurveTo(601,419,504,449,456,464);
	ctx.bezierCurveTo(457,458,458,446,458,440);
	ctx.bezierCurveTo(459,432,460,417,460,409);
	ctx.bezierCurveTo(458,404,454,393,452,388);
	ctx.bezierCurveTo(448,384,439,376,434,372);
	ctx.bezierCurveTo(426,372,409,372,400,372);
	ctx.bezierCurveTo(396,377,388,386,384,390);
	ctx.bezierCurveTo(381,396,374,407,370,413);
	ctx.bezierCurveTo(369,420,366,433,364,440);
	ctx.bezierCurveTo(363,453,360,479,358,492);
	ctx.bezierCurveTo(359,497,361,507,362,512);
	ctx.bezierCurveTo(355,515,340,522,332,525);
	ctx.bezierCurveTo(320,527,296,530,284,532);
	ctx.bezierCurveTo(271,530,245,527,232,525);
	ctx.bezierCurveTo(219,522,194,515,181,512);
	ctx.bezierCurveTo(166,507,136,496,121,490);
	ctx.bezierCurveTo(112,486,93,477,84,472);
	ctx.bezierCurveTo(77,468,63,460,56,456);
	ctx.bezierCurveTo(60,451,67,441,70,436);
	ctx.bezierCurveTo(67,424,60,401,56,389);
	ctx.bezierCurveTo(56,386,56,379,56,376);
	ctx.bezierCurveTo(60,374,68,370,72,368);
	ctx.bezierCurveTo(74,361,79,348,81,341);
	ctx.bezierCurveTo(86,338,95,331,100,328);
	ctx.bezierCurveTo(108,325,123,319,130,316);
	ctx.bezierCurveTo(142,311,166,302,178,297);
	ctx.bezierCurveTo(191,293,216,286,229,282);
	ctx.bezierCurveTo(238,281,255,278,264,276);
	ctx.bezierCurveTo(268,273,276,267,280,264);
	ctx.bezierCurveTo(287,258,300,247,306,241);
	ctx.bezierCurveTo(312,236,324,227,330,222);
	ctx.bezierCurveTo(341,216,362,204,373,198);
	ctx.bezierCurveTo(384,196,407,191,418,188);
	ctx.bezierCurveTo(434,187,465,185,480,184);
	ctx.bezierCurveTo(493,185,518,187,530,188);
	ctx.bezierCurveTo(543,191,569,198,582,201);
	ctx.bezierCurveTo(595,205,620,212,632,216);
	ctx.bezierCurveTo(640,222,657,234,665,240);
	ctx.bezierCurveTo(668,244,675,251,678,254);
	ctx.bezierCurveTo(687,255,704,257,713,258);
	ctx.bezierCurveTo(719,271,723,297,721,322);
	ctx.closePath();
	ctx.stroke();
	ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 1;
    ctx.shadowColor = "rgba(0,0,0,0.4)";
	ctx.fillStyle = "#fce54e";
	ctx.fill();

//head light left
    ctx.beginPath();
    ctx.moveTo(84,342);
    ctx.bezierCurveTo(89,345,96,353,101,356);
    ctx.bezierCurveTo(102,363,101,375,101,382);
    ctx.bezierCurveTo(94,379,82,370,75,367);
    ctx.bezierCurveTo(76,350,82,344,84,342);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#f0f2c1";
    ctx.fill();
         
//center grill
    ctx.beginPath();
    ctx.moveTo(103,368);
    ctx.bezierCurveTo(119,374,153,383,169,388);
    ctx.bezierCurveTo(171,389,165,399,156,407);
    ctx.bezierCurveTo(143,403,131,399,104,389);
    ctx.bezierCurveTo(101,383,103,373,103,368);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#fce54e";
    ctx.fill();

//headlight right
    ctx.beginPath();
    ctx.moveTo(166,395);
    ctx.bezierCurveTo(167,393,170,388,171,385);
    ctx.bezierCurveTo(174,384,179,382,182,381);
    ctx.bezierCurveTo(195,382,220,383,232,384);
    ctx.bezierCurveTo(245,385,270,386,283,386);
    ctx.bezierCurveTo(291,386,308,387,316,387);
    ctx.bezierCurveTo(318,388,321,389,322,390);
    ctx.bezierCurveTo(323,394,324,403,325,407);
    ctx.bezierCurveTo(325,405,328,414,328,416);
    ctx.bezierCurveTo(318,418,298,419,288,420);
    ctx.bezierCurveTo(275,419,246,416,233,415);
    ctx.bezierCurveTo(215,412,180,407,161,404);
    ctx.bezierCurveTo(166,397,164,398,166,395);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#f0f2c1";
    ctx.fill();

//front grill 1
    ctx.beginPath();
    ctx.moveTo(80,427);
    ctx.bezierCurveTo(80,429,80,427,80,429);
    ctx.bezierCurveTo(88,430,98,440,106,441);
    ctx.bezierCurveTo(111,444,126,448,130,451);
    ctx.bezierCurveTo(143,454,168,460,181,463);
    ctx.bezierCurveTo(186,464,196,466,201,467);
    ctx.bezierCurveTo(200,464,198,457,197,453);
    ctx.bezierCurveTo(179,449,144,442,126,438);
    ctx.bezierCurveTo(114,434,88,419,76,414);
    ctx.bezierCurveTo(77,416,79,425,80,427);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#020202";
    ctx.fill();

//front grill 2
    ctx.beginPath();
    ctx.moveTo(78,439);
    ctx.bezierCurveTo(84,442,95,447,100,450);
    ctx.bezierCurveTo(107,453,120,458,127,461);
    ctx.bezierCurveTo(140,464,165,469,178,472);
    ctx.bezierCurveTo(184,473,195,474,200,474);
    ctx.bezierCurveTo(201,478,202,485,202,488);
    ctx.bezierCurveTo(197,487,188,485,183,484);
    ctx.bezierCurveTo(170,481,145,475,132,472);
    ctx.bezierCurveTo(120,466,95,455,82,449);
    ctx.bezierCurveTo(81,447,79,442,78,439);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#020202";
    ctx.fill();

//fog light
    ctx.beginPath();
    ctx.moveTo(224,455);
    ctx.bezierCurveTo(225,463,227,481,228,488);
    ctx.bezierCurveTo(234,489,244,489,249,490);
    ctx.bezierCurveTo(249,483,248,469,247,462);
    ctx.bezierCurveTo(246,460,245,457,244,455);
    ctx.bezierCurveTo(239,454,228,452,223,451);
    ctx.bezierCurveTo(223,452,224,454,224,455);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#020202";
    ctx.fill();

//hood lining
	ctx.beginPath();
	ctx.moveTo(268,384);
	ctx.bezierCurveTo(271,381,277,375,280,372);
	ctx.bezierCurveTo(293,367,318,356,330,350);
	ctx.bezierCurveTo(335,348,344,343,349,340);
	ctx.bezierCurveTo(357,338,373,333,381,330);
	ctx.bezierCurveTo(394,326,419,319,432,315);
	ctx.bezierCurveTo(437,312,448,306,453,303);
	ctx.stroke();

//front window
    ctx.beginPath();
    ctx.moveTo(456,304);
    ctx.bezierCurveTo(462,294,474,274,480,264);
    ctx.bezierCurveTo(484,258,492,246,496,240);
    ctx.bezierCurveTo(499,234,505,222,508,216);
    ctx.bezierCurveTo(502,213,490,207,484,204);
    ctx.bezierCurveTo(471,203,445,202,432,201);
    ctx.bezierCurveTo(419,201,394,202,381,202);
    ctx.bezierCurveTo(378,203,371,204,368,204);
    ctx.bezierCurveTo(359,210,336,219,326,225);
    ctx.bezierCurveTo(322,228,311,235,306,238);
    ctx.bezierCurveTo(299,243,290,255,282,260);
    ctx.bezierCurveTo(275,265,261,274,254,278);
    ctx.bezierCurveTo(305,285,406,298,456,304);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#9db6c9";
    ctx.fill();

//passenger window
    ctx.beginPath();
    ctx.moveTo(477,303);
    ctx.bezierCurveTo(479,300,484,295,486,292);
    ctx.bezierCurveTo(494,279,509,254,517,241);
    ctx.bezierCurveTo(520,236,525,226,528,221);
    ctx.bezierCurveTo(532,219,540,214,544,212);
    ctx.bezierCurveTo(549,211,558,208,562,207);
    ctx.bezierCurveTo(567,208,577,209,582,209);
    ctx.bezierCurveTo(594,214,618,225,630,230);
    ctx.bezierCurveTo(633,232,640,237,643,239);
    ctx.bezierCurveTo(647,245,654,258,658,264);
    ctx.bezierCurveTo(613,274,522,293,477,303);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#9db6c9";
    ctx.fill();

//mirror
    ctx.beginPath();
    ctx.moveTo(501,289);
    ctx.bezierCurveTo(503,288,506,285,508,283);
    ctx.bezierCurveTo(509,281,511,276,512,274);
    ctx.bezierCurveTo(513,273,516,271,517,270);
    ctx.bezierCurveTo(520,270,527,271,530,271);
    ctx.bezierCurveTo(535,272,544,273,549,274);
    ctx.bezierCurveTo(550,275,553,278,554,279);
    ctx.bezierCurveTo(554,282,553,289,553,292);
    ctx.bezierCurveTo(552,294,550,298,549,300);
    ctx.bezierCurveTo(545,301,536,302,532,302);
    ctx.bezierCurveTo(524,301,509,298,501,296);
    ctx.bezierCurveTo(501,294,501,291,501,289);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#fce54e";
    ctx.fill();

//door frame
    ctx.beginPath();
    ctx.moveTo(479,303);
    ctx.bezierCurveTo(479,340,478,405,477,442);
    ctx.bezierCurveTo(490,438,515,431,528,427);
    ctx.bezierCurveTo(541,424,566,415,579,412);
    ctx.bezierCurveTo(587,410,604,400,612,398);
    ctx.bezierCurveTo(613,392,617,387,618,381);
    ctx.bezierCurveTo(619,368,621,353,622,340);
    ctx.bezierCurveTo(622,332,623,315,623,307);
    ctx.bezierCurveTo(619,299,610,284,605,276);
    ctx.stroke();

//window lining
    ctx.beginPath();
    ctx.moveTo(608,274);
    ctx.bezierCurveTo(601,258,586,225,578,209);
    ctx.bezierCurveTo(580,210,584,211,586,211);
    ctx.bezierCurveTo(594,226,609,257,617,272);
    ctx.fillStyle = "#020202";
    ctx.fill();
    ctx.stroke();

//spoiler
    ctx.beginPath();
    ctx.moveTo(690,260);
    ctx.bezierCurveTo(695,259,705,257,710,256);
    ctx.bezierCurveTo(708,252,704,245,702,241);
    ctx.bezierCurveTo(700,237,697,228,695,223);
    ctx.bezierCurveTo(693,222,690,221,689,220);
    ctx.bezierCurveTo(677,219,652,218,640,217);
    ctx.bezierCurveTo(635,217,643,216,640,216);
    ctx.bezierCurveTo(640,219,643,223,646,225);
    ctx.bezierCurveTo(657,227,674,228,685,229);
    ctx.bezierCurveTo(686,237,689,252,690,260);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#fce54e";
    ctx.fill();

//front tire  
	ctx.beginPath();
	ctx.moveTo(418,383);
	ctx.bezierCurveTo(396,380,373,409,369,447);
	ctx.bezierCurveTo(364,484,379,517,402,520);
	ctx.bezierCurveTo(424,523,447,494,451,457);
	ctx.bezierCurveTo(456,419,441,386,418,383);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.fill();
	
//front rim
    ctx.beginPath();
    ctx.moveTo(412,402);
    ctx.bezierCurveTo(426,402,436,424,435,451);
    ctx.bezierCurveTo(434,478,422,499,409,499);
    ctx.bezierCurveTo(396,498,386,476,387,450);
    ctx.bezierCurveTo(388,423,399,402,412,402);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "grey";
    ctx.fill();
			   		
// rear wheel
    ctx.beginPath();
    ctx.moveTo(679,319);
    ctx.bezierCurveTo(690,320,697,340,696,365);
    ctx.bezierCurveTo(694,390,685,409,674,409);
    ctx.bezierCurveTo(663,408,656,388,657,363);
    ctx.bezierCurveTo(659,338,668,318,679,319);
    ctx.closePath();
    ctx.stroke();  
    ctx.fillStyle = "black";
    ctx.fill();
	
//rear rim
    ctx.beginPath();
    ctx.moveTo(678,389);
    ctx.bezierCurveTo(683,389,687,376,687,361);
    ctx.bezierCurveTo(687,345,683,332,678,332);
    ctx.bezierCurveTo(673,332,669,345,669,361);
    ctx.bezierCurveTo(669,376,673,389,678,389);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "grey";
    ctx.fill();

//gas cap
    ctx.beginPath();
    ctx.moveTo(683,278);
    ctx.bezierCurveTo(684,283,686,293,687,298);
    ctx.bezierCurveTo(691,297,698,294,701,293);
    ctx.bezierCurveTo(701,289,700,282,699,278);
    ctx.bezierCurveTo(698,276,697,272,696,270);
    ctx.bezierCurveTo(693,271,687,272,684,273);
    ctx.bezierCurveTo(684,274,683,277,683,278);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#fce54e";
    ctx.fill();
	
//lower front lip lining          
    ctx.beginPath();
    ctx.moveTo(358,496);
    ctx.bezierCurveTo(349,499,330,506,320,509);
    ctx.bezierCurveTo(314,511,301,514,295,515);
    ctx.bezierCurveTo(287,515,272,515,264,515);
    ctx.bezierCurveTo(252,514,227,511,215,509);
    ctx.bezierCurveTo(204,506,183,501,172,498);
    ctx.bezierCurveTo(163,495,145,490,136,487);
    ctx.bezierCurveTo(128,484,111,477,103,473);
    ctx.bezierCurveTo(97,470,84,465,78,462);
    ctx.bezierCurveTo(75,458,68,451,64,447);
    ctx.stroke();
		
//rear bumper lining
	ctx.beginPath();
	ctx.moveTo(698,331);
	ctx.lineTo(721,322);
	ctx.stroke();
			   
//front fender lining
    ctx.beginPath();
    ctx.moveTo(328,413);
    ctx.lineTo(376,404);
    ctx.stroke();
			   
//hood lining
    ctx.beginPath();
    ctx.moveTo(112,370);
    ctx.bezierCurveTo(112,373,112,378,112,380);
    ctx.bezierCurveTo(124,384,147,391,159,395);
    ctx.bezierCurveTo(161,393,164,389,165,387);
	ctx.fillStyle = "#020202";
	ctx.fill();
    ctx.stroke();
			   
//lining mirror
    ctx.beginPath();
    ctx.moveTo(478,300);
    ctx.bezierCurveTo(483,293,494,278,499,270);
    ctx.bezierCurveTo(501,273,505,280,507,283);
    ctx.bezierCurveTo(506,285,503,289,501,291);
    ctx.bezierCurveTo(502,293,503,296,503,297);
    ctx.bezierCurveTo(497,298,486,300,480,301);
	ctx.fillStyle = "#fce54e";
	ctx.fill();
	ctx.stroke();
	
//side skirt lining front
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(613,396);
    ctx.lineTo(647,388);
    ctx.stroke();
			 
//side skirt lining rear
    ctx.beginPath();
    ctx.moveTo(456,446);
    ctx.lineTo(485,439);
    ctx.stroke();
			   
//roof lining
	ctx.beginPath();
	ctx.moveTo(507,213);
	ctx.bezierCurveTo(515,211,531,206,539,203);
	ctx.bezierCurveTo(549,202,568,200,578,199);
	ctx.stroke();
}

// Starts animation.
animate();