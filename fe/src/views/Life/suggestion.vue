<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg12>
        <v-card>
          <v-card-title>
            {{company.name}}
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="articles"
            :search="search"
            :loading="loading"
            :sort-by="['_id']"
            :sort-desc="[true]"
            class="elevation-1"
          >
            <template v-slot:item.title="{ item }">
              <div @click="rowClick(item)">{{ item.title }}</div>
            </template>
            <template v-slot:item._id="{ item }">
              <v-chip>{{ id2date(item._id) }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>

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
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'suggestion',
  data () {
    return {
      header: '전체 건의사항',
      like_icon: 'favorite',
      dialog: false,
      company: {
        name: '비로그인'
      },
      sug_title: '',
      sug_context: '',
      updateMode: false,
      search: '',
      articles: [],
      headers: [
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: '_user.name', width: 150, sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true, width: 100 },
        { text: '추천', value: 'cnt.like', sortable: true, width: 100 },
        { text: '날짜', value: '_id', sortable: true, width: 300, class: 'hidden-sm-and-down' }
      ],
      loading: false
    }
  },
  created () {
    this.getCompany()
    this.getSuggestions()
  },
  methods: {
    rowClick (item) {
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
    getCompany () {
      this.$axios.get('resources/companys/one')
        .then((r) => {
          this.company = r.data.d
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getSuggestions () {
      if (this.loading) return
      this.loading = true
      axios.get('resources/suggestions/list')
        .then(({ data }) => {
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
          this.loading = false
        })
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    },
    postSuggestion () {
      this.dialog = false
      axios.post('resources/suggestions', { title: this.sug_title, context: this.sug_context })
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
