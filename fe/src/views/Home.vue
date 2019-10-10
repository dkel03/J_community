<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <div v-if="company">
        <v-flex xs12 sm6 md4>
          <v-card min-width="344">
            <v-card-title>{{company.name}} 중대숲</v-card-title>
            <v-card-text>{{company.phoneNumber}}</v-card-text>
            <v-card-actions>
              <v-btn text>Click</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
      <div v-else>
        <v-flex xs12 sm6 md4>
          <v-card min-width="344">
            <v-card-title>중대숲</v-card-title>
            <v-card-text>로그인을 해주세요!!</v-card-text>
            <v-card-actions>
              <v-btn text>Click</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </v-layout>
    <v-btn absolute dark fab bottom right color="green darken-4" @click="mdUp">
     <v-icon>mail</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">마음의 편지</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="제목" v-model="form.title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="내용" v-model="form.context" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>마음의 편지는 익명으로 전달되나, 부적절한 내용작성 시에 유저정보를 조회할 수 있습니다.</small>
          <br>
          <small>또한 수정이 불가하니, 신중히 작성하시기 바랍니다.</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="postLetter">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialog: false,
      form: {
        title: '',
        context: ''
      },
      company: {}
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
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.form.title = ''
      this.form.context = ''
    },
    getCompany () {
      axios.get('resources/companys/one')
        .then((r) => {
          console.log(r)
          this.company = r.data.d
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    postLetter () {
      this.dialog = false
      axios.post('resources/letters', this.form)
        .then((r) => {
          this.$store.commit('pop', { msg: '마음의 편지 작성완료', color: 'success' })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
