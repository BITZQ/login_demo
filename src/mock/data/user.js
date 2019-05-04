
/*
 * 用来存放一些模拟用户的数据
 * */

import Mock from 'mockjs'
const Users = []

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://www.casmooc.cn/uploadFile/userFile/473379966.jpg',
    name: '张大宝'
  },
  {
    id: 1,
    username: 'grankin',
    password: '123456',
    avatar: 'http://www.casmooc.cn/uploadFile/userFile/473379966.jpg',
    name: 'grankin'
  }
];

for (let i = 0; i < 86; i++) {
  //Mock.mock:根据数据模板生成模拟数据。
  Users.push(Mock.mock({
    //Mock.Random 是一个工具类，用于生成各种随机数据。
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    //'name|min-max': number,生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { Users,LoginUsers }
