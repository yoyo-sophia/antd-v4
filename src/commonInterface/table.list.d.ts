export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListParams {
  sorter: string;
  status: string;
  search: string;
  pageSize: number;
  currentPage: number;
}

export interface anyArray {
  [index: number]: any
}
