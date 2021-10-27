// DOM
const playground = document.querySelector('.playground > ul');

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    tree: [
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ]
}

const movingItem = {
    type: 'tree',
    direction: 1,
    top: 0,
    left: 0,
};

init();

// Functions
function init() {
    tempMovingItem = {...movingItem}; // spread로 안의 내용만 가져온다.
    for(let i=0; i<GAME_ROWS; i++){
        prependNewLine();
    }
    renderBlocks();
}

function prependNewLine(){
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for(let j=0; j<GAME_COLS; j++){
        const matrix = document.createElement('li');
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks() {
    const { type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type,'moving');
    })
    BLOCKS[type][direction].forEach(block=>{
        const x = block[0] + left;
        const y = block[1] + top;
        // const xxx = 조건 ? 참일경우 : 거짓일경우 ----> 삼항연산자
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if(isAvailable) {
            target.classList.add(type, 'moving');
        } else {
            tempMovingItem ={ ...movingItem};
            setTimeout(() => {
                renderBlocks();
                if(moveType === 'top') {
                    seizeBlock();
                }
            },0);  // 콜스택이 가득 차는 것을 막기 위해 이벤트 루프 밖으로 빼내준다. setTimeout 사용.
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction; 
}

function seizeBlock() {

}

function checkEmpty(target) {
    if(!target) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount
    renderBlocks();
}

function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}

// Event Handling
document.addEventListener('keydown', e => {
    switch(e.keyCode){
        case 39:
            moveBlock('left', 1);
            break;
        case 37:
            moveBlock('left', -1);
            break;
        case 40:
            moveBlock('top', 1);
            break;
        case 38:
            changeDirection();
            break;
        default:
            break;
    }
    console.log(e);
})