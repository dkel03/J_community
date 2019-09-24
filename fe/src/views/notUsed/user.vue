<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="sug in suggestions" :key="sug._id">
        <v-card max-width="344" class="mx-auto">
          <v-card-title>{{sug.title}}</v-card-title>
          <v-card-text><span>{{sug.createdAt}}</span></v-card-text>
          <v-card-text>{{sug.context}}</v-card-text>
          <v-card-actions>

          </v-card-actions>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
              <v-list-item-title>{{sug.user}}</v-list-item-title>
              </v-list-item-content>

              <v-btn flat color="orange" @click="putDialog(sug)">수정</v-btn>
              <v-btn flat color="error" @click="delUser(sug._id)">삭제</v-btn>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn absolute dark fab bottom right color="green darken-4" @click="mdUp">
    <v-icon>add</v-icon>
	</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">건의사항</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="title*" v-model="sug_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="context*" v-model="sug_context" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateMode ? putUser() : postUser()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-snackbar v-model="snackbar">
      {{ sbMsg }}
      <v-btn color="green darken-3" flat @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  
  </v-container>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      dialog: false,
      snackbar: false,
      sbMsg: '',
      suggestions: [],
      sug_title: '',
      sug_context: '',
      putId: '',
      updateMode: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    mdUp () {
      this.dialog =true
      this.updateMode=false
      this.sug_title = ''
      this.sug_context=''
    },

    pop (msg) {
	   this.snackbar = true,
	   this.sbMsg = msg
    },

    putDialog(sug) {
      this.putId = sug._id
      this.dialog = true
      this.sug_title = sug.title
      this.sug_context = sug.context
      this.updateMode = true
    },
	
	//API 관련 Methods
	getUsers() {
      axios.get('https://nemv-stack.run.goorm.io/api/suggestion')
      .then((r) => {
        this.suggestions = r.data.suggestions
      })
      .catch((e) => {
        console.error(e.message)
      })  //api에 get 요청
    },

    postUser() {
      var d= new Date();
      var ISOData = d.toISOString();
      var ISODate = ISOData.split("T",1); 
      console.log(this.sug_title, this.sug_context);
      this.dialog = false;
      //this.pop(this.sug_title);
      axios.post('https://nemv-stack.run.goorm.io/api/suggestion', {
        title: this.sug_title, context: this.sug_context, createdAt: ISODate.toString()
      })
      .then((r) => {
        // this.postMd = JSON.stringify(r.data)
        this.pop('건의사항 등록 완료')
        this.getUsers()
      })
      .catch((e) => {
        // console.error(e.message)
        this.pop(e.message)
      }) //api에 post 요청//api에 post 요청
    },

	putUser() {
      this.dialog=false
      this.updateMode=false
      axios.put(`https://nemv-stack.run.goorm.io/api/suggestion/${this.putId}`, {
        title: this.sug_title, context: this.sug_context
      })
      .then((r) => {
        this.pop('건의사항 수정 완료')
        this.getUsers()
      })
      .catch((e) => {
        this.pop(e.message)
      }) //api에 put 요청
    },

    delUser(id) {
      axios.delete(`https://nemv-stack.run.goorm.io/api/suggestion/${id}`)
      .then((r) => {
        this.pop('건의사항 삭제 완료')
        this.getUsers()
      })
      .catch((e) => {
        this.pop(e.message)
      })	//api에 delete 요청
    },
  }
}
	
</script>
