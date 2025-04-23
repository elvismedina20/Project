// Initialize player, opponent, and ball
let player = document.getElementById('player');
let opponent = document.getElementById('opponent');
let ball = document.getElementById('ball');

// Player and ball positions
let playerPos = { x: 50, y: 200 };
let opponentPos = { x: 300, y: 200 };
let ballPos = { x: 150, y: 200 };

// Ball velocity
let ballVelocity = { x: 2, y: 2 };
let distance = 4; // Player movement speed

// Initialize score
let score = [0, 0];

// States
let State = {
    WAITING: 0,
    FOLLOWING: 1,
    AIMING: 2
};
let currentState = State.FOLLOWING;

// Ball movement and collision handling
function updateBall() {
    ballPos.x += ballVelocity.x;
    ballPos.y += ballVelocity.y;

    if (ballPos.y <= 0 || ballPos.y >= window.innerHeight) {
        ballVelocity.y = -ballVelocity.y;
    }

    if (ballPos.x <= 0) {
        pause();
        $(document).trigger('ping:opponentScored');
    } else if (ballPos.x >= window.innerWidth) {
        pause();
        $(document).trigger('ping:playerScored');
    }

    ball.style.left = ballPos.x + 'px';
    ball.style.top = ballPos.y + 'px';
}

// Player and opponent movement
function movePlayer() {
    if (ballPos.y >= playerPos.y + 64) {
        playerPos.y += distance;
    } else {
        playerPos.y -= distance;
    }
    player.style.top = playerPos.y + 'px';
}

function moveOpponent() {
    if (ballPos.y > opponentPos.y) {
        opponentPos.y += 2;
    } else {
        opponentPos.y -= 2;
    }
    opponent.style.top = opponentPos.y + 'px';
}

// Update game state
function updateGame() {
    switch (currentState) {
        case State.FOLLOWING:
            movePlayer();
            moveOpponent();
            break;
        case State.AIMING:
            break;
        case State.WAITING:
            break;
    }

    updateBall();
    requestAnimationFrame(updateGame);
}

updateGame();

// Event listeners for scoring
$(document).on('ping:playerScored', function() {
    score[0]++;
    $('#playerScore').text(score[0]);
    ball.setOwner(opponent);
    ball.start();
});

$(document).on('ping:opponentScored', function() {
    score[1]++;
    $('#opponentScore').text(score[1]);
    ball.setOwner(player);
    ball.start();
});

// Game pause logic
function pause() {
    // Implement pause logic here
}

// Ball owner's functionality
ball.setOwner = function(owner) {
    this.owner = owner;
};

ball.start = function() {
    ballPos = { x: 150, y: 200 };
    ballVelocity = { x: 2, y: 2 };
};
