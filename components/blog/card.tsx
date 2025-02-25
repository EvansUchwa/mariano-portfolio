import useModalStore from "@/stores/modal";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { AOUArticle, deleteArticle } from "./crud";
import { Button } from "@/uikits/buttons";
import { ArticleWithAutorAndBanner } from "@/types/global";

type ArticleCardType = {
  article: ArticleWithAutorAndBanner;
  refetch: () => void;
  isManager?: boolean;
};

export function ArticleCard({ article, refetch, isManager }: ArticleCardType) {
  const router = useRouter();
  const { id, title, description, banner, createdAt, autor, views } = article;
  const toggleModal = useModalStore((state) => state.toggle);

  return (
    <div className="articleCard flex f-column">
      <div
        className="ac-top flex f-column"
        onClick={() => router.push("/article/" + id)}
      >
        <img src={banner.url} alt="" />
        <p className="flex ai-c">
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
          {!isManager && <span>{autor.fullname}</span>}
          <span>{views.length} vue(s) </span>
        </p>
        <b>{title}</b>
        <p>{description}</p>
      </div>
      {isManager && (
        <div className="ac-bottom flex">
          <Button
            variant="update"
            onClick={() =>
              toggleModal(<AOUArticle refetch={refetch} article={article} />)
            }
          >
            Modifier
          </Button>
          <Button
            variant="delete"
            onClick={() =>
              deleteArticle(article.id, () => {
                refetch();
              })
            }
          >
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
}
