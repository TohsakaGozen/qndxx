# qq机器人发送青年大学习未完成名单demo
###### 基于mirai框架，mirai-http-api，mirai.js，nodejs。
##### 使用说明：向qq机器人私聊发送指定命令-"青年大学习"，机器人则向指定班群里发送未完成名单。
##### 代码分为两个模块
1. 第一个是mirai.js的关于该功能的机器人逻辑判断模块，
2. 第二个是获取青年大学习未完成名单的模块。
    1. 该模块需要先安装引入axios-在终端键入`npm i axios`
    2. 引入axios后，则建立axios.post连接青年大学习的官方登录接口，需要发送账号密码的对象参数（账号和密码需向团支书获取）
    ```
    let login = axios.create({
        baseURL: 'http://dxx.scyol.com/backend/adminUser',
        timeout: 60000,
        headers: { 'Content-Type': 'application/json' }
    });
    login({
        url: `/login`, method: 'post', data: loginInfo
    })
    ```
    3. 该接口会返回token，将该token保存后，继续根据post请求（需要将token配置进头信息`headers`中）官方的list接口获取当前青年大学习的期数和其它数据。
    ```
    let reqStage = axios.create({
        baseURL: 'http://dxx.scyol.com/backend/stages',
        timeout: 60000
    });
    const userInfo = {
        pageNo: 1,
        pageSize: 500
    }
    let token = result.data.data.token//result是axios请求成功时得到的数据，为异步操作`Promise.then((result)=>{})`

    reqStage({
        url: `/list`, method: 'post', data: userInfo, headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': `${token}`,
        }
    ```
    4. 最后再根据获取到的期数，`orgId`，`page`等其他信息再post另一个list即可获取到已经完成了人的数据。
    ```
    let reqDxxPeople = axios.create({
        baseURL: 'http://dxx.scyol.com/backend/study/student',
        timeout: 60000
    });
    const userInfo = {
        name: "",
        orgId: 472431,
        pageNo: 1,
        pageSize: 100,
        stagesId: result.data.paginator.total,//result是axios请求成功时得到的数据，为异步操作`Promise.then((result)=>{})`
        tel: ""
    }
    reqDxxPeople({
        url: `/list`, method: 'post', data: userInfo, headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': `${token}`,
        }
    })

    ```
    5. 再将已完成的人员数据进行数据过滤只留下姓名元素。
    6. 最后再将本班全体名字与已完成名单进行数据比对即可筛选出未完成名单。
    ```
    let personInfo = result.data.data
    let personNames = []
    let undo = []
    personInfo.forEach(person => {
        personNames.push(person.name)
    });
    classMates.forEach(person => {
        if (personNames.indexOf(person) == -1) {
            undo.push(person)
        }
    })
    sendUndoPeople(undo)
    ```
    7. 完成