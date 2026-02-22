import { http } from '@/utils/http';

export interface InternQuery {
  advisorName?: string;
  className?: string;
  studentNo?: string;
  studentName?: string;
  selected?: boolean;
  pageNum?: number;
  pageSize?: number;
}

export interface InternItem {
  id: number;
  name: string;
  studentNo: string;
  className: string;
  advisorName: string;
  selected: boolean;
}

export interface InternPaginationData {
  records: InternItem[];
  total: number;
  pageNum: number;
  pageSize: number;
}

export const internService = {
  getList: (query: InternQuery): Promise<InternPaginationData> => {
    return http.get('/internship/intern/list', {
      params: query
    });
  }
};
