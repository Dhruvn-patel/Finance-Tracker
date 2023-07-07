<template>
  <!-- <v-card class="mx-auto mt-6 text-xs-center text-center" max-width="344" title=" Register">
    <v-container>
      <v-text-field
        v-model="Name"
        color="primary"
        label="Name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
        Register
      </v-btn>
    </v-card-actions>
  </v-card> -->

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
          :rules="rules.name"
        ></v-text-field>
        <!-- Email field -->
        <v-text-field
          v-model.trim="email"
          class="me-10"
          :rules="rules.email"
          label="E-mail"
        ></v-text-field>

        <!-- Password field -->
        <v-text-field
          v-model.trim="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          :rules="rules.password"
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
import { addUser } from "../service/user.service";
import { userValidate } from "../helper/user/user.rules";
export default {
  name: "TheSignup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      rules: userValidate,
      showPassword: false,
    };
  },
  methods: {
    async submit() {
      const validate = await this.$refs.form.validate();
      if (validate.valid) {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        const result = await addUser(data);

        this.$swal({
          position: "top-center",
          icon: "success",
          title: "Signup Successsfully",
          customClass: "swal-wide",
          showConfirmButton: false,
          timer: 1000,
        });

        return this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
