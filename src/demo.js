import moment from 'moment'

export const servers = [{
  name: 'www01',
  status: 'success',
  icon: 'globe',
  description: 'Web server that runs our sites'
}, {
  name: 'sql01',
  status: 'danger',
  icon: 'database',
  description: 'mySQL server used for reporting'
}, {
  name: 'mongoDB01',
  status: 'info',
  icon: 'file-code-o',
  description: 'Main DB server'
}, {
  name: 'ldap01',
  status: 'success',
  icon: 'key',
  description: 'Authentication server'
}, {
  name: 'mgmt01',
  status: 'success',
  icon: 'home',
  description: 'Management server with all tools'
}, {
  name: 'bkup01',
  status: 'warning',
  icon: 'backward',
  description: 'Backup server'
}]

export const stats = [{
  header: '8390',
  text: 'Visitors'
}, {
  header: '30%',
  text: 'Referrals'
}, {
  header: '70%',
  text: 'Organic'
}]

export const timeline = [{
  icon: 'fa-envelope',
  color: 'blue',
  title: 'Write short novel',
  time: moment().endOf('day').fromNow(),
  body: 'Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...',
  buttons: [{
    type: 'primary',
    message: 'Read more'
  }]
},
{
  icon: 'fa-user',
  color: 'yellow',
  title: 'Sarah Young accepted your friend request',
  time: moment('20150620', 'MMM Do YY').fromNow()
},
{
  icon: 'fa-camera',
  color: 'purple',
  title: 'Watch a youTube video',
  time: moment('20130620', 'YYYYMMDD').fromNow(),
  body: '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allowfullscreen></iframe></div>'
}]
export const userList = [
  {
    id: 1,
    profile_image: 'http://placehold.it/69x69',
    name: '김진형',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 1,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170123', 'YYYYMMDD'),
    lastModDate: moment('20170515', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 2,
    profile_image: 'http://placehold.it/69x69',
    name: '김성겸',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: moment('20170517', 'YYYYMMDD')
  }, {
    id: 3,
    profile_image: 'http://placehold.it/69x69',
    name: '이강산',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 4,
    profile_image: 'http://placehold.it/69x69',
    name: '임채윤',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: moment('20170517', 'YYYYMMDD')
  }, {
    id: 5,
    profile_image: 'http://placehold.it/69x69',
    name: '김성엽',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 6,
    profile_image: 'http://placehold.it/69x69',
    name: '김일일',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 7,
    profile_image: 'http://placehold.it/69x69',
    name: '김일이',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 1,
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 8,
    profile_image: 'http://placehold.it/69x69',
    name: '김일삼',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 1,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 9,
    profile_image: 'http://placehold.it/69x69',
    name: '김일사',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 1,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }, {
    id: 10,
    profile_image: 'http://placehold.it/69x69',
    name: '김일오',
    email: 'haneu89@naver.com',
    phone: '010-6544-3818',
    gender: 0,
    introduce: '안녕하세요 위킨을 위한 \n 위킨에 의한 \n 위킨을 위한 사용자 입니다.',
    createDate: moment('20170125', 'YYYYMMDD'),
    lastModDate: moment('20170513', 'YYYYMMDD'),
    outDate: ''
  }
]
export const homeWekinRequest = [
  { hostName: '김진형', wekinName: '남양주 전동휠 강좌', status: 1 },
  { hostName: '김성겸', wekinName: '인천 사진 강좌', status: 1 },
  { hostName: '이강산', wekinName: '오산 프로그래밍 강좌', status: 2 },
  { hostName: '김진형', wekinName: '남양주 고프로 강좌', status: 2 },
  { hostName: '김성겸', wekinName: '인천 디자인 강좌', status: 2 },
  { hostName: '이강산', wekinName: '오산 좀비 강좌', status: 1 }
]

export const homeHostRequest = [
  { name: '김진형' },
  { name: '김성겸' },
  { name: '이강산' }
]

export const homeRefuneRequest = [
  { name: '김진형' },
  { name: '김성겸' },
  { name: '이강산' }
]

export const homeRecentlyDocument = [
  { name: '김진형', createDate: moment(), type: 1 },
  { name: '김진형', createDate: moment(), type: 2 },
  { name: '김성겸', createDate: moment(), type: 1 },
  { name: '이강산', createDate: moment(), type: 2 },
  { name: '김진형', createDate: moment(), type: 2 },
  { name: '김성겸', createDate: moment(), type: 1 },
  { name: '김성겸', createDate: moment(), type: 1 }
]
