// UI

// init
var numArr = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384];
var startNumPos = 0;
var startNum = [];
for (var i = 0 ; i < 3 ; i++){
    startNum[i] = numArr[i + startNumPos];
}
var levelName = ["百姓","秀才","举人","解元","状元","芝麻官","县令","知府","太中大夫","翰林学士","翰林大学士","御史大夫","太尉","封疆大吏","丞相"];
var level = 0,maxLevel = 0;
var name = levelName[level];
var maxScore = 0,score = 0;

var board = [];

var numCount = 0;


var noNewCount = 0;
var gameOver = false;
var win = false;


var lostAna = ["宦海沉浮，随缘皆可","心静自然成","从哪里倒下，就从哪里站起来","成功在于坚持","用户：我本将心向明月，奈何明月照沟渠~","再试试看","佛系~忍"];
var winAna = ["非淡泊无以明志，非宁静无以致远","再接再厉","加油！","恭喜你"];

$(function () {
    newGame();
});


function over() {
    var obj = $("#overGround");
    numCount = 0;
    gameOver = true;
    for (var i = 0 ; i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            if (board[i][j] !== 0){
                numCount++;
            }
        }
    }
    setTimeout(function () {
        if (numCount === 16){
            // for (var i = 0 ; i < 4 ; i++){
            //     for (var j = 0 ; j < 4 ; j++){
            //         for (var k = 1 ; k < 4; k++){
            //             if (move(i,j,i,j + k) === 0 && move(i,j,i,j - k) === 0 && move(i,j,i + k,j) === 0 && move(i,j,i - k,j) === 0){
            //                 gameOver = true;
            //             } else {
            //                 gameOver = false;
            //             }
            //         }
            //     }
            // }
            for (var i = 0 ; i < 3 ; i++){
                for (var j = 0 ; j < 3 ; j++){
                    if (board[i + 1][j] === board[i][j] || board[i][j + 1] === board[i][j]){
                        gameOver = false;
                    }
                }
            }
            if (gameOver === true){
                for (var i = 0 ; i < 3 ; i++){
                    if (board[i][3] === board[i + 1][3]){
                        gameOver = false;
                    }
                }
            }
            if (gameOver === true){
                for (var i = 0 ; i < 3 ; i++){
                    if (board[3][i] === board[3][i + 1]){
                        gameOver = false;
                    }
                }
            }
            if (gameOver === true){
                obj.html("你输了!<a class=\"button\" id=\"game\" onclick=\"newGame()\" title=\"点击重新开始\">重新参加科举考试</a><div id=\"ana\"></div>");
                $("#ana").html(lostAna[Math.floor(Math.random() * lostAna.length)]);
                obj.fadeIn(1000);
            } else {
                obj.hide();
            }
        }
        if (maxLevel === 14){
            win= true;
            obj.html("你赢了!<a class=\"button\" id=\"game\" onclick=\"newGame()\" title=\"点击开始\">参加科举考试</a><div id=\"ana\"></div>");
            $("#ana").html(winAna[Math.floor(Math.random() * winAna.length)]);
            obj.fadeIn(1000);
        }
    },200);
    // console.log(maxLevel);
}

function newGame() {
    var obj = $("#overGround");
    obj.hide(100);
    startNumPos = $("#value").val();
    level = 0;
    name = levelName[level];
    maxLevel = 0;
    score = 0;
    gameOver = false;
    win = false;
    // startNum = [];
    // for (var i = 0 ; i < 3 ; i++){
    //     startNum[i] = numArr[i + startNumPos];
    // }

    for (var i = 0 ; i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            $("#boxCell"+i+"-"+j).css({
                "top": i*120,
                "left": j*120
            });
            // console.log("row "+i, "top "+i*120, "col "+j, "left "+j*120);
        }
    }

    for (var i = 0 ; i < 4 ; i++){
        board[i] = [];
    }

    for (var i = 0 ; i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            board[i][j] = 0;
        }
    }
    for (var i = 0 ; i < 4 ; i++){
        randomBlock();
    }

    disLevel();
    // updateBoard();
    // console.log("new game is ready.");
}

function randomBlock() {
    var x = Math.floor(Math.random() * 4),y = Math.floor(Math.random() * 4),num = startNum[Math.floor(Math.random() * (startNum.length - 1))];
    if (board[x][y] === 0){
        newBlock(x,y,num);
    } else {
        randomBlock();
    }
}

