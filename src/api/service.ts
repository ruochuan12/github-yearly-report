import axios from '@/lib/axios';
import { githubTokenPath } from './api';

export const fetchGithubTokenService = async (
  payload = {},
): Promise<any> => {
  const response = await axios(githubTokenPath, payload, 'post');
  return response;
};

/**
 * 获取 userInfo
 * @param octokit 实例对象
 * @param payload 参数
 */
export const fetchUserInfoService = async (
  octokit: any,
  payload?: {},
): Promise<any> => {
  const { users } = octokit;
  const response = await users.getAuthenticated(payload);
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

/**
 * 获取 stars
 * @param octokit 实例对象
 * @param payload 参数
 */
export const fetchStarsService = async (
  octokit: any,
  payload = {},
): Promise<any> => {
  const { activity } = octokit;
  const response = await activity.listReposStarredByAuthenticatedUser(payload);
  return response;
};

/**
 * 获取 public event
 * @param octokit 实例对象
 * @param payload 参数
 */
export const fetchPublicEventsService = async (
  octokit: any,
  payload = {},
): Promise<any> => {
  const { activity } = octokit;
  const response = await activity.listPublicEvents(payload);
  return response;
};
