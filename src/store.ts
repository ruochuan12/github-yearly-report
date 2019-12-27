import Vue from 'vue';

import {
  YEAR_START, HOME_STATUS,
} from '@/lib/constant';
import { USERINFO, REPO } from '@/api/interface';
import { timeoutFn } from './lib/utils';
import { handleReposData } from '@/lib/handleData';

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
  const { users } = octokit;
  const res = await timeoutFn(users.getAuthenticated());
  if (+res.status === 200) {
    st.userInfo = res.data;
  }
};

export const fetchRepos = async (octokit: any) => {
  const { repos } = octokit;
  let originalReposData: REPO[] = [];
  let pageNo: number = 1;
  let hasNext: boolean = true;
  const fn = async (page: number) => {
    const res = await repos.list({
      visibility: 'all',
      sort: 'updated',
      per_page: 100,
      page,
    });
    const { status, data } = res;
    if (+status !== 200) {
      throw new Error('莫名其妙的错误');
    }
    pageNo += 1;
    originalReposData = originalReposData.concat(data);
    if (data.length === 0) {
      hasNext = false;
    }
  };
  while (pageNo === 1 || hasNext) {
    await fn(pageNo); // eslint-disable-line
  }
  const reposHandleResult = handleReposData(originalReposData);
  console.log(reposHandleResult);
};

export const fetchIssues = async (octokit: any) => {
  const { issues } = octokit;
  const response = await issues.list({
    filter: 'all',
    state: 'all',
    sort: 'created',
    since: YEAR_START.toISOString(),
    per_page: 100,
    page: 1,
  });
  return response;
};

export const fetchStars = async (octokit: any) => {
  const stars: any = [];
  const { activity } = octokit;
  const response = await activity.listReposStarredByAuthenticatedUser({
    sort: 'created',
    per_page: 100,
    page: 1,
  });
  st.stars = stars;
};

export const fetchAll = async (octokit: any) => {
  try {
    // await fetchUserInfo(octokit);
    const all = [
      fetchRepos(octokit),
    ];
    Promise.all(all).then(res => {
      st.status = HOME_STATUS.FINISH;
    }).catch(e => {
      console.log(e);
      st.status = HOME_STATUS.ERROR;
    });
  } catch (e) {
    st.status = HOME_STATUS.ERROR;
  }
};

export default app;
