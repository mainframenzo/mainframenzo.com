import { TPublishStage } from "../../src/infra.aws/stage";

// This file is responsible for defining build script interfaces and types.
export type TAppStage = 'local' | 'main';
export type TAppPublishStage = 'dev' | 'prod';
export type TAppLocation = 'local' | 'aws';
export type TPostFilter = 'published' | 'draft' | 'all';

/** Post information comes from an HTML comment with a JSON object at the top of the posts' .md file. */
export interface IPostInfo {
  draft?: boolean;
  type: TPostType;
  title?: string;
  publishedOn: string;
  tagline: string;
  resourceDirName?: string;
  boms?: { templateKey: string; name: string; }[];
  buildSlideshows?: { templateKey: string; name: string; }[];
  threedSlideshows?: { templateKey: string; name: string; }[];
}

export type TPostType = '#thingsivemade' | '#musing' | '#software' | '#drawings' | '#vehicles' | '#recordings';

export interface IPost {
  postInfo: IPostInfo;
  html: string;
  boms?: IBOMMarkdownReference[];
  buildSlideshows?: ISlideshowMarkdownReference[];
  threedSlideshows?: ISlideshowMarkdownReference[];
  totalCostUSDAllBoms: number;
  //slideshowHTML?: string;
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
  appStage: TAppStage, 
  publishStage: TPublishStage;
  appLocation: TAppLocation; 
  scripts_with_csp_hashes: string; 
};

export interface IHTMLTemplateData {
  locals: any;
  app_stage: TAppStage;
  publish_stage: TPublishStage;
  app_location: TAppLocation;
  isPostPage: boolean;
  posts: Array<IPost>;
  musings: Array<IPost>;
  software: Array<IPost>;
  drawings: Array<IPost>;
  vehicles: Array<IPost>;
  recordings: Array<IPost>;
  post?: IPost;
  scripts_with_csp_hashes: string;
}