//遊戲設計
class Game{
    constructor(select){
        //地圖
        this.map=document.querySelector(select)
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
                //得分增加
            }
            //判斷蛇是否死亡
            if(this.snake.isDie()){
                //停止遊戲循環
                clearInterval(this.timer)
                alert("GAME OVER!")
            }
        }, 400);
    }
    //暫停
    pause(){
        clearInterval(this.timer)
    }
    //重新開始
    restart(){
        window.location.reload()
    }
    //改變方向的方法
    change(type){
        this.snake.direction=type
    }
}