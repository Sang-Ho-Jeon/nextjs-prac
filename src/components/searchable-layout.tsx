import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({children}: {
  children: ReactNode;
}) {

  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "")
  }, [q])

  // 사용자가 input 태그에 이력하는 값을 실시간으로 search state에 보관
  // React.ChangeEvent<HTMLInputElement>의 의미: React에서 발생한 ChangeEvent객체 타입인데 HTMLInputElement태그에서 발생한 이벤트 타입이다.
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // 입력된 값이 없으면 또는 현재 쿼리와 검색어가 같으면 리턴
  // 현재 입력한 검색어와 함께 search 페이지로 이동
  const onSubmit = () => {
    if(!search || q === search) return;
    router.push(`/search?q=${search}`)
  }

  // 엔터키 검색기능
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onKeyDown={onKeyDown} onChange={onChangeSearch} placeholder="검색어를 입력하세요 ..."/>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}

