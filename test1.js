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
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 110.0.0.0 Safari / 537.36 Edg / 110.0.1587.57'
    }
});



const reqUnDoPeople = function () {
    login({
        url: `/login`, method: 'post', data: loginInfo
    }).then((result) => {
        console.log(result)
        // const userInfo = {
        //     pageNo: 1,
        //     pageSize: 500
        // }
        // let token = result.data.data.token

        // reqStage({
        //     url: `/list`, method: 'post', data: userInfo, headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         'token': `${token}`,
        //     }
        // }).then((result) => {

        //     const userInfo = {
        //         name: "",
        //         orgId: 472431,
        //         pageNo: 1,
        //         pageSize: 100,
        //         stagesId: result.data.paginator.total,
        //         tel: ""
        //     }
        //     reqDxxPeople({
        //         url: `/list`, method: 'post', data: userInfo, headers: {
        //             'Content-Type': 'application/json;charset=UTF-8',
        //             'token': `${token}`,
        //         }
        //     }).then((result) => {
        //         let personInfo = result.data.data
        //         let personNames = []
        //         let undo = []
        //         personInfo.forEach(person => {
        //             personNames.push(person.name)
        //         });
        //         classMates.forEach(person => {
        //             if (personNames.indexOf(person) == -1) {
        //                 undo.push(person)
        //             }
        //         })
        //         // sendUndoPeople(undo)
        //         console.log(undo)
        //     })

        // })
    })
}

reqUnDoPeople()
