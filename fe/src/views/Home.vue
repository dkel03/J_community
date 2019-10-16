<template>
  <v-container dark fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row  v-if="company">
      <v-flex xs12 class="pb-2">
        <v-card
          class="mx-auto"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{company.name}}</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div>{{company.phoneNumber}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="최근 건의사항"
          number="10"
          tIcon="list"
          tIconColor="success"
          bIcon="update"
          bIconColor="primary"
          bText="3시간 전"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 중대원"
          number="98"
          tIcon="person"
          tIconColor="primary"
          bIcon="group"
          bIconColor="success"
          bText="2명 접속중"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 조회수"
          number="431"
          tIcon="visibility"
          tIconColor="info"
          bIcon="trending_down"
          bIconColor="error"
          bText="43 감소"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 게시물"
          number="334234"
          tIcon="view_module"
          tIconColor="warning"
          bIcon="trending_up"
          bIconColor="success"
          bText="256 증가"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 게시물 현황"
          :data="[4, 7, 9, 5, 6, 4, 5]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        ></trend-card>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 사용자 현황"
          :data="[3, 1, 2, 1, 0, 4, 2]"
          :gradient="['red', 'orange', 'yellow']"
        ></trend-card>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 조회수 현황"
          :data="[33, 22, 2, 43, 33, 1, 55]"
          :gradient="['blue', 'green', 'sky']"
        ></trend-card>
      </v-flex>

      <v-flex xs12 sm6 class="pb-2">
        <board-card
          title="공지사항"
          tBarLeftIcon="notifications"
          tBarColor="success"
          tBarRightIcon="more_horiz"
        ></board-card>
      </v-flex>
      <v-flex xs12 sm6 class="pb-2">
        <board-card
          title="건의사항"
          tBarLeftIcon="chat"
          tBarColor="success"
          tBarRightIcon="more_horiz"
        ></board-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="pb-2">
        <v-card
          class="mx-auto"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>비로그인</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div>로그인해주세요!!</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import smallCard from '@/components/dashboard/smallCard'
import trendCard from '@/components/dashboard/trendCard'
import boardCard from '@/components/dashboard/boardCard'
import axios from 'axios'
export default {
  components: {
    smallCard,
    trendCard,
    boardCard
  },
  data () {
    return {
      company: {}
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    getCompany () {
      this.$axios.get('resources/companys/one')
        .then((r) => {
          console.log(r)
          this.company = r.data.d
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
  }
}
</script>
