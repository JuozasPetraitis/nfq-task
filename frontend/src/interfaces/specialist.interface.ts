export type Service = 'post_office' | 'bank' | 'hospital';

export interface Specialist {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  service: Service;
}
