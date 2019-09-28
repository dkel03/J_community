<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
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
      color="green"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">중대숲</v-toolbar-title>
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
      color="green"
      app
    >
      <span class="white--text">&copy; 2019</span>
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
    items: [
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
        icon: 'face',
        title: '사용자관리',
        to: {
          path: '/user'
        }
      },
      {
        icon: 'description',
        title: '페이지관리',
        to: {
          path: '/page'
        }
      },
      {
        icon: 'info',
        title: '부대관리',
        to: {
          path: '/company'
        }
      }
    ]
  }),
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/')
    }
  }
}
</script>
