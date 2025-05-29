class leaderboard{
    constructor(storagekey="leaderboard"){
        this.storagekey=storagekey;
        //從localstorage載排行資料，若沒有預設為空陣
        this.leaderboard = this.load() || []
    }
    //從localstorage讀取排行榜資料(json字串)並以js資料為陣列
    //若沒資料，回傳null
    load(){
        return JSON.parse(localStorage.getItem(this.storagekey))
    }
    //將目前的排行榜資料（JavaScript 陣列）轉成 JSON 字串後，儲存在 localStorage 中
    save(){
        localStorage.setItem(this.storagekey,JSON.stringify(this.leaderboard))
    }
    //新增一筆分數的函式，接受兩個參數：玩家名稱與分數。
    addScore(name,score){
        //玩家名稱與分數包成物件 {name, score} 並加入排行榜陣列
        this.leaderboard.push({name,score});
        //按分數高低排序
        this.leaderboard.sort((a,b)=> b.score-a.score)
        //保留前10筆資料
        this.leaderboard=this.leaderboard.slice(0,10);
        this.save()
    }
    //render() 方法，用來將排行榜渲染顯示在畫面上。參數是 HTML 元素的 id，預設為 "leaderboard"。
    render(containerId="leaderboard"){
        //取得指定 ID 的 HTML 元素，作為排行榜的容器。
        const boardElement=document.getElementById(containerId)
        //找不到對應的容器元素，就中斷顯示（避免錯誤）
        if(!boardElement)return;
        
        boardElement.innerHTML = `
        <h3>🏆Leaderboards</h3>
       <ol>
         ${this.leaderboard.map((entry, i) => 
      `<li>${i + 1}. ${entry.name} <span>${entry.score} 分</span></li>`
    ).join("")}
    </ol>
    `;
        console.log(this.leaderboard)
    
    }

}