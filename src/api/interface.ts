interface ANY_OBJECT {
  [propName: string]: any;
}

export interface USERINFO {
  login?: string
  id?: number
  avatar_url?: string
  name?: string
  location?: string
  bio?: string
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  created_at?: string
  updated_at?: string
  [propName: string]: any
}

export interface REPO {
  name?: string
  description?: string
  fork?: boolean
  created_at?: string
  updated_at?: string
  stargazers_count?: number
  watchers_count?: number
  language?: string
  forks_count?: number
  open_issues?: number
  forks?: number
  watchers?: number
  [propName: string]: any
}

export interface REPOS_INFO {
  repos?: REPO[]
  stars?: number
  forks?: number
  forked?: number
  openIssues?: number
  language?: ANY_OBJECT
  maxIssues?: REPO
  createds?: number
  updateds?: number
  dayEarliest?: REPO
  dayLatest?: REPO
}
