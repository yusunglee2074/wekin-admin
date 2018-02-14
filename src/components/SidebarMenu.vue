<template>
  <ul class="sidebar-menu">
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page">대시보드</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/home"><i class="fa fa-home"></i>
        <span class="page">메인 관리</span>
      </router-link>
    </li>
    <!--
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/ledger/wekin"><i class="fa fa-pie-chart"></i>
        <span class="page">위킨 매출통계</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/ledger/host"><i class="fa fa-line-chart"></i>
        <span class="page">메이커 매출관리</span>
      </router-link>
    </li>
    -->
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/approve"><i class="fa fa-calendar-check-o"></i>
        <span class="page">승인관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/wekin"><i class="fa fa-rocket"></i>
        <span class="page">위킨관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/host"><i class="fa fa-user-plus"></i>
        <span class="page">메이커 관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/user"><i class="fa fa-users"></i>
        <span class="page">회원관리</span>
      </router-link>
    </li>

    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>포인트</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/companypoint"><i class="fa fa-usd"></i>
            <span class="page">기업 포인트 관리</span>
          </router-link>
        </li>
        <li>
          <router-link to="/normalpoint"><i class="fa fa-usd"></i>
            <span class="page">일반 포인트 관리</span>
          </router-link>
        </li>
        <li>
          <router-link to="/activity-point"><i class="fa fa-usd"></i>
            <span class="page">엑티비티별 포인트 적립 관리</span>
          </router-link>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>모바일 전용</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/mobile/ad"><i class="fa fa-usd"></i>
            <span class="page">모바일 홈화면 광고</span>
          </router-link>
        </li>
        <li>
          <router-link to="/mobile/recommend"><i class="fa fa-usd"></i>
            <span class="page">모바일 홈화면 추천위킨 관리</span>
          </router-link>
        </li>
      </ul>
    </li>
    
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>Documentary 관리</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/doc"><i class="fa fa-commenting"></i>
        <span class="page">피드&후기관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/qna"><i class="fa fa-question-circle"></i>
        <span class="page">Q&A관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/notice"><i class="fa fa-bullhorn  "></i>
        <span class="page">공지사항관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/faq"><i class="fa fa-list-ul"></i>
        <span class="page">자주묻는질문</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/news"><i class="fa fa-list-ul"></i>
        <span class="page">뉴스</span>
      </router-link>
    </li>
      </ul>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/order"><i class="fa fa-exchange"></i>
        <span class="page">주문 관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/pay-back-to-maker"><i class="fa fa-exchange"></i>
        <span class="page">정산 관리</span>
      </router-link>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/naver"><i class="fa fa-commenting"></i>
        <span style="text-decoration: line-through;" class="page">상품관리(네이버쇼핑용 (개발중))</span>
      </router-link>
    </li>

    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span style="text-decoration: line-through;">메이커에게 문자/메일 전송</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/util/sms"><i class="fa fa-usd"></i>
            <span class="page">문자메세지 전송</span>
          </router-link>
        </li>
        <li>
          <router-link to="/util/email"><i class="fa fa-usd"></i>
            <span class="page">메일 전송</span>
          </router-link>
        </li>
      </ul>
    </li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/imageApi"><i class="fa fa-commenting"></i>
        <span class="page">한국 관광공사 사진 검색</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SidebarName',
  methods: {
    toggleMenu (event) {
      // remove active from li
      var active = document.querySelector('li.pageLink.active')

      if (active) {
        active.classList.remove('active')
      }
      // window.$('li.pageLink.active').removeClass('active')
      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    }
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
