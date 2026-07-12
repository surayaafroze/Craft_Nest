export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  images: string[];
  ownerId: string;
  status: string;
  tags?: string[];
  quantity?: number;
  location?: string;
  avgRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedItemsResponse {
  items: Item[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
