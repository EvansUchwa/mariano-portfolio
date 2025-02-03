"use client";
import { AOUArticle, ArticleCard } from "@/components/blog/article";
import useCustomQuery from "@/hooks/useQuery";
import useAuthStore from "@/stores/auth";
import useModalStore from "@/stores/modal";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { Button } from "@/uikits/buttons";
import { DataSpinner } from "@/uikits/others";
import React, { ReactNode } from "react";

function Blog() {
  const { isLoading, data, refetch } = useCustomQuery<
    ArticleWithAutorAndBanner[] | []
  >("/api/article?all=true");

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const toggleModal = useModalStore((state) => state.toggle);

  return (
    <div className="blog">
      <h1>Blog</h1>
      {isAuthenticated && user && (
        <Button
          onClick={() =>
            toggleModal(<AOUArticle user={user} refetch={refetch} />)
          }
        >
          Ajouter un nouvel Article
        </Button>
      )}
      <br />
      <br />
      {children}
    </div>
  );
}

export default Blog;
