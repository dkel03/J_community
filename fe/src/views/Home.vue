<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-if="company">
        <v-card min-width="344">
          <v-card-title>{{company.name}} 중대숲</v-card-title>
          <v-card-text>{{company.phoneNumber}}</v-card-text>
          <v-card-actions>
            <v-btn text>Click</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 v-else>
        <v-card min-width="344">
          <v-card-title>중대숲</v-card-title>
          <v-card-text>로그인을 해주세요!!</v-card-text>
          <v-card-actions>
            <v-btn text>Click</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 건의사항
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="sug in suggestions" :key = "sug._id">
        <v-card min-width="344">
          <v-card-title>{{sug.title}}</v-card-title>
          <v-card-text>{{sug.user}}</v-card-text>
          <v-card-actions>
            <v-btn text>Click</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout> -->
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      company: {},
      user: {}
    }
  },
  mounted () {
    this.getCompany()
  },
  watch: {
    '$store.state.token': {
      handler () {
        this.getCompany() // 전역 토큰변수를 감시하여 로그아웃 시에 다시 getCompany요청 보내기
      }
    }
  },
  methods: {
    getCompany () {
      axios.get('resources/company/home')
        .then((r) => {
          console.log(r)
          this.company = r.data.company
          this.user = r.data.user
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
