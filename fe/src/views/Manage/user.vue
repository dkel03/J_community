<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.id}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text primary-text>
            <div>
              <div>이름: {{user.name}}</div>
              <div>군번: {{user.number}}</div>
              <div>부대: {{user.company}}</div>
              <div>권한: {{user.lv}}</div>
              <div>로그인 횟수: {{user.inCnt}}</div>
            </div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn flat color="orange" @click="putDialog(user)">수정</v-btn>
            <v-btn flat color="error" @click="delUser(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="이름"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="군번"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="userNumber"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="companys"
                  label="부대"
                  required
                  v-model="userCompany"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="userLvs"
                  label="권한"
                  required
                  v-model="userLv"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      companys: [],
      users: [],
      dialog: false,
      userLvs: [],
      userLv: 0,
      userName: '',
      userNumber: '',
      userCompany: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.getUsers()
    this.getCompanys()
  },
  methods: {
    getUsers () {
      this.$axios.get(`manage/user`)
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userNumber = user.number
      this.userCompany = user.company
      this.userLv = user.lv
    },
    putUser () {
      this.dialog = false
      this.$axios.put(`manage/user/${this.putId}`, {
        name: this.userName, number: this.userNumber, company: this.userCompany, lv: this.userLv
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '사용자 수정완료', color: 'success' })
          this.getUsers()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    delUser (id) {
      this.$axios.delete(`manage/user/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '사용자 삭제완료', color: 'success' })
          this.getUsers()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getCompanys () {
      this.$axios.get('resources/company/register')
        .then((r) => {
          this.companys = r.data.company.map(function (el) {
            return el.name
          })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
