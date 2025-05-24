//遊戲設計
class Game{
    constructor(select,scoreEle,gameoverbg){
       
        //遊戲結束的畫面
        this.gameoverimg=document.querySelector(gameoverbg)
        //取得遊戲開始按鈕
        this.startbtn=document.querySelector("#start")
        //地圖
        this.map=document.querySelector(select)
        //記分板
        this.scoreEle=document.querySelector(scoreEle)
        //食物
        this.food=new Food(select)
        //蛇
        this.snake=new Snake(select) 
        //定義計時器
        this.timer=0
        // this.start()
        //得分
        this.cunt=0
    }
    //定義遊戲開始的方法
    start(){
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
            }
            //判斷蛇是否死亡
            if(this.snake.isDie()){
                //停止遊戲循環
                clearInterval(this.timer)
                //調用遊戲結束
                this.gameover();
            }
        }, 100);
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
    }
    //改變方向的方法
    change(type){
        this.snake.direction=type
    }
    //得分增加
    scorechange(){
    this.cunt++
    //更新記分板
    this.scoreEle.innerText=this.cunt  
    }
    //遊戲結束
    gameover(){
        this.gameoverimg.style.display="block"
        //遊戲結束禁用開始按鈕
        this.startbtn.disabled=true
        this.isgameover=true
    }
}