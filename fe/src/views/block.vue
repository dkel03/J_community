<template>
  <v-container>
    <v-alert type="error" :value="true">
      권한이 필요한 페이지 입니다. {{$route.params.msg}}
    </v-alert>
  </v-container>
</template>
