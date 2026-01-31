declare module 'react-native-cookie' {
  interface CookieOptions {
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    expires?: Date | string;
    maxAge?: number;
  }

  export default class Cookie {
    static get(url: string, name?: string): Promise<any>;
    static set(
      url: string,
      name: string,
      value: string,
      options?: CookieOptions
    ): Promise<boolean>;
    static clearAll(): Promise<boolean>;
    static clear(url: string): Promise<boolean>;
  }
}