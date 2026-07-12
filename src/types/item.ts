export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: string;
  price: number;
  imageUrls: string[];
  ownerId: string;
  status: string;
  tags?: string[];
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
