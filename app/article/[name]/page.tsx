"use client";
import SimilarArticles from "@/components/blog/similarArticles";
import useCustomQuery from "@/hooks/useQuery";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { MdiEyeCheck, MdiTooltipAccount } from "@/uikits/icons";
import { DataSpinner } from "@/uikits/others";
import { useParams } from "next/navigation";
import React, { ReactNode } from "react";

type ArticleContainerType = {
  children: ReactNode;
};
function ArticleContainer({ children }: ArticleContainerType) {
  return <div className="article flex f-wrap">{children}</div>;
}
function Article() {
  const { name } = useParams();
  const { isLoading, data } = useCustomQuery<ArticleWithAutorAndBanner | null>(
    "/api/article?one=true&oneId=" + name
  );

  if (isLoading)
    return (
      <ArticleContainer>
        <DataSpinner />
      </ArticleContainer>
    );

  return (
    <ArticleContainer>
      {data ? (
        <section className="articleDetails flex f-column">
          <div className="flex jc-sb">
            <p className="flex ai-c">
              <b className="flex ai-c">
                <MdiTooltipAccount />
                Auteur :
              </b>
              <span> {data.autor.fullname} </span>
            </p>
            <b className="flex ai-c">
              <MdiEyeCheck />
              {data.views.length} vue{data.views.length > 1 && "s"}{" "}
            </b>
          </div>
          <img src={data.banner.url} alt="" />
          <h1>{data.title}</h1>
          <b>{data.description}</b>
          <section dangerouslySetInnerHTML={{ __html: data.content }} />
        </section>
      ) : (
        <p>Aucun article corespondant</p>
      )}
      <section className="othersArticles">
        <h3>Autres articles</h3>
        <SimilarArticles articleId={data.id} />
      </section>
    </ArticleContainer>
  );
}

export default Article;
