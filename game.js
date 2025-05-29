//遊戲設計
class Game{
    constructor(select,scoreEle,gameoverbg,leaderboard){
       
        //遊戲結束的畫面
        this.gameoverimg=document.querySelector(gameoverbg)
        //取得遊戲開始按鈕
        this.startbtn=document.querySelector("#start")
        //取得時間
        this.gametime = document.querySelector("#gametime")
        //地圖
        this.map=document.querySelector(select)
        //記分板
        this.scoreEle=document.querySelector(scoreEle)
        //食物
        this.food=new Food(select)
        //抓取食物音效
        this.eatbgm=document.getElementById("eatbgm")
        //抓取遊戲結束音效
        this.gameoverbgm=document.getElementById("gameoverbgm")
        //蛇
        this.snake=new Snake(select) 
        //定義計時器
        this.timer=0
        //更新時間
        this.timeTimer=null
        //得分
        this.count=0
        //讓速度隨著分數加快
        this.speed=400;
        //新增一個旗標
        this.isTimerStarted=false

        this.leaderboard = leaderboard;


    }
    //定義遊戲開始的方法
    start(){
        if(!this.isTimerStarted){
           this.startTimeCounter(); 
           this.isTimerStarted=true
        }
        
        //若遊戲結束不再開始
        if(this.isgameover) return;

        //清除舊的計時器
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer=setInterval(() => {
            //讓蛇動起來
            this.snake.move()
            //判斷是否吃到食物
            if(this.snake.isEat(this.food.x,this.food.y)){
                //吃到食物要變長,調用增加舌頭方法
                this.snake.createHead()
                //吃到食物位置要更新
                this.food.foodpos()
                //調用得分增加更新分數
                this.scorechange()
                //吃到食物有音效
                this.eatbgm.currentTime = 0
                eatbgm.play()
            }
            //判斷蛇是否死亡
            if(this.snake.isDie()){
                //停止遊戲循環
                clearInterval(this.timer)
                //調用遊戲結束
                this.gameover();
            }
        },this.speed);
    }

    startTimeCounter() {
        this.time = 0;
        //先清除它，避免重複啟動多個計時器。
        if (this.timeTimer) {
          clearInterval(this.timeTimer);
        }
        //啟動新的計時器
        this.timeTimer = setInterval(() => {
          this.time++;
          if (this.gametime) {
            this.gametime.innerText = `Game time：${this.time} S`;
          }
        }, 1000);
      }
    //暫停
    pause(){
        clearInterval(this.timer)
    }
    //重新開始
    restart(){
        //釋放開始按鈕
          this.startbtn.disabled=false
          window.location.reload()
          //尚未優化初始值,只能先靠頁面刷新重新整理
        //   clearInterval(this.timer)
        //   this.snake=new Snake();
        //   this.init()
    }
    //改變方向的方法
    change(type){
        this.snake.direction=type
    }
    //得分增加
    scorechange(){
    this.count++
    //更新記分板
    this.scoreEle.innerText=this.count 
    //每1分加快一次速度,最多50ms
    if(this.count % 1===0 && this.speed>50){
        this.speed-=30;
        }
        // console.log(`🚀 當前速度為 ${this.speed}ms`);
    //重新啟動套用新速度
    clearInterval(this.timer);
    this.start()
    }

    //遊戲結束
    gameover(){
        //顯示遊戲結束畫面
        this.gameoverimg.style.display="block"
        //遊戲結束禁用開始按鈕
        this.startbtn.disabled=true
        //停止背景音樂
        if(bgm&&!bgm.paused){
            bgm.pause()
            bgm.currentTime=0;
           gameoverbgm.play()
        }
        //標記遊戲結束,避免重新啟動
        this.isgameover=true

        //計時停止
        clearInterval(this.timeTimer)

        const name = prompt("請輸入你的名字：");
        if (name) {
            myLeaderboard.addScore(name,this.count);
            myLeaderboard.render("leaderboard");
        
            console.log(name, this.count);
    }

    
    }


}