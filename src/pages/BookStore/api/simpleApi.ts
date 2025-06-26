// 📚 简化的API设计 - 两个核心API
import authorsData from './authors-data.json';
import booksData from './books-data.json';

// Types
type Author = {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
};

type Book = {
  id: string;
  title: string;
  authorId: string;
  year: number;
  genre: string;
};

type BookWithAuthor = Book & {
  author: Author;
};

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.random() * 800 + 200);

// 🌟 API 1: 获取所有书籍信息（包含作者ID）
export const fetchAllBooks = async () => {
  console.log('📚 API 1: Fetching all books...');
  await randomDelay();

  console.log(`✅ API 1 Success: Found ${booksData.length} books`);
  return {
    success: true,
    data: booksData,
    timestamp: new Date().toISOString(),
  };
};

// 🌟 API 2: 根据作者ID获取作者详情（可能404）
export const fetchAuthorById = async (authorId: string) => {
  console.log(`👤 API 2: Fetching author ${authorId}...`);
  await randomDelay();

  // 模拟404错误 - 某些作者ID不存在
  if (authorId.includes('404')) {
    console.log(`❌ API 2: 404 - Author ${authorId} not found`);
    throw new Error(`Author ${authorId} not found`);
  }

  const author = authorsData.find(a => a.id === authorId);

  if (!author) {
    console.log(`❌ API 2: 404 - Author ${authorId} not found`);
    throw new Error(`Author ${authorId} not found`);
  }

  console.log(`✅ API 2 Success: Found ${author.name}`);
  return {
    success: true,
    data: author,
    timestamp: new Date().toISOString(),
  };
};

// 🚀 完整的数据获取和处理流程
export const fetchBooksWithAuthors = async () => {
  try {
    console.log('🚀 Starting books and authors data fetch...');

    // 第1步: 获取所有书籍
    const booksResponse = await fetchAllBooks();
    const books = booksResponse.data;

    // 第2步: 提取所有作者ID
    const authorIds = [...new Set(books.map(book => book.authorId))];
    console.log(`📋 Found ${authorIds.length} unique author IDs: ${authorIds.join(', ')}`);

    // 第3步: 并发获取所有作者信息，处理404
    console.log('🔄 Fetching all authors concurrently...');
    const authorPromises = authorIds.map(async authorId => {
      try {
        const response = await fetchAuthorById(authorId);
        return { success: true, authorId, data: response.data };
      } catch (error) {
        console.log(`⚠️ Author ${authorId} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { success: false, authorId, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });
    console.log('authorPromises: ', authorPromises);

    const authorResults = await Promise.all(authorPromises);

    // 第4步: 分离成功和失败的作者
    const successfulAuthors = authorResults.filter(result => result.success).map(result => result.data) as Author[];

    const failedAuthorIds = authorResults.filter(result => !result.success).map(result => result.authorId);

    console.log(`✅ Successfully fetched ${successfulAuthors.length} authors`);
    console.log(`❌ Failed to fetch ${failedAuthorIds.length} authors: ${failedAuthorIds.join(', ')}`);

    // 第5步: 合并数据，过滤掉404的书籍
    console.log('🔄 Merging books and authors data...');
    const validBooks = books.filter(book => {
      const hasValidAuthor = successfulAuthors.some(author => author.id === book.authorId);
      if (!hasValidAuthor) {
        console.log(`🚫 Filtering out book "${book.title}" - author ${book.authorId} not found`);
      }
      return hasValidAuthor;
    });

    // 第6步: 创建完整的书籍信息
    const booksWithAuthors: BookWithAuthor[] = validBooks.map(book => {
      const author = successfulAuthors.find(a => a.id === book.authorId)!;
      return {
        ...book,
        author,
      };
    });

    // 第7步: 按作者姓氏分组
    console.log('📊 Grouping books by author last name...');
    const grouped = booksWithAuthors.reduce((acc, book) => {
      // 获取作者姓氏的首字母
      const lastName = book.author.name.split(' ').pop() || '';
      const firstLetter = lastName.charAt(0).toUpperCase();

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      acc[firstLetter].push(book);
      return acc;
    }, {} as Record<string, BookWithAuthor[]>);

    // 第8步: 组内按姓氏排序
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => {
        const lastNameA = a.author.name.split(' ').pop() || '';
        const lastNameB = b.author.name.split(' ').pop() || '';
        return lastNameA.localeCompare(lastNameB);
      });
    });

    console.log(`✅ Complete process finished: ${booksWithAuthors.length} books in ${Object.keys(grouped).length} groups`);

    return {
      success: true,
      data: booksWithAuthors,
      grouped,
      summary: {
        totalBooksFound: books.length,
        totalAuthorsFound: successfulAuthors.length,
        validBooksAfterFilter: booksWithAuthors.length,
        filteredOutBooks: books.length - booksWithAuthors.length,
        failedAuthorIds,
        groups: Object.keys(grouped).length,
      },
    };
  } catch (error) {
    console.error('❌ Error in fetchBooksWithAuthors:', error);
    throw error;
  }
};
