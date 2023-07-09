abstract class BooksRepository {
    abstract getBook(id: string): object;
    abstract getBooks(): object[];
    abstract createBook(): object;
    abstract updateBook(id: string): object;
    abstract deleteBook(id: string): object;
}