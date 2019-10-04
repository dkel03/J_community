<template>
  <v-app :dark="siteDark" id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant.sync="mini"
      :dark="siteDark"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="./assets/army2.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>모범병사</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-subheader>Basic</v-subheader>
        <v-list-item v-for="(item, i) in items_basic" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-subheader>Manage</v-subheader>
        <v-list-item v-for="(item, i) in items_manage" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :dark="siteDark"
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="max"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">
        <v-icon left>{{siteIcon}}</v-icon>
        {{siteTitle}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.token" class="ma-2" @click="$router.push('/sign')" outlined tile color="dark">
        <v-icon left>input</v-icon> login
      </v-btn>
      <v-btn v-else class="ma-2" @click="signOut" tile outlined color="dark">
        <v-icon left>open_in_new</v-icon> logout
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      :dark = "siteDark"
      app
    >
      <span>{{siteCopyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    mini: false,
    siteIcon: '',
    siteTitle: '기다리는중',
    siteCopyright: '기다리는중',
    siteDark: false,
    items_basic: [
      {
        icon: 'home',
        title: '홈',
        to: {
          path: '/'
        }
      },
      {
        icon: 'chat',
        title: '건의사항',
        to: {
          path: '/suggestion'
        }
      },
      {
        icon: 'email',
        title: '마음의 편지함',
        to: {
          path: '/letter'
        }
      },
      {
        icon: 'my_location',
        title: 'GPS기반 3복귀 체계',
        to: {
          path: '/map'
        }
      }
    ],
    items_manage: [
      {
        icon: 'face',
        title: '사용자관리',
        to: {
          path: '/user'
        }
      },
      {
        icon: 'info',
        title: '부대관리',
        to: {
          path: '/company'
        }
      },
      {
        icon: 'bookmarks',
        title: '페이지관리',
        to: {
          path: '/page'
        }
      },
      {
        icon: 'description',
        title: '사이트관리',
        to: {
          path: '/site'
        }
      }
    ]
  }),
  mounted () {
    this.getSite()
  },
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/out')
      this.$router.push('/')
    },
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          console.log(r.data.d)
          this.siteIcon = r.data.d.icon
          this.siteTitle = r.data.d.title
          this.siteCopyright = r.data.d.copyright
          this.siteDark = r.data.d.dark
        })
        .catch(e => console.error(e.message))
    },
    max () {
      this.mini = false
      this.drawer = !(this.drawer)
    }
  }
}
</script>
