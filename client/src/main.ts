import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "./store";
const app = createApp(App);
const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
};
app
  .use(router)
  .use(store)
  .use(VueSweetalert2, options)
  .use(vuetify)
  .mount("#app");
