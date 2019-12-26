import Vue from 'vue';

const app = new Vue({
  data: {
    issues: [],
    code: '',
  },
});

const st = app.$data;

interface ANY_OBJECT {
  [propName: string]: string;
}

export const mapState = (keys: string[]) => {
  const res: ANY_OBJECT = {};
  keys.forEach((it: string) => {
    res[it] = st[it];
  });
  return res;
};

export const updateState = (payload: ANY_OBJECT) => {
  Object.keys(payload).forEach(it => {
    st[it] = payload[it];
  });
};

export default app;
