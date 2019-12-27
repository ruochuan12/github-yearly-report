import dayjs from 'dayjs';
import { REPO } from '@/api/interface';
import { pick, inStartEndYear } from './utils';
import { REPOS_PICK_KEYS } from './constant';

interface LANGUAGE {
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
  let createdsResult = 0;
  let updatedsResult = 0;
  const languageResult: LANGUAGE = {};
  let maxIssueCount = 0;
  let maxIssueIndex = 0;
  let dayEarliestTime = 0;
  let dayEarliestIndex = 0;
  let dayLatestTime = 0;
  let dayLatestIndex = 0;

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

    if (inStartEndYear(created_at)) {
      createdsResult += 1;
    }

    if (inStartEndYear(updated_at)) {
      updatedsResult += 1;
      if (index === 0) {
        dayEarliestTime = updated_at;
        dayLatestTime = updated_at;
      } else if (dayjs(updated_at).isBefore(dayjs(dayEarliestTime, 'second'))) {
        dayEarliestTime = updated_at;
        dayEarliestIndex = index;
      } else if (dayjs(updated_at).isAfter(dayjs(dayLatestTime, 'second'))) {
        dayLatestTime = updated_at;
        dayLatestIndex = index;
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
    stars: starsResult, // 点赞你的总数
    forks: forksResult, // 你 fork 总数
    forked: forkedResult, // fork 你的总数
    openIssues: openIssuesResult, // 打开的 issues 数
    language: languageResult, // 语言
    maxIssues: result[maxIssueIndex], // open issues 最多的仓库
    createds: createdsResult, // 本年新创建的仓库
    updateds: updatedsResult, // 本年有更新过的仓库
    dayEarliest: result[dayEarliestIndex], // 每天最早的 update
    dayLatest: result[dayLatestIndex], // 每天最迟的 update
  };
  return all;
};
