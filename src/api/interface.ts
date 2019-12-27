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
