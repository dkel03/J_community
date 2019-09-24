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
      <v-menu left top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push('/')">
            <v-list-tile-title>홈으로</v-list-tile-title>
          </v-list-item>
          <v-list-item @click="$router.push('/sign')">
            <v-list-tile-title>로그인</v-list-tile-title>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-tile-title>로그아웃</v-list-tile-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        icon: 'face',
        title: '사용자관리',
        to: {
          path: '/user'
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
          path: '/aa'
        }
      },
      {
        icon: 'gps_fixed',
        title: 'GPS기반 복귀체계',
        to: {
          path: '/#'
        }
      }
    ]
  })
}
</script>
