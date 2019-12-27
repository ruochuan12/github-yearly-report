import Vue from 'vue';

import {
  YEAR_START, HOME_STATUS, GITHUB_YEARLY_REPORT_PRE, ONE_HOUR, ONE_DAY,
} from '@/lib/constant';
import { USERINFO, REPO, REPOS_INFO, STARS_INFO } from '@/api/interface';
import { timeoutFn } from './lib/utils';
import { handleReposData, handleStarsData } from '@/lib/handleData';
import { getStorage, setStorage } from './lib/storage';

interface STORE {
  userInfo?: USERINFO
  reposInfo?: REPOS_INFO
  issues?: any[]
  status?: number
  starsInfo?: STARS_INFO
}

const app = new Vue<STORE>({
  data: {
    userInfo: {},
    status: 0,
    reposInfo: {},
    starsInfo: {},
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
  const userInfoStorage = getStorage(`${GITHUB_YEARLY_REPORT_PRE}_USERINFO`);
  if (userInfoStorage) {
    st.userInfo = userInfoStorage;
  } else {
    const { users } = octokit;
    const res = await timeoutFn(users.getAuthenticated());
    if (+res.status === 200) {
      st.userInfo = res.data;
      setStorage(`${GITHUB_YEARLY_REPORT_PRE}_USERINFO`, res.data, ONE_DAY);
    }
  }
};

export const fetchRepos = (octokit: any) => new Promise(async (resolve, reject) => {
  const reposStorage = getStorage(`${GITHUB_YEARLY_REPORT_PRE}_REPOS`);
  if (reposStorage) {
    st.reposInfo = reposStorage;
  } else {
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
        reject();
      }
      pageNo += 1;
      originalReposData = originalReposData.concat(data);
      if (data && data.length === 0) {
        hasNext = false;
      }
    };
    while (pageNo === 1 || hasNext) {
      await fn(pageNo); // eslint-disable-line
    }
    const reposHandleResult = handleReposData(originalReposData);
    st.reposInfo = reposHandleResult;
    setStorage(`${GITHUB_YEARLY_REPORT_PRE}_REPOS`, reposHandleResult, ONE_HOUR);
  }
  resolve();
});

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

export const fetchStars = (octokit: any) => new Promise(async (resolve, reject) => {
  const storageData = getStorage(`${GITHUB_YEARLY_REPORT_PRE}_STARS`);
  if (storageData) {
    st.starsInfo = storageData;
  } else {
    const { activity } = octokit;
    let originalData: any[] = [];
    let pageNo: number = 1;
    let hasNext: boolean = true;
    const fn = async (page: number) => {
      const res = await activity.listReposStarredByAuthenticatedUser({
        sort: 'created',
        per_page: 100,
        page,
      });
      const { status, data } = res;
      if (+status !== 200) {
        reject();
      }
      pageNo += 1;
      originalData = originalData.concat(data);
      if (data && data.length === 0) {
        hasNext = false;
      }
    };
    while (pageNo === 1 || hasNext) {
      await fn(pageNo); // eslint-disable-line
    }
    const handleResultData = handleStarsData(originalData);
    st.starsInfo = handleResultData;
    setStorage(`${GITHUB_YEARLY_REPORT_PRE}_STARS`, handleResultData, ONE_HOUR);
  }
  resolve();
});

export const fetchAll = async (octokit: any) => {
  try {
    await fetchUserInfo(octokit);
    const all = [
      fetchRepos(octokit),
      fetchStars(octokit),
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
