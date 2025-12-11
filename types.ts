export interface NewsItem {
  headline: string;
  articleBody: string;
  appRemark: string;
  tags: string[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface NewsResponse {
  items: NewsItem[];
  sources: GroundingSource[];
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: NewsResponse | null;
}