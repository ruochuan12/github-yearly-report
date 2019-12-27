import Vue from 'vue';

import {
  YEAR_START,
} from '@/lib/constant';
import {
  fetchIssuesService,
  fetchStarsService,
  fetchUserInfoService,
  fetchPublicEventsService,
} from '@/api/service';

interface STORE {
  userInfo?: any
  issues?: any[],
  code: string
  status: number
}

const app = new Vue({
  data: {
    userInfo: {},
    code: '',
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
  const userInfo: any = [];
  const res = await fetchUserInfoService(octokit);
  st.userInfo = userInfo;
};

export const fetchIssues = async (octokit: any) => {
  const issues: any = [];
  const res = await fetchIssuesService(octokit, {
    filter: 'all',
    state: 'all',
    sort: 'created',
    since: YEAR_START.toISOString(),
    per_page: 100,
    page: 1,
  });
  st.issues = issues;
};

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

export default app;
