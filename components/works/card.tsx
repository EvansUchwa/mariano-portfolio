import useModalStore from "@/stores/modal";
import { Button } from "@/uikits/buttons";
import { AOUWork, deleteWork } from "./crud";
import dayjs from "dayjs";
import { ProjectsWithSubModel } from "@/types/model";
import Link from "next/link";

type WorkCardType = {
  work: ProjectsWithSubModel;
  isManager?: boolean;
  refetch: () => void;
};
export function WorkCard({ work, refetch, isManager }: WorkCardType) {
  const { title, description, banner, createdAt, autor, link } = work;
  const toggleModal = useModalStore((state) => state.toggle);

  return (
    <div className="articleCard flex f-column">
      <div className="ac-top flex f-column">
        <img src={banner.url} alt="" />
        <b>{title}</b>
        <p>{description}</p>
        <Link href={link} target="_blank">
          Voir plus
        </Link>
      </div>
      {isManager && (
        <div className="ac-bottom flex">
          <Button
            variant="update"
            onClick={() =>
              toggleModal(<AOUWork refetch={refetch} work={work} />)
            }
          >
            Modifier
          </Button>
          <Button
            variant="delete"
            onClick={() =>
              deleteWork(work.id, () => {
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
