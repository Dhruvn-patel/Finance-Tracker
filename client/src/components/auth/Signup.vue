<template>
  <v-card
    class="mx-auto mt-6 text-xs-center text-center text-h1"
    max-width="600"
    title=" Register"
  >
    <v-container>
      <v-form class="pt-6" @submit.prevent="submit" v-model="valid" ref="form">
        <!-- name  -->
        <v-text-field
          v-model.trim="name"
          class="me-10"
          label="Name"
          :rules="userRules.name"
        ></v-text-field>
        <!-- Email field -->
        <v-text-field
          v-model.trim="email"
          class="me-10"
          :rules="userRules.email"
          label="E-mail"
        ></v-text-field>

        <!-- Password field -->
        <v-text-field
          v-model.trim="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          :rules="userRules.password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn block class="mb-8" size="large" type="submit"> Register </v-btn>
        <router-link
          to="/login"
          class="v-btn v-btn--block v-btn--elevated v-theme--light v-btn--density-default v-btn--size-large v-btn--variant-elevated mb-8"
        >
          Already Login ?
        </router-link>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { addUser } from "../../service/user.service";
import { userValidate } from "../../helper/user/user.rules";
import { computed, inject, ref } from "vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "TheSignup",
  setup() {
    /* state */
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const form = ref("");
    const router = useRouter();
    /* rules computed */
    const userRules = computed(() => {
      return userValidate;
    });

    /* methods */
    async function submit() {
      const validate = await form.value.validate();
      if (validate.valid) {
        const data = {
          name: name.value,
          email: email.value,
          password: password.value,
        };
        const result = await addUser(data);

        console.log("result", result);
        // localStorage.setItem("token", JSON.stringify(result.Jwtoken));
        if (result.data.status === 402) {
          return Swal.fire({
            position: "top-center",
            icon: "warning",
            title: result.data.err,
            customClass: "swal-wide",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Signup Successsfully",
            customClass: "swal-wide",
            showConfirmButton: false,
            timer: 1000,
          });
        }

        return router.push("/login");
      }
    }

    return { name, email, password, showPassword, submit, userRules, form };
  },
};
</script>

<style></style>
