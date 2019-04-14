import Query from './Query';

export interface ServerResponse {
    message: string;
    success: boolean;
    queries: Query[] | Query;
}
