var b = [];
var player = 'x', computer = 'o';
const NONE = '&nbsp;';
var isPlaying = false;
var reset;
var position;
var w, d, s;

function resetXo() {
	w.hide();
	d.hide();
	s.hide();
	if(reset.innerHTML == 'Start') {
		isPlaying = true;
		reset.innerHTML = 'Reset'
		if (Math.round(Math.random()) == 0 ) {
			showStatus('You goes first', 'warning');
		} else {
			showStatus('Computer goes first', 'warning');
			playComp();
		}
	} else {
		reset.innerHTML = 'Start';
		isPlaying = false;
		for(i=1; i<10; i++){
			move(i, NONE);
		}
	}
	position = 0;
}

function load() {
	position=0;
	b[0]={};
	b[0].innerHTML='';
	for(var i=1; i<10; i++){
		b[i] = document.getElementById('b'+i);
	}
	reset = document.getElementById('reset');
	w = $('#warning');
	d = $('#danger');
	s = $('#success');
	w.hide();
	d.hide();
	s.hide();
}

function xo(pos) {
	if(isPlaying && !isSet(pos)) {
		move(position, NONE);
		position = pos;
		move(position, player);
	}
}

function getMove() {
	for(var i=1; i<10; i++) {
		t = getBoardCopy();
		if (!isSetIn(t, i)) {
			moveIn(t, i, computer);
			if (isWinner(t, computer)) {
				return i;
			}
		}
	}
	for(var i=1; i<10; i++) {
		t = getBoardCopy();
		if (!isSetIn(t, i)) {
			moveIn(t, i, player);
			if (isWinner(t, player)) {
				return i;
			}
		}
	}
	if(!isSet(5)) return 5;
	var i = getRandomMove([2,4,6,8]);
	if(i!=0) return i;
	return getRandomMove([1,3,7,9]);
}

function getRandomMove(m) {
	tm = [];
	for(var i = 0; i<4; i++) {
		if(!isSet(m[i])) {
			tm.push(m[i]);
		}
	}
	if (tm.length == 0) {
		return 0;
	} else {
		return tm[Math.round(Math.random()*10)%tm.length];
	}
}

function confirmMove () {
	if (isPlaying) {
		w.hide();
		if(position != 0) {
			move(position, player);
			position=0;
			if(isWinner(b, player)) {
				showStatus('You won the game', 'success');
				isPlaying = false;
			} else if (isFull()) {
				showStatus('Match Draw', 'warning');
				isPlaying = false;
			}
			playComp();
		} 
	}
}

function playComp() {
	if(isPlaying) {
		pos = getMove();
		if(pos != 0 && !isSet(pos)) {
			move(pos, computer);
			if(isWinner(b, computer)) {
				showStatus('You lose the game', 'danger');
				isPlaying = false;
			} else if (isFull()) {
				showStatus('Match Draw', 'warning');
				isPlaying = false;
			}
		}
	}
}

function getBoardCopy() {
	temp = [];
	for (var i=1; i < 10; i++) {
		temp[i] = {};
		temp[i].innerHTML = b[i].innerHTML;
	}
	return temp;
}

function isFull() {
	for(var i=1; i<10; i++) {
		if(!isSet(i)) {
			return false;
		}
	}
	return true;
}

function isSet(pos) {
	
	return (b[pos].innerHTML == player || b[pos].innerHTML == computer);
}

function isSetIn(t, pos) {
	return (t[pos].innerHTML == player || t[pos].innerHTML == computer);
}

function move(pos, c) {
	b[pos].innerHTML = c;
}

function moveIn(temp, pos, c) {
	temp[pos].innerHTML = c;
}

function isWinner(b, c) {
	return (b[1].innerHTML == c  && b[2].innerHTML == c && b[3].innerHTML == c ) || 
			(b[4].innerHTML == c && b[5].innerHTML == c && b[6].innerHTML == c) ||
			(b[7].innerHTML == c && b[8].innerHTML == c && b[9].innerHTML == c) ||
			(b[1].innerHTML == c && b[5].innerHTML == c && b[9].innerHTML == c) ||
			(b[3].innerHTML == c && b[5].innerHTML == c && b[7].innerHTML == c) ||
			(b[1].innerHTML == c && b[4].innerHTML == c && b[7].innerHTML == c) ||
			(b[2].innerHTML == c && b[5].innerHTML == c && b[8].innerHTML == c) ||
			(b[3].innerHTML == c && b[6].innerHTML == c && b[9].innerHTML == c);
}

function  cls(s) {
	$('#'+s).hide();
}

function showStatus(text, type = 'warning') {
	$('#text-'+type).text(text);
	$('#'+type).show();
}
