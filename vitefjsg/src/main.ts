import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/style.css"; // 全局属性
import "animate.css";

const app = createApp(App);

app.use(createPinia()).use(router);

app.mount("#app");
