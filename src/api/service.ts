import axios from '@/lib/axios';
import { githubTokenPath } from './api';

export const fetchGithubTokenService = async (
  payload = {},
): Promise<any> => {
  const response = await axios(githubTokenPath, payload, 'post');
  return response;
};

/**
 * 获取 issues
 * @param octokit 实例对象
 * @param payload 参数
 */
export const fetchIssuesService = async (
  octokit: any,
  payload = {},
): Promise<any> => {
  const { issues } = octokit;
  const response = await issues.list(payload);
  return response;
};
