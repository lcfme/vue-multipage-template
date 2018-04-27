const Vue = require('vue');
const IndexView = require('./index.vue');

new Vue({
    render: h => h(IndexView),
}).$mount('#app');