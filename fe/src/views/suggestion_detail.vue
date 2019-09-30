<template>
  <v-container grid-list-md text-xs-center>
    <v-card class="mx-auto" min-width="344">
      <v-card-title>
        <span class="title font-weight-bold">{{item.title}}</span>
        <div class="flex-grow-1"></div>
        <v-menu bottom left>
            <v-btn dark icon v-on="on">
              <v-icon v-html="more"></v-icon>
            </v-btn>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text class="font-weight-light">{{item.createdAt}}</v-card-text>

      <v-card-text class="font-weight-bold">
        {{item.context}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" src="../assets/army2.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.user}}</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-card-actions>
              <v-btn icon><v-icon v-html="like_icon" color="green darken-3"></v-icon></v-btn>
            </v-card-actions>
            <span class="subheading">{{item.likes}}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>

    <v-btn small class="float-right ma-2" tile outlined color="success" @click="dialog = true">
      <v-icon left>create</v-icon> Edit
    </v-btn>
    <v-btn small class="float-right ma-2" tile outlined color="error" @click="delSuggestion(suggestionId)">
      <v-icon left>clear</v-icon> Delete
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">건의사항 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="title*" v-model="suggestionTitle" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="context*" v-model="suggestionContext" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="putSuggestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const suggestionId = this.$route.params.suggestionId
    return {
      suggestionId: suggestionId,
      suggestionTitle: '',
      suggestionContext: '',
      item: {},
      like_icon: 'favorite',
      more: 'more-vert',
      dialog: false
    }
  },
  created () {
    this.getSuggestion(this.suggestionId)
  },
  methods: {
    getSuggestion (sugId) {
      axios.get('https://nemv-stack.run.goorm.io/api/suggestion')
        .then((r) => {
          this.item = r.data.suggestions.filter(el => el._id === sugId)[0]
          this.suggestionTitle = this.item.title
          this.suggestionContext = this.item.context
          console.log(JSON.stringify(this.item))
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    putSuggestion () {
      this.dialog = false
      axios.put(`suggestion/${this.suggestionId}`, {
        title: this.suggestionTitle, context: this.suggestionContext
      })
        .then((r) => {
          this.getSuggestion(this.suggestionId)
        })
        .catch((e) => {
          console.error(e.message)
        }) // api에 put 요청
    },

    delSuggestion (id) {
      axios.delete(`suggestion/${id}`)
        .then((r) => {
          this.$router.push({
            path: '/suggestion'
          })
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
