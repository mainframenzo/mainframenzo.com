// This file is responsible for defining build script interfaces and types.
export type TAppStage = 'local' | 'main';
export type TPublishStage = 'dev' | 'prod';
export type TAppLocation = 'local' | 'aws';
export type TPostFilter = 'published' | 'draft' | 'all';

/** Post information comes from an HTML comment with a JSON object at the top of the posts' .md file. */
export interface IPostInfo {
  draft?: boolean;
  type: TPostType;
  title?: string;
  publishedOn: string;
  tagline: string;
  resourceDirName?: string; // Relative path of where you store resources, i.e. files, specific to the post.
  boms?: { templateKey: string; name: string; }[]; // Does the post have BOMs? Build them into the HTML.
  buildSlideshows?: { templateKey: string; name: string; }[]; // Does the post have build slideshows? Build them into the HTML.
  threedSlideshows?: { templateKey: string; name: string; }[]; // Does the post have 3d slideshows? Build them into the HTML.
  playlist?: { name: string; }; // Does the post have a playlist? Build it into the HTML.
}

export type TPostType = '#thingsivemade' | '#musing' | '#software' | '#drawing' | '#vehicle' | '#playlist';

export interface IPost {
  postInfo: IPostInfo;
  html: string;
  boms?: IBOMMarkdownReference[];
  buildSlideshows?: ISlideshowMarkdownReference[];
  threedSlideshows?: ISlideshowMarkdownReference[];
  totalCostUSDAllBoms: number;
  playlist?: IPlaylistMarkdownReference;
}

export interface IBOMMarkdownReference {
  templateKey: string;
  name: string;
  html?: string;
}

export interface ISlideshowMarkdownReference {
  templateKey: string;
  name: string;
  html?: string;
}

export interface IPlaylistMarkdownReference {
  name: string;
  //html?: string;
}

export interface IBookmark {
  title: string;
  url: string;
  folderPath: string[];
  notes?: string;
  addDate?: string;
  lastModified?: string;
}

export interface IMaterial {
  quantity: number;
  type: 'part' | 'fastener' | 'tool';
  file: string;
  description: string;
  name: string;
  link: string;
  costUSD: number;
  notes: string;
}

export interface ISlideshowSlide {
  name: string;
  description: string;
  filePath: string;
  thumbnailPath?: string;
}

export interface IHTMLTemplate {
  post?: IPost;
  name: string;
  path: string;
  htmlPath?: string;
  id?: ATemplateId;
}

abstract class ATemplateId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

export class PostTemplateId extends ATemplateId {
  constructor(title: string) {
    super(title);
  }
}

export interface IInitialTemplateData {
  app_stage: TAppStage,
  publish_stage: TPublishStage;
  app_location: TAppLocation;
  api_url: string;
  bookmarks: IBookmark[],
  //scripts_with_csp_hashes: string;
};

export interface IHTMLTemplateData extends IInitialTemplateData {
  locals: any;
  isPostPage: boolean;
  posts: Array<IPost>;
  musings: Array<IPost>;
  software: Array<IPost>;
  drawings: Array<IPost>;
  vehicles: Array<IPost>;
  playlists: Array<IPost>;
  post?: IPost;
  //scripts_with_csp_hashes: string;
}

export interface ISong {
  rowNumber: number;
  'Track Name': string;
  'Artist Name(s)': string;
  'Album Name': string;
  'YouTube URL': string;
  'Artist Wikipedia URL': string;
  'Alternate URL': string;
  filePath: string; // Used by backend.
  fileName: string; // Used by frontend.
  songId: string; // Used by frontend.
  //thumbnailPath?: string;
}

export interface IRow {
  [key: string]: string;
}

export interface IImgSrcset { srcsetRaster: string; srcsetWebp: string; srcsetAvif: string; }

export type TParsedAttributes = Map<string, string>;

export type TImgSrcsetVariant = { width: number; jpg: string; webp: string; avif: string; };

export interface ISongAnalysisSummary {
  readonly song_id: string;
  readonly track: string;
  readonly artist: string;
  readonly duration_seconds: number;
  readonly bpm_all_in_one: number;
  readonly num_segments: number;
  readonly has_all_in_one: boolean;
  readonly has_essentia: boolean;
  readonly essentia_bpm: number | null;
  readonly essentia_key: string | null;
  readonly essentia_scale: string | null;
  readonly essentia_key_strength: number | null;
  readonly essentia_danceability: number | null;
  readonly essentia_onset_rate: number | null;
  readonly essentia_average_loudness: number | null;
  readonly essentia_dynamic_complexity: number | null;
  readonly essentia_loudness_ebu128_integrated: number | null;
  readonly essentia_spectral_centroid_mean: number | null;
  readonly essentia_dissonance_mean: number | null;
  readonly essentia_tuning_frequency: number | null;
  readonly essentia_chords_key: string | null;
  readonly essentia_chords_scale: string | null;
  readonly essentia_chords_changes_rate: number | null;
  readonly essentia_chords_number_rate: number | null;
  readonly count_break: number;
  readonly count_bridge: number;
  readonly count_chorus: number;
  readonly count_end: number;
  readonly count_inst: number;
  readonly count_intro: number;
  readonly count_outro: number;
  readonly count_solo: number;
  readonly count_start: number;
  readonly count_verse: number;
}

