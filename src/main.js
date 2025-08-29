import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


// 判断是否在qiankun的运行环境下，非qiankun运行环境下单独运行
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let instance = null;
function render(props = {}) {
  const { container } = props;
  console.log(11111111111111, window.__POWERED_BY_QIANKUN__, '字段值')
  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app', true); //开启沙箱
}

if (!window.__POWERED_BY_QIANKUN__) {
  console.log('独立运行')
  render();
}


function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

// 各个生命周期，只会在微应用初始化的时候调用一次，下次进入微应用重新进入是会直接调用mount钩子，不会再重复调用bootstrap
export async function bootstrap() {
  console.log('111111111111 [vue] vue app bootstraped');
}
// 应用每次进入都会调用mount方法，通常在这里触发应用的渲染方法
export async function mount(props) {
  console.log('11111111111 [vue] props from main framework', props);
  storeTest(props);
  render(props);
}
// 应用每次切除/注销会调用的方法，在这里会注销微应用的应用实例
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
