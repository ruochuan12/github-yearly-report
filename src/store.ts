import Vue from 'vue';

import {
  YEAR_START, HOME_STATUS,
} from '@/lib/constant';
import {
  fetchIssuesService,
  fetchStarsService,
  fetchUserInfoService,
  fetchPublicEventsService,
} from '@/api/service';
import { USERINFO } from '@/api/interface';

interface STORE {
  userInfo?: USERINFO
  issues?: any[]
  status?: number
}

const app = new Vue<STORE>({
  data: {
    userInfo: {},
    status: 0,
  },
});

const st = app.$data;

interface ANY_OBJECT {
  [propName: string]: any;
}

export const mapState = (keys: string[]) => {
  const res: ANY_OBJECT = {};
  keys.forEach((it: string) => {
    (res[it] as any) = () => st[it];
  });
  return res;
};

export const updateState = (payload: ANY_OBJECT) => {
  Object.keys(payload).forEach(it => {
    st[it] = payload[it];
  });
};

export const fetchUserInfo = async (octokit: any) => {
  try {
    const res = await fetchUserInfoService(octokit);
    if (+res.status === 200) {
      st.userInfo = res.data;
    }
  } catch (e) {
    st.status = HOME_STATUS.ERROR;
  }
};

export const fetchIssues = async (octokit: any) => fetchIssuesService(octokit, {
  filter: 'all',
  state: 'all',
  sort: 'created',
  since: YEAR_START.toISOString(),
  per_page: 100,
  page: 1,
});

export const fetchStars = async (octokit: any) => {
  const stars: any = [];
  const res = await fetchStarsService(octokit, {
    sort: 'created',
    per_page: 100,
    page: 1,
  });
  st.stars = stars;
};

export const fetchPublicEvents = async (octokit: any) => {
  const publicEvents: any = [];
  const res = await fetchPublicEventsService(octokit);
  st.publicEvents = publicEvents;
};

export const fetchAll = async (octokit: any) => {
  // const all = [
  //   // fetchIssues(octokit),
  // ];
  // const results = await Promise.all(all);
  st.status = HOME_STATUS.FINISH;
  // results.forEach(item => {
  //   console.log(item);
  // });
};

export default app;
