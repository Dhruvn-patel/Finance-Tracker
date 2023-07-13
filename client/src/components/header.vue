<template>
  <div>
    <v-toolbar app>
      <span class="d-flex d-sm-none">
        <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link :to="{name:'root'}" class="ma-5 pa-5">
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

    <v-content> </v-content>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "TheHeaders",
  setup() {
    const store = useStore();
    const router = useRouter();
    const appTitle = ref("Finance Tracker");
    const sidebar = ref(false);

    /* methods */
    const SignOutFunction = function () {
      store.dispatch("LogOutFunction");
      return router.push("/login");
    };

    const theme = useTheme();
    const darkMode = ref(false);
    const toggleTheme = () => {
      theme.global.name.value = darkMode.value ? "dark" : "light";
    };
    /* hooks */

    /* store */
    const isLogin = computed(() => {
      return store.getters.isLogin;
    });

    return {
      SignOutFunction,
      isLogin,
      toggleTheme,
      appTitle,
      darkMode,
      sidebar,
    };
  },
};
</script>

<style scoped></style>
