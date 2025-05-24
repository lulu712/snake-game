class Food{
    constructor(select){
        this.map=document.querySelector(select)
        //創建食物
        this.food=document.createElement("div")
        //定義樣式
        this.food.className="food"
        //放到地圖中
        this.map.appendChild(this.food)
        //定義座標
        this.x=0
        this.y=0
        //調用生成食物的方法
        this.foodpos()
    }
    //隨機座標點
    foodpos(){
        //1.拿到地圖範圍
        // console.log(this.map.clientWidt/20)
        // console.log(this.map.clientHeight/20)

        const w_nub=this.map.clientWidth/20
        const h_nub=this.map.clientHeight/20
        //2.隨機生成數字
        let n1=Math.floor(Math.random()*w_nub)
        let n2=Math.floor(Math.random()*h_nub)
        // console.log(n1,n2)
        //3.根據隨機進行座標位置計算
        this.x=n1*20
        this.y=n2*20
        // console.log(this.x,this.y)

        //賦值
        this.food.style.left=this.x+"px"
        this.food.style.top=this.y+"px"
    }
}