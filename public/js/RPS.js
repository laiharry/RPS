// JavaScript Document

//const WCConnect = require('./wcConnect');
let wcConnect = new WCConnect();
wcConnect.startConnection();

// web interface
function overlayOn() {
	document.getElementById("divOverlay").style.display = "block";
}
  
function overlayOff() {
	document.getElementById("divOverlay").style.display = "none";
}

function newGame() {
	wcConnect.wsSend("newGame",$("#formNickname").serializeArray());
//	var formData = JSON.stringify($("#formNickname").serializeArray());
//	var formData = $("#formNickname").serializeArray();
//	var msg = `{"tag": "newGame", "data": ${formData}}`;
//	console.log(msg);
//	wcConnect.send(msg);
}

function quitGame() {
	wcConnect.wsSend("quitGame",$("#formNickname").serializeArray());
}

function webChatSend() {
	wcConnect.wsSend("msg",$("#formWebChat").serializeArray());
//	var formData = JSON.stringify($("#formWebChat").serializeArray());
//	var formData = $("#formWebChat").serializeArray();
//	var msg = `{"tag": "msg", "data": ${formData}}`;
//	wcConnect.send(msg);

}


let result = [0,0];
let ok = [0, 0];
let hand = [0,0];

function webView() {
	$("#imgBigIcon0").attr("src","img/blank.png");
	$("#imgBigIcon1").attr("src","img/blank.png");
	$("#imgRock0").attr("src","img/Rock.png");
	$("#imgPaper0").attr("src","img/Paper.png");
	$("#imgScissors0").attr("src","img/Scissors.png");
	$("#imgRock1").attr("src","img/Rock.png");
	$("#imgPaper1").attr("src","img/Paper.png");
	$("#imgScissors1").attr("src","img/Scissors.png");

}

// will move to server
function calResult() {
	if (hand[0] == 0 && hand[1] == 1) {
		result[1] += 1;
	} else if (hand[0] == 1 && hand[1] == 0) {
		result[0] += 1;
	} else if (hand[0] == 1 && hand[1] == 2) {
		result[1] += 1;
	} else if (hand[0] == 2 && hand[1] == 1) {
		result[0] += 1;
	} else if (hand[0] == 2 && hand[1] == 0) {
		result[1] += 1;
	} else if (hand[0] == 0 && hand[1] == 2) {
		result[0] += 1;
	}
}

// client
function showResult() {
//	$("#divResult > h1").text(`${result[0]} : ${result[1]}`);
	$("#divResult > h2").text(`${ok[0]} : ${ok[1]}`);
	$("#divResult > h3").text(`${hand[0]} : ${hand[1]}`);
}

function resetBtn(zone, myPlay) {
	$(`#btn${myPlay}${zone}`).on('click', () => {btnClicked(zone,myPlay);});
	$(`#btn${myPlay}${zone}`).attr("style","opacity:1");
}

function checkOK() {
	if (ok[0] === 1 && ok[1] === 1) {
		ok[0] = 0;
		ok[1] = 0;
		btnDisable(0);	
		btnDisable(1);	
		$("#imgBigIcon0").animate({left: "+=25%"}, 2000);
		$("#imgBigIcon1").animate({right: "+=25%"}, 2000, () => {
			calResult();
			showResult();
			btnEnable();
			$("#imgBigIcon0").css({left: "-=25%"});
			$("#imgBigIcon1").css({right: "-=25%"});
			$("#imgBigIcon0").attr("src","img/blank.png");
			$("#imgBigIcon1").attr("src","img/blank.png");
		});
	} else if (ok[0] === 1 && ok[1] === 0) {
		showResult();
		btnDisable(0);	
	} else if (ok[0] === 0 && ok[1] === 1) {
		showResult();
		btnDisable(1);	
	}
}

function btnEnable() {
//	resetBtn();
	btnDisable(0);
	btnDisable(1);
	resetBtn(0,"Rock");
	resetBtn(0,"Paper");
	resetBtn(0,"Scissors");
//	resetBtn(1,"Rock");
//	resetBtn(1,"Paper");
//	resetBtn(1,"Scissors");
}

function btnDisable(zone){
	$(`#btnRock${zone}`).off('click');
	$(`#btnPaper${zone}`).off('click');
	$(`#btnScissors${zone}`).off('click');
	$(`#btnRock${zone}`).attr("style","opacity:0.5");
	$(`#btnPaper${zone}`).attr("style","opacity:0.5");
	$(`#btnScissors${zone}`).attr("style","opacity:0.5");
}

function btnClicked(zone,btn) {
	if (zone == 0) {
		if (btn == "Rock") wcConnect.wsSend("hand","0");
		if (btn == "Paper") wcConnect.wsSend("hand","1");
		if (btn == "Scissors") wcConnect.wsSend("hand","2");

	$(`#demo${zone}`).text(`${btn} clicked.`);
	$(`#imgBigIcon${zone}`).attr("src","img/" + btn + ".png");
	ok[`${zone}`] = 1;
//	if (btn == "Rock") hand[`${zone}`] = 0;
//	if (btn == "Paper") hand[`${zone}`] = 1;
//	if (btn == "Scissors") hand[`${zone}`] = 2;
	checkOK();
	}

};

