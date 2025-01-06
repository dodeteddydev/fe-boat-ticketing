export type SuccessResponseList<T> = {
  message: string;
  data: T[];
  paging: {
    currentPage: number;
    size: number;
    totalPage: number;
  };
};
