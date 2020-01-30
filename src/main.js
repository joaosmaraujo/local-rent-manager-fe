import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

// Setting up axios as default vue's http modules for api calls
Vue.prototype.$http = axios;
// Load authorization token from the localStorage
const token = localStorage.getItem('token');
// If there is any token appends it to default axios authorization headers
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

// Creates global filter to be used to format dates
Vue.filter('formatDate', function(value) {
    if (value) {
        return new Date(value).toISOString().substr(0, 10);
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
