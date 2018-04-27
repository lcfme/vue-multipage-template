const Vue = require('vue');
const vConsole = require('vconsole');
const IndexView = require('./index.vue');

new vConsole();

new Vue({
    render: h => h(IndexView)
}).$mount('#app');
