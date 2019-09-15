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

              <v-btn color="orange">수정</v-btn>
              <v-btn color="error">삭제</v-btn>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
	<v-btn
        absolute
        dark
        fab
        bottom
        right
        color="green"
        @click="mdUp"
    >
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
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      dialog: false,
      suggestions: [],
      sug_title: '',
      sug_context: ''
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    mdUp () {
      this.dialog =true
    },
	getUsers() {
      axios.get('https://nemv-stack.run.goorm.io/api/user')
      .then((r) => {
        this.suggestions = r.data.suggestions
      })
      .catch((e) => {
        console.error(e.message)
      }) 
    },
  }
}
	
</script>