function updateBoard() {
    for (var i = 0 ; i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            var dom = $("#boxCell"+i+"-"+j);
            // dom.hide();
            switch (board[i][j]){
                case 0:
                    dom.css({
                        "background-color" : "#fc0",
                        "color" : "#f00"
                    });
                    level = null;
                    break;
                case 1:
                    dom.css({
                        "background-color" : "#ff0",
                        "color" : "#f00"
                    });
                    level = 0;
                    break;
                case 2:
                    dom.css({
                        "background-color" : "#f92",
                        "color" : "#f00"
                    });
                    level = 1;
                    break;
                case 4:
                    dom.css({
                        "background-color" : "#f72",
                        "color" : "#f00"
                    });
                    level = 2;
                    break;
                case 8:
                    dom.css({
                        "background-color" : "#f52",
                        "color" : "#500"
                    });
                    level = 3;
                    break;
                case 16:
                    dom.css({
                        "background-color" : "#f32",
                        "color" : "#500"
                    });
                    level = 4;
                    break;
                case 32:
                    dom.css({
                        "background-color" : "#f12",
                        "color" : "#500"
                    });
                    level = 5;
                    break;

                case 64:
                    dom.css({
                        "background-color" : "#e02",
                        "color" : "#500"
                    });
                    level = 6;
                    break;

                case 128:
                    dom.css({
                        "background-color" : "#a02",
                        "color" : "#f00"
                    });
                    level = 7;
                    break;

                case 256:
                    dom.css({
                        "background-color" : "#802",
                        "color" : "#f00"
                    });
                    level = 8;
                    break;

                case 512:
                    dom.css({
                        "background-color" : "#602",
                        "color" : "#f00"
                    });
                    level = 9;
                    break;

                case 1024:
                    dom.css({
                        "background-color" : "#404",
                        "color" : "#f00"
                    });
                    level = 10;
                    break;

                case 2048:
                    dom.css({
                        "background-color" : "#306",
                        "color" : "#a0a"
                    });
                    level = 11;
                    break;

                case 4096:
                    dom.css({
                        "background-color" : "#308",
                        "color" : "#a0a"
                    });
                    level = 12;
                    break;

                case 8192:
                    dom.css({
                        "background-color" : "#30a",
                        "color" : "#a0a"
                    });
                    level = 13;
                    break;

                case 16384:
                    dom.css({
                        "background-color" : "#30d",
                        "color" : "#80d"
                    });
                    level = 14;
                    break;

            }
            if (level !== null){
                dom.html(levelName[level]);
            } else {
                dom.html(" ");
            }
            // dom.fadeIn(0.1);
        }
    }
}

function newBlock(x,y,num) {
    board[x][y] = num;
    updateBoard();
}

function deleteBlock(x,y) {
    board[x][y] = 0;
    updateBoard();
}

function move(x,y,newX,newY) {
    var num = board[x][y];
    if (newX >= 4 || newY >= 4 || newX < 0 || newY < 0){
        return 0;
    }
    var count = 0;
    for (var i = 0 ;  i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            if (board[i][j] !== 0){
                count++;
            }
        }
    }
    count = Math.ceil(16 / count);
    count = Math.floor(count / 5);

    if (board[newX][newY] === 0){
        deleteBlock(x,y);
        newBlock(newX,newY,num);

        for (var i = 0 ; i < count ; i++){
            randomBlock();
        }
        if (count <= 0){
            noNewCount++;
            if (noNewCount % 10 === 0){
                randomBlock();
            }
        }
        return 1;
    } else {
        if (board[newX][newY] === num){
            deleteBlock(x,y);
            newBlock(newX,newY,2 * num);

            score += 2 * num;
            if (maxScore < score){
                maxScore = score;
            }
            disLevel();
            randomBlock();
            return 1;
        } else {
            return 0;
        }
    }
}

function up() {
    for (var l = 0 ; l < 16 ; l++){
        for (var i = 0 ; i < 4 ; i++){
            for (var j = 0 ; j < 4 ; j++){
                if (board[i][j] !== 0){
                    for (var k = 1 ; k < 4 ; k++){
                        move(i,j,i,j + 1);
                    }
                }
            }
        }
    }
    over();
}
function down() {
    for (var l = 0 ; l < 16 ; l++){
        for (var i = 0 ; i < 4 ; i++){
            for (var j = 0 ; j < 4 ; j++){
                if (board[i][j] !== 0){
                    for (var k = 1 ; k < 4 ; k++){
                        move(i,j,i,j - 1);
                    }
                }
            }
        }
    }
    over();
}

function left() {
    for (var l = 0 ; l < 16 ; l++){
        for (var i = 0 ; i < 4 ; i++){
            for (var j = 0 ; j < 4 ; j++){
                if (board[i][j] !== 0){
                    for (var k = 1 ; k < 4 ; k++){
                        move(i,j,i - 1,j);
                    }
                }
            }
        }
    }
    over();
}

function right() {
    for (var l = 0 ; l < 16 ; l++){
        for (var i = 0 ; i < 4 ; i++){
            for (var j = 0 ; j < 4 ; j++){
                if (board[i][j] !== 0){
                    for (var k = 1 ; k < 4 ; k++){
                        move(i,j,i + 1,j);
                    }
                }
            }
        }
    }
    over();
}
