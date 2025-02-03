import useCustomQuery from "@/hooks/useQuery";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { DataSpinner } from "@/uikits/others";
import dayjs from "dayjs";
import React from "react";

type SimilarArticlesProps = {
  articleId: string;
};
function SimilarArticles({ articleId }: SimilarArticlesProps) {
  const { data, isLoading } = useCustomQuery<ArticleWithAutorAndBanner[] | []>(
    "/api/article?all=true&except=" + articleId + "&limit=5"
  );

  if (isLoading) return <DataSpinner />;

  if (!data || data.length == 0) return <p>Aucun article disponible</p>;
  return (
    <ul className="flex f-column">
      {data.map((item, i) => (
        <li key={"dfwef nb" + i} className="flex">
          <img src={item.banner.url} alt="" />
          <p className="flex f-column">
            <b>{item.title}</b>
            <span>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")} </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default SimilarArticles;
