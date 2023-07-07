<template>
  <v-card
    class="mx-auto mt-6 text-xs-center text-center text-h1"
    max-width="600"
    title=" Login"
  >
    <v-container>
      <v-form class="pt-6" v-model="valid" @submit.prevent="submit" ref="form">
        <v-text-field
          v-model.trim="email"
          class="me-10"
          label="E-mail"
          :rules="rules.email"
        ></v-text-field>

        <v-text-field
          v-model.trim="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
          :rules="rules.password"
        ></v-text-field>

        <v-divider></v-divider>
        <v-spacer></v-spacer>

        <v-btn block class="mb-8" size="large" type="submit"> Login </v-btn>

        <router-link
          to="/register"
          class="v-btn v-btn--block v-btn--elevated v-theme--light v-btn--density-default v-btn--size-large v-btn--variant-elevated mb-8"
        >
          Create new Account
        </router-link>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import { userValidate } from "../helper/user/user.rules";
import { loginUser } from "../service/user.service";
export default {
  name: "TheSignin",
  data() {
    return {
      email: "",
      password: "",
      rules: userValidate,
      showPassword: false,
    };
  },
  methods: {
    ...mapActions({
      ToogleFunction: "ToogleFunction",
    }),
    async submit() {
      const validate = await this.$refs.form.validate();
      if (validate.valid) {
        const data = {
          email: this.email,
          password: this.password,
        };
        try {
          const result = await loginUser(data);

          if (result.data.status === 404) {
            return this.$swal({
              position: "top-center",
              icon: "warning",
              title: result.data.err,
              customClass: "swal-wide",
              showConfirmButton: false,
              timer: 1000,
            });
          } else if (result.data.status === 402) {
            return this.$swal({
              position: "top-center",
              icon: "warning",
              title: result.data.err,
              customClass: "swal-wide",
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            this.$swal({
              position: "top-center",
              icon: "success",
              title: result.data.err,
              customClass: "swal-wide",
              showConfirmButton: false,
              timer: 1000,
            });
            localStorage.setItem(
              "loginUser",
              JSON.stringify({ userId: result.data.userId, isLogin: true })
            );

            this.ToogleFunction();
          
            return this.$router.push("/");
          }
        } catch (error) {
          console.log(error, "error");
        }
      }
    },
  },
};
</script>

<style></style>
