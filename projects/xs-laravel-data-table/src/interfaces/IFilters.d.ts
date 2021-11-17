export interface IFilters {
    key: string;
    type: 'text' | 'select' | 'date' | 'dateRange';
    options?: { key: string, value: string };
}
