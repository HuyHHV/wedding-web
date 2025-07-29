<template>
  <v-app-bar app color="white">
    <v-app-bar-nav-icon @click="onMenuClick"></v-app-bar-nav-icon>
    <v-toolbar-title>Đám cưới Huy và Hà</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Trang chủ</v-btn>
    <v-btn text to="/about">About</v-btn>
    <v-btn text to="/rsvp">RSVP</v-btn>
  </v-app-bar>
</template>

<script setup>
function onMenuClick() {
  // Handle menu click for mobile drawer if needed
}
</script>