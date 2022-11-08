const { Bot, Message } = require('mirai-js');
const bot = new Bot();
const axios = require('axios')

let classMates = ['钱银', '温国庆', '王秋松', '刘文杰', '蒲鹏鑫', '赵川东', '曾小犊', '杨宇', '李梓铭', '杨洲华', '符向豪', '李伟', '邹涛', '叶林斌', '梁宏', '杨承熹', '方鹏', '潘思哲', '李明洋', '罗仁杰', '邵文杰', '谢可', '崔傑瑜', '汪俊安', '肖洋', '李雅博',
    '蒋翰林',
    '陈飞宇',
    '黄智',
    '陈坤隆',
    '王豪轩',
    '高玉潭',
    '陈洋星',
    '付铄森',
    '陈俊达',
    '孙锐',
    '罗文良',
    '邓康鹏',
    '冉自豪',
    '蔡家骏',
    '彭慧中',
    '张鑫宇',
    '孙绢',
    '何冰',
    '伍心悦',
    '孙佳雨',
    '杜雨霞',
    '杨雅洁',
    '姚虹君',
    '陈林巧',
    '朱瑞媛',
    '翟望含',
    '黄苏梦',
    '全活松',
    '龙思雨',
    '张亮',
]
let loginInfo = {
    password: '666666',
    username: '软件工程2020级3班团支部'
}
let reqStage = axios.create({
    baseURL: 'http://dxx.scyol.com/backend/stages',
    timeout: 60000
});

let reqDxxPeople = axios.create({
    baseURL: 'http://dxx.scyol.com/backend/study/student',
    timeout: 60000
});
let login = axios.create({
    baseURL: 'http://dxx.scyol.com/backend/adminUser',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});



const reqUnDoPeople = function () {
    login({
        url: `/login`, method: 'post', data: loginInfo
    }).then((result) => {

        const userInfo = {
            pageNo: 1,
            pageSize: 500
        }
        let token = result.data.data.token

        reqStage({
            url: `/list`, method: 'post', data: userInfo, headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'token': `${token}`,
            }
        }).then((result) => {

            const userInfo = {
                name: "",
                orgId: 472431,
                pageNo: 1,
                pageSize: 100,
                stagesId: result.data.paginator.total,
                tel: ""
            }
            reqDxxPeople({
                url: `/list`, method: 'post', data: userInfo, headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'token': `${token}`,
                }
            }).then((result) => {
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
            })

        })
    })
}


const sendUndoPeople = async function (undo) {


    await bot.sendMessage({
        // 群号
        group: '309449161',
        // 是 http server 接口所需的原始格式，若提供则优先使用
        message: [
            { type: 'Plain', text: `@全体成员 未作青年大学习的名单为：${undo}。。！      请以上同学加紧时间做哦` }
        ],
    });
    console.log("青年大学校已发送")

}



const sendCourseList = async function () {
    console.log("课程表已发送")
    await bot.sendMessage({
        // 群号
        group: '1109825279',
        // 是 http server 接口所需的原始格式，若提供则优先使用
        message: [
            { type: 'Plain', text: '课程' },
            { type: 'Image', url: 'http://m.qpic.cn/psc?/V51QYEn34X1RJ92SjrrY0cjKjO0LNH76/ruAMsa53pVQWN7FLK88i5rN9bpwqnGaI0S6aWwR6Gn.u4ifG0JJFkA8SqDDA6xWMa99DvPDfnNmEJFEROx8b..Kn6u0qSQcIYMJ5PvYlsFI!/b&bo=egWAAlwHXAMBCdc!&rf=viewer_4' },
        ],
    });
    console.log("课程表已发送")
}


const handleGroupMessage = function () {

    bot.on('GroupMessage', async data => {
        console.log(111)
        if (data.messageChain[1].text == "课程" || data.messageChain[1].text == "课程表") {
            sendCourseList()
        }
    });
    bot.on('FriendMessage', async data => {
        console.log(222)
        if (data.sender.id == 1679124358 || data.sender.id == 1405169388) {
            if (data.messageChain[1].text == '青年大学习')
                reqUnDoPeople()
        }
    });
}
const Link = async function () {
    // 连接到一个 mirai-api-http 服务
    await bot.open({
        baseUrl: 'http://localhost:8080',
        verifyKey: "INITKEYpff86IGV",
        // 要绑定的 qq，须确保该用户已在 mirai-console 登录
        qq: 2118654642,
    });
    handleGroupMessage()
    console.log("mirai.js已启动")
}

Link()


