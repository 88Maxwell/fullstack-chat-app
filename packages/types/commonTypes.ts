export type Image = {
    urls: {
      large?: Url;
      medium?: Url;
      small?: Url;
    },
    alt?: string;  
};
  
export type Identifier = string;
export type Url = string;
export type Timestamp = number;
export type AnyCallback = (...args: any[]) => void;
export type Cb<Params> = (params: Params) => void;