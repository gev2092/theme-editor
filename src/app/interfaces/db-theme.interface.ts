import { IThemeEdge } from './theme-edge.interface';

export interface IDbTheme {
  default?: boolean,
  pageInfo?: {},
  edges?: IThemeEdge[]
}
