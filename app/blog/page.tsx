"use client";
import { ArticleCard } from "@/components/blog/card";
import useCustomQuery from "@/hooks/useQuery";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { DataSpinner } from "@/uikits/others";
import React, { ReactNode } from "react";

function Blog() {
  const { isLoading, data, refetch } = useCustomQuery<
    ArticleWithAutorAndBanner[] | []
  >("/api/article/all?all=true");

  if (isLoading)
    return (
      <BlogContainer refetch={refetch}>
        <DataSpinner />
      </BlogContainer>
    );
  return (
    <BlogContainer refetch={refetch}>
      {data ? (
        <div className="flex f-wrap">
          {data.map((item, i) => (
            <ArticleCard
              refetch={refetch}
              key={"article nb" + i}
              article={item}
            />
          ))}
        </div>
      ) : (
        <p>Aucun article disponile</p>
      )}
    </BlogContainer>
  );
}

type BlogContainerType = {
  children: ReactNode;
  refetch: () => void;
};
function BlogContainer({ children, refetch }: BlogContainerType) {
  return (
    <div className="blog">
      <h1>Blog</h1>
      {children}
    </div>
  );
}

export default Blog;
