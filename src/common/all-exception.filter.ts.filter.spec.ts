import { PrismaExceptionFilter } from './all-exception.filter.ts.filter';

describe('AllExceptionFilterTsFilter', () => {
  it('should be defined', () => {
    expect(new PrismaExceptionFilter()).toBeDefined();
  });
});
