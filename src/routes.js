import DashView from './components/Dash.vue'
import TmDashView from './components/TmDash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'

import UserList from './components/users/UserList.vue'
import UserDetail from './components/users/UserDetail.vue'

import NoticeAdd from './components/board/NoticeAdd.vue'
import NoticeList from './components/board/NoticeList.vue'
import NoticeEdit from './components/board/NoticeEdit.vue'
import FaqAdd from './components/board/FaqAdd.vue'
import FaqList from './components/board/FaqList.vue'
import FaqEdit from './components/board/FaqEdit.vue'

import DocList from './components/doc/DocList.vue'
import QnaList from './components/doc/QnaList.vue'

import WekinList from './components/wekin/WekinList.vue'
import WekinDetail from './components/wekin/WekinDetail.vue'
import WekinOrder from './components/wekin/WekinOrder.vue'
import WekinFinish from './components/wekin/WekinFinish.vue'
import WekinFinishDetail from './components/wekin/WekinFinishDetail.vue'

import Approve from './components/approve/Approve.vue'

import HostDetail from './components/host/HostDetail.vue'
import HostDetailTm from './components/host/HostDetailTm.vue'
import HostList from './components/host/HostList.vue'
import HostListTm from './components/host/HostListTm.vue'

import OrderList from './components/order/OrderList.vue'
import OrderDetail from './components/order/OrderDetail.vue'

import ActivityList from './components/activity/ActivityList.vue'
import ActivityDetail from './components/activity/ActivityDetail.vue'

import WekinLedger from './components/ledger/WekinLedger.vue'
import HostLedger from './components/ledger/HostLedger.vue'
import RefundLedger from './components/ledger/RefundLedger.vue'

import Home from './components/views/Home.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/tm',
    component: TmDashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: HostList,
        name: 'HostList',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'hosttm',
        component: HostListTm,
        name: 'HostListTm',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'hosttm/:key',
        component: HostDetailTm,
        name: 'HostDetail',
        meta: {description: 'Approve'}
      }
    ]
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'user',
        component: UserList,
        name: 'UserList',
        meta: {description: '회원 리스트'}
      }, {
        path: 'user/:key',
        component: UserDetail,
        name: 'UserDetail',
        meta: {description: '사용자 정보'}
      }, {
        path: 'home',
        component: Home,
        name: 'Home',
        meta: {description: '홈 화면 관리'}
      }, {
        path: 'notice',
        component: NoticeList,
        name: 'NoticeList',
        meta: {description: '공지사항 관리'}
      }, {
        path: 'faq',
        component: FaqList,
        name: 'FaqList',
        meta: {description: '자주묻는질문 관리'}
      }, {
        path: 'wekin',
        component: WekinList,
        name: 'WekinList',
        meta: {description: '위킨 관리'}
      }, {
        path: 'wekin/finish',
        component: WekinFinish,
        name: 'WekinFinish',
        meta: {description: '위킨 관리'}
      }, {
        path: 'wekin/finish/:key',
        component: WekinFinishDetail,
        name: 'WekinFinishDetail',
        meta: {description: '위킨 관리'}
      }, {
        path: 'wekin/:key',
        component: WekinDetail,
        name: 'WekinDetail',
        meta: {description: '위킨 관리'}
      }, {
        path: 'wekin/order/:key',
        component: WekinOrder,
        name: 'WekinOrder',
        meta: {description: '위킨 관리'}
      }, {
        path: 'activity',
        component: ActivityList,
        name: 'ActivityList',
        meta: {description: '액티비티 관리'}
      }, {
        path: 'activity/:key',
        component: ActivityDetail,
        name: 'ActivityDetail',
        meta: {description: '액티비티 디테일'}
      }, {
        path: 'faq/add',
        component: FaqAdd,
        name: 'FaqAdd',
        meta: {description: 'FAQ 추가'}
      }, {
        path: 'notice/add',
        component: NoticeAdd,
        name: 'NoticeAdd',
        meta: {description: '공지사항 추가'}
      }, {
        path: 'faq/:id',
        component: FaqEdit,
        name: 'FaqEdit',
        meta: {description: '공지사항 추가'}
      }, {
        path: 'notice/:id',
        component: NoticeEdit,
        name: 'NoticeEdit',
        meta: {description: '공지사항 추가'}
      }, {
        path: 'doc',
        component: DocList,
        name: 'DocList',
        meta: {description: '피드, 후기'}
      }, {
        path: 'qna',
        component: QnaList,
        name: 'QnaList',
        meta: {description: '질문'}
      }, {
        path: 'approve',
        component: Approve,
        name: 'Approve',
        meta: {description: 'Approve'}
      }, {
        path: 'host',
        component: HostList,
        name: 'HostList',
        meta: {description: 'Approve'}
      }, {
        path: 'host/:key',
        component: HostDetail,
        name: 'HostDetail',
        meta: {description: 'Approve'}
      }, {
        path: 'order/:key',
        component: OrderDetail,
        name: 'OrderDetail',
        meta: {description: 'Approve'}
      }, {
        path: 'order',
        component: OrderList,
        name: 'OrderList',
        meta: {description: 'Approve'}
      }, {
        path: 'ledger/wekin',
        component: WekinLedger,
        name: 'WekinLedger',
        meta: {description: 'WekinLedger'}
      }, {
        path: 'ledger/host',
        component: HostLedger,
        name: 'HostLedger',
        meta: {description: 'HostLedger'}
      }, {
        path: 'ledger/refund',
        component: RefundLedger,
        name: 'RefundLedger',
        meta: {description: 'RefundLedger'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
