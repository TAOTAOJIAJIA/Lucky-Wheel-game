let wapper = document.querySelector(".wapper");

    let textAll = document.querySelectorAll(".wapper .text");

    // 这里是奖项的名字
    let prize = ["1号大奖","2号大奖","3号大奖","4号大奖","5号大奖","6号大奖","7号大奖","未中奖"];
    
    // 权重数组 不同奖项的权重值，权重越高越容易中这个区域
    let prizeWeight = [1,3,5,7,10,15,20,30];
    
    //  权重之和
    let weightSum = prizeWeight.reduce(function(prevValue,curVal){
        return prevValue + curVal;
    });

    //给每一个div赋予文字
    for(let i = 0 ; i < textAll.length ; i++){
            textAll[i].innerHTML = prize[i];  
    }

    var isFlag = true;

    function getLucky(){
            
        // 生成权重随机数 生成数的范围是【1,30】
        // 这里需要注意的是，这个30要和最上面的prizeWeight的最后一个值对应
        let weightRandom = parseInt(Math.random()*30);
        // 合并
        let concatAfterArr = prizeWeight.concat(weightRandom);
    
        // 排序
        let  sortedWeightArr  = concatAfterArr.sort(function(a,b){ return a-b });

        // randomIndex是奖项的索引 结果是【1,7】
        var randomIndex = sortedWeightArr.indexOf(weightRandom); 
        randomIndex = Math.min(randomIndex, prize.length -1); 

            // 获奖的内容
            let text = prize[randomIndex];
            console.log("text:"+text);
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

    document.querySelector(".circle").onclick=function(){
        if(isFlag){
            isFlag=false;
            getLucky();
        }
    };

    document.querySelector(".start").onclick=function(){
        if(isFlag){
            isFlag=false;
            getLucky();
        }
    };

    function run(angle){
        let begin = 0; 
        let timer = null;
        let basic = 1800;
        timer = setInterval(function(){
            if(begin > (basic+angle)){
                isFlag = true;
                clearInterval(timer);
            }
            wapper.style.transform="rotate("+(begin)+"deg)";
            // 这是一个算法 可以出现转盘又很快到慢慢变慢的效果
            begin+=Math.ceil(basic+angle-begin)*0.1;
        },70);
    }

