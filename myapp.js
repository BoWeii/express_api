const express = require('express')
const app = express()
const port = 3000
const pageNum = 3
app.use(express.json())
const orders = [
    {
        id: 1,
        uid: "YYY1",
        name: "威盛車行",
        area: "新北市",
        uniformNum: "12345678",
        owner: "余歐一",
        driverNum: 10,
        state: "normal"
    },
    {
        id: 2,
        uid: "YYY2",
        name: "盛車行",
        area: "新北市",
        uniformNum: "12345678",
        owner: "余歐一",
        driverNum: 11,
        state: "normal"
    },
    {
        id: 3,
        uid: "YYY3",
        name: "威車行",
        area: "台中市",
        uniformNum: "12345678",
        owner: "余歐一",
        driverNum: 1200,
        state: "normal"
    },
    {
        id: 4,
        uid: "YYY4",
        name: "威行",
        area: "台北市",
        uniformNum: "12345678",
        owner: "余歐一",
        driverNum: 9,
        state: "normal"
    },
    {
        id: 5,
        uid: "YYY5",
        name: "啊行",
        area: "台中市",
        uniformNum: "12345678",
        owner: "余歐一",
        driverNum: 19,
        state: "normal"
    },

];
app.get('/', (req, res) => {
    res.send('hello word')
})
app.get('/order/sum', (req, res) => {
    console.log(req.query.num)
    let resp = []
    for (let i = 0; i < req.query.num; i++) {
        resp.push(orders[i])
    }
    res.json(resp);
})//前幾筆

const url = require('url');
app.get('/order/query', (req, res) => {
    // console.log(req.query.area)
    let k = ""
    let v = ""
    for (i in req.query) {
        k = i
        v = req.query[i].replace(/['"]+/g, '')
    }
    // console.log(k, v)
    let resp = orders.filter(order => order[k] == v);
    // console.log(resp)
    res.json(resp);
})//query one of any key 

app.get('/order/page', (req, res) => {
    let num = (req.query.num) - 1
    let resp = []
    for (i = pageNum * num, times = 0; i < orders.length & times < pageNum; times += 1, i += 1) {
        // console.log("i=", i, " times=", times)
        resp.push(orders[i])
    }
    console.log(resp)
    if (resp.length == 0) {
        // console.log("yee")
        res.status(500).send('empty page!');
    }
    res.json(resp)
})//查頁數

app.post('/order/modify',(req,res)=>{
    let exist=false
    for(i=0;i<orders.length; i++){
        if (orders[i].id==req.body.id){
            exist=true
            orders[i]=req.body
            break
        }
    }
    if(!exist){
        orders.push(req.body)
    }
    // console.log(orders,"---------------")
    res.json(orders)
})//新增order 或修改order


app.post('/order/test',(req,res)=>{
    console.log(req.body)

    res.json(req.body)
    
})




app.listen(port, () => {
    console.log(`listen on port:${port}`)
})