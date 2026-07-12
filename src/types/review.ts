export interface ReviewUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: ReviewUser | null;
}

export interface ReviewResponse {
  reviews: Review[];
}
