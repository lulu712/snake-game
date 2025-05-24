class Snake{
    constructor(select){
        this.map=document.querySelector(select)
        //蛇運動方向
        this.direction="right"
        //蛇的數組(將頭和身體存儲在數組中，從數組第0位開始)
        this.snakelist=[]
            //調用創建蛇方法
            this.creatSnake()

    }
    //創建蛇頭的函數
    createHead(){
                //獲取數組中的第0位找到蛇頭
                const head=this.snakelist[0]
                //定義座標
                const pos={x:0,y:0}

                if(head){
                    //如果有蛇頭那麼就創建新的蛇頭放到原先蛇頭後面的座標位置上
                    //新蛇頭座標一定會發生改變，改變方向需要羅列一下
                    switch(this.direction){
                        case"left":
                            pos.x=head.offsetLeft-20
                            pos.y=head.offsetTop
                        break;
                        case"right":
                            pos.x=head.offsetLeft+20
                            pos.y=head.offsetTop
                        break;
                        case"top":
                            pos.x=head.offsetLeft
                            pos.y=head.offsetTop-20
                        break;
                        case"bottom":
                            pos.x=head.offsetLeft
                            pos.y=head.offsetTop+20
                        break;
                        default:
                        break;

                    }
                    //將原先的蛇頭變成身體
                    head.className="body"
                }
        //創建蛇頭
        const div=document.createElement("div")
        //定義樣式
        div.className="head"
        //把蛇頭存入數組
        this.snakelist.unshift(div)
        //給蛇頭定義座標
        div.style.left=pos.x+"px"
        div.style.top=pos.y+"px"
        // console.log(div)
        //放到地圖當中
        this.map.appendChild(div)


    }

        //創建一條蛇
        creatSnake(){
            for(let i=0; i<4; i++){
                this.createHead()
            }
        }

        //蛇移動的方法
        move(){
            //原先頭部座標後面增加一個蛇頭原本的蛇頭變成身體,身體末尾位置刪除一個
            //來實現視覺上的移動

            //從數組中移除掉
            const body=this.snakelist.pop()


            //從頁面刪除
            body.remove()
            //新增蛇頭
            this.createHead()
        }

        //判斷蛇有沒有吃到食物
        isEat(foodX,foodY){
            //判斷頭跟座標是否重合
            const head=this.snakelist[0]
            const headX=head.offsetLeft
            const headY=head.offsetTop
            if(foodX===headX && foodY===headY){
                return true
            }
            return false
        }

        //判斷蛇死沒死,是否撞牆
        isDie(){
         //判斷蛇頭有沒有到邊界
            const head=this.snakelist[0]
            const headX=head.offsetLeft
            const headY=head.offsetTop
            if(headX<0 || headY<0||headX>=this.map.clientWidth||headY>=this.map.clientHeight){
                return true
            }
            for (let i = 1; i < this.snakelist.length; i++) {
                const body = this.snakelist[i];
                if (
                    headX === body.offsetLeft &&
                    headY === body.offsetTop
                ) {
                    return true; // 蛇頭撞到身體
                }
            }
            return false
        }
           

}