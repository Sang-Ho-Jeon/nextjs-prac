// 모든 도서의 데이터를 불러와서 반환해주는 함수
import { BookData } from "@/type";

// 비동기로 받아오므로 반환값의 타입은 Promise
export default async function fetchBooks(q?:string) : Promise<BookData[]> {
  let url = `http://localhost:12345/book`

  if(q) {
    url += `/search?q=${q}`
  }

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error()
    }

    return await response.json()
  } catch (err) {
    console.error(err);
    return [];
  }
} 