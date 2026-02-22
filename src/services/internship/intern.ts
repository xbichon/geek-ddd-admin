import { fetchPage } from '@/utils/pagination';
import type { PageData, PageQuery } from '@/utils/pagination';

export interface InternQuery extends PageQuery {
  advisorName?: string;
  className?: string;
  studentNo?: string;
  studentName?: string;
  selected?: boolean;
}

export interface InternItem {
  id: number;
  name: string;
  studentNo: string;
  className: string;
  advisorName: string;
  selected: boolean;
}

export const internService = {
  getList: (query: InternQuery): Promise<PageData<InternItem>> =>
    fetchPage<InternItem, InternQuery>('/internship/intern/list', query)
};
