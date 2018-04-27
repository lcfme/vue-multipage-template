const Vue = require('vue');
const vConsole = require('vconsole');
const IndexView = require('./index.vue');

console.log(process);

if (process.env.NODE_ENV === 'development') {
    new vConsole();
}

new Vue({
    render: h => h(IndexView)
}).$mount('#app');
