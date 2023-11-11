export type Identifier = string;
export type Url = string;
export type Timestamp = number;
export type Image = {
  urls: {
    large?: Url;
    medium?: Url;
    small?: Url;
  },
  alt?: string;

};
