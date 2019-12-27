import dayjs from 'dayjs';
import { REPO } from '@/api/interface';
import { pick, inStartEndYear, inLastStartYear } from './utils';
import { REPOS_PICK_KEYS } from './constant';

interface ANY_OBJECT {
  [propName: string]: number
}

/**
 * 从仓库数据中我们可以分析什么
 * @param repos 所有仓库
 */
export const handleReposData = (repos: REPO[]) => {
  let starsResult = 0;
  let forksResult = 0;
  let forkedResult = 0;
  let openIssuesResult = 0;
  let lastyearCreatedResult = 0;
  let toyearCreatedsResult = 0;

  const languageResult: ANY_OBJECT = {};
  let maxIssueCount = 0;
  let maxIssueIndex = 0;
  let dayEarliestTime = 0;
  let dayEarliestIndex = 0;
  let dayLatestTime = 0;
  let dayLatestIndex = 0;
  let latestUpdateTime = 0;
  let latestUpdateIndex = 0;

  const result = repos.map((repo: REPO, index: number) => {
    const repoTemp = pick(repo, REPOS_PICK_KEYS);
    const { fork, stargazers_count, forks_count, open_issues, created_at, updated_at } = repoTemp;
    const language = repoTemp.language || 'other';
    starsResult += stargazers_count;
    forkedResult += forks_count;
    openIssuesResult += open_issues;
    languageResult[language] = languageResult[language] ? languageResult[language] + 1 : 1;

    if (fork) {
      forksResult += 1;
    }

    if (inLastStartYear(created_at)) {
      lastyearCreatedResult += 1;
    }

    if (inStartEndYear(created_at)) {
      toyearCreatedsResult += 1;
    }

    if (inStartEndYear(updated_at)) {
      if (index === 0) {
        dayEarliestTime = updated_at;
        dayLatestTime = updated_at;
        latestUpdateTime = updated_at;
      }
      if (dayjs(updated_at).isBefore(dayjs(dayEarliestTime, 'second'))) {
        dayEarliestTime = updated_at;
        dayEarliestIndex = index;
      }
      if (dayjs(updated_at).isAfter(dayjs(dayLatestTime, 'second'))) {
        dayLatestTime = updated_at;
        dayLatestIndex = index;
      }
      if (dayjs(updated_at).isAfter(dayjs(dayLatestTime, 'second'))) {
        latestUpdateTime = updated_at;
        latestUpdateIndex = index;
      }
    }

    if (open_issues > maxIssueCount && language !== 'other') {
      maxIssueCount = open_issues;
      maxIssueIndex = index;
    }

    return repoTemp;
  });

  const all = {
    repos: result, // 所有仓库
    lastYearCreateds: lastyearCreatedResult, // 去年创建的仓库
    createds: toyearCreatedsResult, // 本年新创建的仓库
    latest: result[latestUpdateIndex], // 最近在更新的仓库
    stars: starsResult, // 点赞你的总数
    forks: forksResult, // 你 fork 总数
    forked: forkedResult, // fork 你的总数
    openIssues: openIssuesResult, // 打开的 issues 数
    maxIssues: result[maxIssueIndex], // open issues 最多的仓库
    dayEarliest: result[dayEarliestIndex], // 每天最早的 update
    dayLatest: result[dayLatestIndex], // 每天最迟的 update
    language: languageResult, // 语言
  };
  return all;
};

/**
 * 从你的点赞记录可以分析什么
 * @param repos 所有仓库
 */
export const handleStarsData = (repos: REPO[]) => {
  const languageResult: ANY_OBJECT = {};

  const result = repos.map((repo: REPO, index: number) => {
    const repoTemp = pick(repo, REPOS_PICK_KEYS);
    const language = repoTemp.language || 'other';

    languageResult[language] = languageResult[language] ? languageResult[language] + 1 : 1;

    return repoTemp;
  });
  return {
    stars: result,
    language: languageResult,
  };
};
