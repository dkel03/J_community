<template>
  <div>
    <v-list three-line>
      <v-subheader>{{header}}</v-subheader>
      <flex v-for="(item, index) in items" :key="item._id">
        <v-divider></v-divider>

        <v-list-item key="item.title" @click="rowClick(item, index)">
          <v-list-item-avatar>
            <v-img :src="require('../../assets/army2.png')"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.user"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-chip class="ma-2" color="green darken-3" text-color="white">
              <v-icon left v-html="like_icon" color="gray"></v-icon>
              {{item.likes}}
            </v-chip>
          </v-list-item-icon>
        </v-list-item>
      </flex>
    </v-list>

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
          <v-btn color="blue darken-1" text @click="postSuggestion">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'suggestion',
  data () {
    return {
      header: '전체 건의사항',
      like_icon: 'favorite',
      items: [],
      dialog: false,
      sug_title: '',
      sug_context: '',
      updateMode: false
    }
  },
  created () {
    this.getSuggestions()
  },
  methods: {
    rowClick (item, index) {
      this.$router.push({
        path: `/suggestion/detail/${item._id}`
      })
    },
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.sug_title = ''
      this.sug_context = ''
    },
    getSuggestions () {
      axios.get('resources/suggestion')
        .then((r) => {
          this.items = r.data.suggestions.sort((a, b) => { return b.createdAt - a.createdAt })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    postSuggestion () {
      var d = new Date()
      var ISOData = d.toISOString()
      var ISODate = ISOData.split('T', 1)
      this.dialog = false
      axios.post('resources/suggestion', { title: this.sug_title, context: this.sug_context, createdAt: ISODate.toString() })
        .then((r) => {
          this.$store.commit('pop', { msg: '건의사항 등록완료', color: 'success' })
          this.getSuggestions()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
