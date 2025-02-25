"use client";
import { AOUArticle } from "@/components/blog/crud";
import { ArticleCard } from "@/components/blog/card";
import { DataContainer } from "@/components/dataContainer";
import useCustomQuery from "@/hooks/useQuery";
import useModalStore from "@/stores/modal";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { Button } from "@/uikits/buttons";
import { DataSpinner } from "@/uikits/others";
import React from "react";

function BlogManager() {
  const { isLoading, data, refetch } = useCustomQuery<
    ArticleWithAutorAndBanner[] | []
  >("/api/article?all=true");
  const showModal = useModalStore((state) => state.toggle);

  function newArticleModal() {
    showModal(<AOUArticle refetch={refetch} />);
  }

  if (isLoading) return <DataSpinner />;
  return (
    <div>
      {data ? (
        <DataContainer
          title="Gestion du blog"
          actionButton={
            <Button onClick={newArticleModal}>Nouvel article</Button>
          }
        >
          {data.map((item, i) => (
            <ArticleCard
              refetch={refetch}
              key={"article nb" + i}
              article={item}
              isManager={true}
            />
          ))}
        </DataContainer>
      ) : (
        <p>Aucun article disponile</p>
      )}
    </div>
  );
}

export default BlogManager;
