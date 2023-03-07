const { segment } = require('koishi')
const axios = require('axios')
const url = 'http://m.qpic.cn/psc?/V51QYEn34X1RJ92SjrrY0cjKjO0LNH76/ruAMsa53pVQWN7FLK88i5ux8BEVluXkDoXEvYtCmLMTl1SzDdmv.oTI50M**lJMp4T2KHWkHRBlfH01wgcAzlKVnaTFdkb0lZdrF.9KksM4!/b&bo=OAQkAjgEJAIBByA!&rf=viewer_4'


function apply(ctx) {
    ctx.middleware((session, next) => {
        if (session.guildId === '1109825279' && session.elements[0].attrs.content == "课程" || session.elements[0].attrs.content == "课程表") {
            session.send(segment.image(url)).then(() => { session.send("课程表已发送") })
            console.log("课表已发送")
        }
        if ((session.userId === '1679124358' || session.userId === '1405169388' || session.userId === '2226724107') && session.elements[0].attrs.content == "课程") {
            session.send(segment.image(url)).then(() => { session.send("课程表已发送") })
            console.log("课表已发送")
        }
        if ((session.userId === '1679124358' || session.userId === '1405169388') && session.elements[0].attrs.content == "青年大学习") {
            reqUnDoPeople(session, 0)

        }
        if ((session.userId === '1679124358' || session.userId === '1405169388') && session.elements[0].attrs.content == "青年大学习1") {
            reqUnDoPeople(session, 1)

        }
        return next()
    })
}

module.exports = {
    name: 'plugin-my-plugin',
    apply
}

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
    baseURL: 'https://dxx.scyol.com/backend/stages',
    timeout: 60000
});

let reqDxxPeople = axios.create({
    baseURL: 'https://dxx.scyol.com/backend/study/student',
    timeout: 60000
});
let login = axios.create({
    baseURL: 'https://dxx.scyol.com/backend/adminUser',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});



const reqUnDoPeople = function (session, t) {
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
                if (t == 0) {
                    sendUndoPeople(undo, session)
                }
                else {
                    sendUndoPeople1(undo, session)
                }

            })

        })
    })
}


const sendUndoPeople = async function (undo, session) {
    text = `还未完成青年大学习的名单为：${undo}          ！      请以上同学加紧时间做哦~~`
    session.bot.internal.sendGroupMsg('309449161', text).then(() => { session.send("青年大学习信息已发送到班群").then(() => { console.log("青年大学习已发送") }) }, (err) => { session.send(`错误原因为：${err}，发送失败`) })

}

const sendUndoPeople1 = async function (undo, session) {
    text = `还未完成青年大学习的名单为：${undo}          ！      请监督以上同学加紧时间做哦~~`
    session.send(text).catch(err => { session.send(`错误原因为：${err}，发送失败`) })
}