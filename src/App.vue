<template>
  <v-app>
    <v-content>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/sign-in">Sign in</router-link>
      </div>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
