<template>
  <header class="l-header-container">
    <v-layout row wrap>
      <v-flex xs12 md5>
        <v-text-field v-model="search"
                      label="Search"
                      append-icon="search"
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-flex xs12 offset-md6 md1>
        <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
      </v-flex>
    </v-layout>
  </header>
</template>

<script src="./header">
</script>

<style lang="scss">
@import "./header";
</style>
