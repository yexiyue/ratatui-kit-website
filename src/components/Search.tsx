import { useEffect, useRef, useState } from "react";
import type { Article } from "@/pages/search-index.json";
import {
  Charset,
  Document,
  type MergedDocumentSearchResults,
} from "flexsearch";
import lodash from "lodash";

export const DocsSearch = () => {
  const [value, setValue] = useState("");

  const fuse = useRef<Document<Article> | null>(null);
  const [results, setResults] = useState<
    Record<
      "docs" | "example" | "principle",
      MergedDocumentSearchResults<Article>
    >
  >({
    docs: [],
    example: [],
    principle: [],
  });

  useEffect(() => {
    fetch("/ratatui-kit-website/search-index.json")
      .then((response) => response.json())
      .then((data) => {
        const flexSearch = new Document<Article>({
          id: "slug",
          tokenize: "forward",
          encoder: Charset.LatinAdvanced,
          resolution: 9,
          index: [
            {
              field: "title",
            },
            {
              field: "content",
              resolution: 3,
            },
          ],
          store: ["title", "group"],
        });
        data.forEach((doc: Article) => {
          flexSearch.add(doc);
        });
        fuse.current = flexSearch;
      });
  }, []);

  useEffect(() => {
    const res = fuse.current?.search(value, {
      enrich: true,
      suggest: true,
      merge: true,
    });
    setResults(lodash.groupBy(res, "doc.group") as any);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const show =
    value.length > 0 &&
    (results.docs?.length > 0 ||
      results.example?.length > 0 ||
      results.principle?.length > 0);

  const onClick = () => {
    setValue("");
    setResults({
      docs: [],
      example: [],
      principle: [],
    });
  };

  return (
    <div className="w-full relative">
      <div className="w-full">
        <label className="input input-sm w-full ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={value}
            onChange={handleChange}
          />
        </label>
      </div>
      <div
        className={`w-full bg-base-100 absolute top-12 z-10 max-h-60 overflow-y-auto ${
          show ? "block" : "hidden"
        }`}
      >
        <ul className="menu w-full">
          {results.docs?.length > 0 && (
            <>
              <li className="menu-title text-info">文档</li>
              {results.docs.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.id as string}
                    className="hover:bg-neutral hover:text-neutral-content"
                    onClick={onClick}
                  >
                    <p className="truncate">{doc.doc?.title}</p>
                  </a>
                </li>
              ))}
            </>
          )}
          {results.example?.length > 0 && (
            <>
              <li className="menu-title text-info">示例</li>
              {results.example.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.id as string}
                    className="hover:bg-neutral hover:text-neutral-content"
                    onClick={onClick}
                  >
                    <p className="truncate">{doc.doc?.title}</p>
                  </a>
                </li>
              ))}
            </>
          )}
          {results.principle?.length > 0 && (
            <>
              <li className="menu-title text-info">原理</li>
              {results.principle.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.id as string}
                    className="hover:bg-neutral hover:text-neutral-content"
                    onClick={onClick}
                  >
                    <p className="truncate">{doc.doc?.title}</p>
                  </a>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
