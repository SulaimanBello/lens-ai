export interface SourceLink {
  title?: string;
  uri: string;
}

export interface SummaryResult {
  text: string;
  sources: SourceLink[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}