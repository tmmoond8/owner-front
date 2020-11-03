export interface Profile {
  id?: string;
  name: string;
  thumbnail?: string;
  profile?: string;
  email: string;
  description?: string;
  group?: string;
  isOwner?: boolean;
}

export default interface User extends Profile {
  provider: 'kakao' | 'naver';
  snsId: string;
}

export interface SignUpUser {
  provider: 'kakao' | 'naver';
  snsId: string;
  name?: string;
  thumbnail?: string;
  profile?: string;
  email?: string;
  group?: string;
  isOwner?: boolean;
}