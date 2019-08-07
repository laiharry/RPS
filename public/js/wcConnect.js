
class WCConnect {
	constructor() {
        var socket = null;
//        this.PORT =  8000;
//        this.IP ='localhost';
        this.IP = 'rps-rps.apps.us-east-2.online-starter.openshift.com';
//        this.IP ='rpsserver-rps.apps.us-east-2.online-starter.openshift.com';
//        this.IP ='apps.us-east-2.online-starter.openshift.com';
//    this.PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000;
    this.PORT = 8080;
//    this.IP = process.env.IP  || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
//    this.IP = '0.0.0.0';


  }

//    var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
//    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//    this.port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
//    this.IP = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost' || '0.0.0.0';

    startConnection() {
        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        if (window.WebSocket) {
//            console.log(`ws://${this.IP}:${this.PORT}`);

//            var s = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");
//			socket = new WebSocket("ws://localhost:8080/ws");
            this.socket = new WebSocket("ws://rps-rps.apps.us-east-2.online-starter.openshift.com:8080/ws");  
//            this.socket = new WebSocket(`ws://${this.IP}:${this.PORT}/ws`);
//            this.socket = new WebSocket(`ws://localhost:3000/ws`);
            this.socket.onmessage = function (event) {
                console.log(event.data);
                var v = JSON.parse(event.data);
                if (v.tag == "bcClientsSize") {
                    console.log(v.data);
                }
                if (v.tag == "gameReady") {
                    $("#divdebugMsg > p").text("Game Ready");
                    var r = JSON.parse(v.data);
                    $("#divMyResult").text(r.result[0]);
                    $("#divOpResult").text(r.result[1]);
                    $("#divMyName").text(r.name[0]);
                    $("#divOpName").text(r.name[1]);
                    if (r.hand[1] == 0) {
                        ok[1] = 1;
                        btnClicked(1,"Rock");
                        $(`#imgBigIcon1`).attr("src","img/Rock.png");
                        checkOK();
                    }
                    if (r.hand[1] == 1) {
                        ok[1] = 1;
                        btnClicked(1,"Paper");
                        $(`#imgBigIcon1`).attr("src","img/Paper.png");
                        checkOK();
                    }
                    if (r.hand[1] == 2) {
                        ok[1] = 1;
                        btnClicked(1,"Scissors");
                        $(`#imgBigIcon1`).attr("src","img/Scissors.png");
                        checkOK();
                    }
                }
        
                if (v.playlist) {
                    var ta = document.getElementById('divPlayersList');
                    let p = v.playlist;
                    $("#divPlayersList > p").text('');
                    p.forEach( (item, index) => {
                        let i = item;
                        $("#divPlayersList > p").append(`<br\>${item.nickname}`);
                    });
                }
                var ta = document.getElementById('responseText');
                ta.value = ta.value + '\n' + event.data
            };
            this.socket.onopen = function (event) {
                var ta = document.getElementById('responseText');
                ta.value = "Connected.";
            };
            this.socket.onclose = function (event) {
                var ta = document.getElementById('responseText');
                ta.value = ta.value + "\nConnection is closed.\n";
            };
        } else {
            alert("Browser does not support WebSocket！");
        }
    }

    send(message) {
        if (!window.WebSocket) {
            return;
        }
        if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            alert("Connection is closed.");
        }
    }

    wsSend(tag,data) {
        var d = JSON.stringify(data);
        var msg = `{"tag": "${tag}", "data": ${d}}`;
        this.send(msg);
    }
}

exports = WCConnect;

