import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
// import Aura from "@primeuix/themes/aura";

//Premade component theming for PrimeVue. This does cause trouble when using darker elements so
// just custom styling all components can be better in the end
import Material from "@primeuix/themes/nora";

import { ToastService } from "primevue";

const app = createApp(App);

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Material,
        options: {
            prefix: "p",
            darkModeSelector: "dark",
            cssLayer: false,
        },
    },
});
app.use(ToastService);
app.use(router);

app.mount("#app");
