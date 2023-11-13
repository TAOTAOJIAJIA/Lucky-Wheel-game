let wapper = document.getElementById("wapper");
let textAll = document.getElementsByClassName("text");
let startGameBtn = document.getElementById("start-game");
let startRunBtn = document.getElementById("start-run");
let pauseRunBtn = document.getElementById("pause-run");
let speedUpBtn = document.getElementById("speed-up");
let reverseRunBtn = document.getElementById("reverse-run");
let circleBtn = document.getElementById("circle");
let speedMultiplier = 0.01; // 初始速度乘数
let user = document.getElementById("userInput");
let basic = 1800;
let text = "";
var randomIndex = 0;

// 这里是奖项的名字
let prize = ["1号大奖","2号大奖","3号大奖","4号大奖","5号大奖","6号大奖","7号大奖","未中奖"];
    
// 权重数组 不同奖项的权重值，权重越高越容易中这个区域
let prizeWeight = [1,3,5,7,10,15,20,30];
    
//  权重之和
// let weightSum = prizeWeight.reduce(function(prevValue,curVal){
//     return prevValue + curVal;
// });
//给每一个div赋予文字
for(let i = 0 ; i < textAll.length ; i++){
    textAll[i].innerHTML = prize[i];  
}

var isFlag = false;
var pauseRunBtnIsOk = false;
let timer = null;
var reverseRunBtnIsOk = false;
var speedUpBtnIsOk = false;

//开始的模态框
function showModal() {
    document.getElementById('customModal').style.display = 'block';
}

function hideModal() {
    if(user.value == "")
        alert("请输入您的姓名");
    else
        document.getElementById('customModal').style.display = 'none';
}

function handleInput() {
    if(user.value == "")
        alert("请输入您的姓名");
    else
        {
        console.log('User entered:', user);
        hideModal();
        }
    
}


//转动函数
function run(angle){
    let begin = 0; 
    
    pauseRunBtnIsOk = true;
    speedUpBtnIsOk = false;
    timer = setInterval(function(){
        if(begin >= (basic+angle)){
            if(randomIndex == 7){
                alert("很遗憾，您没有中奖");
            }
            else
                alert("恭喜您抽中"+text);
            speedMultiplier = 0.01;
            basic = 1800;
            isFlag=true;
            pauseRunBtnIsOk = false;
            speedUpBtnIsOk = false;
            reverseRunBtnIsOk = false;
            clearInterval(timer);
        }
        // console.log(begin);
        // console.log(-begin);
        if(!reverseRunBtnIsOk)
            wapper.style.transform="rotate("+(begin)+"deg)";
        else
            wapper.style.transform="rotate("+(-begin)+"deg)";
        // 这是一个算法 可以出现转盘由很快到慢慢变慢的效果
        begin+=Math.ceil((basic+angle-begin)*speedMultiplier);

    },70);

    

}

//选中一个幸运值  并启动   转动函数 
function getLucky(){

    let weightRandom = parseInt(Math.random()*30);

    // 合并
    let concatAfterArr = prizeWeight.concat(weightRandom);
    
    // 排序
    let  sortedWeightArr  = concatAfterArr.sort(function(a,b){ return a-b });

    // randomIndex是奖项的索引 结果是【1,7】
    randomIndex = sortedWeightArr.indexOf(weightRandom); 
    randomIndex = Math.min(randomIndex, prize.length -1); 

    // 获奖的内容
    text = prize[randomIndex];

    switch(randomIndex){
        case 0:
            run(22.5);
            break;
        case 1:
            run(66.5);
            break;
        case 2:
            run(112.5); 
            break;
        case 3:
            run(157.5);
            break;
        case 4:
            run(338.5);
            break;
        case 5:
            run(294.5);
            break;   
        case 6:
            run(247.5);
            break;
        case 7:
            run(201.5);
            break;    
    }
        
}

//抽奖按钮
circleBtn.onclick=function(){
    if(isFlag){
        isFlag=false;
        getLucky();
    }
};

// 开始按钮
startRunBtn.onclick=function(){
    if(isFlag){
        isFlag=false;
        getLucky();
    }
};

//开始游戏
var isStart = true;
startGameBtn.onclick=function(){
    if(isStart){
        isStart=false;
        isFlag=true;
        document.getElementById('customModal').style.display = 'block';
       
        
        //
        // let name = prompt("请输入您的名字：");
        // while(!name){
        //     name = prompt("请重新输入您的名字：");
        // }
        startGameBtn.style.backgroundColor = "dimgray";
        startRunBtn.style.backgroundColor = "#f2552e";
        pauseRunBtn.style.backgroundColor = "#f2552e";
        speedUpBtn.style.backgroundColor = "#f2552e";
        reverseRunBtn.style.backgroundColor = "#f2552e";
        //将“开始游戏”按钮的鼠标光标设置为“默认”,箭头形状,不可以点击
        startGameBtn.style.cursor = "default";
        //将“开始旋转 等”按钮的鼠标光标设置为“指向”,手形，表示可以点击
        startRunBtn.style.cursor = "pointer";
        pauseRunBtn.style.cursor = "pointer";
        speedUpBtn.style.cursor = "pointer";
        reverseRunBtn.style.cursor = "pointer"
        circleBtn.style.cursor = "pointer";
    }
        
};


//暂停按钮
pauseRunBtn.onclick=function(){
    if(pauseRunBtnIsOk){
        isFlag=true;
        pauseRunBtnIsOk = false;
        clearInterval(timer);
    }
    else{
        alert("当前状态下无法使用该功能！");
    }
}

//加速按钮
speedUpBtn.onclick = function(){
    speedUpBtnIsOk = true;
    if(isFlag && speedUpBtnIsOk){
        console.log("前"+speedMultiplier);
        speedMultiplier = 0.2;
        console.log("后"+speedMultiplier);
        isFlag=false;
        basic = basic*10;
        getLucky();
        console.log("后后"+speedMultiplier);
        }
    else
        alert("当前状态下无法使用该功能！");
}

//反向按钮
reverseRunBtn.onclick = function(){
    reverseRunBtnIsOk = true;
    if(isFlag){
        isFlag=false;
        getLucky();
    }
}

    


