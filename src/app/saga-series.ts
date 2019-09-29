import {SagaBook} from './saga-book';

export interface SagaSeries {
    seriesName: string;
    books: SagaBook[];
}
