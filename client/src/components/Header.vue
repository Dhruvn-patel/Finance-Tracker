<template>
  <v-app>
    <v-toolbar app>
      <span class="d-flex d-sm-none">
        <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" class="ma-5 pa-5">
          <h1>
            {{ appTitle }}
          </h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-row class="d-flex pr-5" flat>
          <v-col cols="auto mt-1">
            <v-switch
              inset
              color="info"
              v-model="darkMode"
              @change="toggleTheme()"
              :label="`It's ${darkMode ? 'Dark' : 'Light'}!`"
            ></v-switch>
          </v-col>
        </v-row>

        <v-btn flat to="/transactions/create">Add Transaction </v-btn>
        <v-btn flat to="/">View Transaction </v-btn>
        <v-btn v-if="isLogin == false" flat to="/register">Sign Up </v-btn>

        <v-btn flat @click="SignOutFunction" v-if="isLogin == true"
          >Sign Out
        </v-btn>
        <v-btn flat to="/login" v-else>Sign In </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TheHeaders",
  data() {
    return {
      appTitle: "Finance Tracker",
      sidebar: false,
      menuItems: [
        { title: "Add Transaction", path: "/addTransaction" },
        { title: "View Transaction", path: "/" },
        { title: "Sign Up", path: "/register" },
        { title: "Sign In", path: "/login" },
      ],
    };
  },
  methods: {
    ...mapActions({
      LogOutFunction: "LogOutFunction",
      SignOutFunction() {
        this.$router.push("/login");
        this.LogOutFunction();
      },
    }),
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
    }),
  },
};
</script>
<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();
const darkMode = ref(false);
const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
};
</script>

<style scoped></style>
