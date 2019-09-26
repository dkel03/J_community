<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="green darken-3">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.pwd" label="비밀번호" type="password"></v-text-field>
            </v-form>
            <small class="ma-2">로그인을 반드시 해주세요</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="green darken-3" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar">
      {{ sbMsg }}
      <v-btn color="error" flat @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        id: '',
        pwd: ''
      },
      snackbar: false,
      sbMsg: ''
    }
  },
  methods: {
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    },
    signIn () {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then(r => {
          if (!r.data.success) {
            this.pop(r.data.msg)
            return console.error(r.data.msg)
          }
          localStorage.setItem('token', r.data.token) // 로컬 스토리지에 토큰 저장
          this.$store.commit('getToken')
          this.$router.push('/') // 페이지 이동
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>
