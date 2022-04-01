import { BookFactory } from './book-factory';

describe('BookFactory', () => {
  it('should create an instance', () => {
    expect(new BookFactory()).toBeTruthy();
  });
});
