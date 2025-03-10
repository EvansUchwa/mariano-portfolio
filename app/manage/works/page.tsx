"use client";
import { DataContainer } from "@/components/dataContainer";
import { WorkCard } from "@/components/works/card";
import { AOUWork } from "@/components/works/crud";
import useCustomQuery from "@/hooks/useQuery";
import useModalStore from "@/stores/modal";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { Button } from "@/uikits/buttons";
import { DataSpinner } from "@/uikits/others";
import React from "react";

function WorkManager() {
  const { isLoading, data, refetch } = useCustomQuery<
    ArticleWithAutorAndBanner[] | []
  >("/api/work?all=true");
  const showModal = useModalStore((state) => state.toggle);

  function newWorkModal() {
    showModal(<AOUWork refetch={refetch} />);
  }

  if (isLoading) return <DataSpinner />;
  return (
    <div>
      <DataContainer
        title="Gestion des projets"
        actionButton={<Button onClick={newWorkModal}>Nouveau projet</Button>}
      >
        {!data || (data.length == 0 && <p>Aucun projet disponible</p>)}
        {data &&
          data.length > 0 &&
          data.map((item, i) => (
            <WorkCard
              refetch={refetch}
              key={"article nb" + i}
              work={item}
              isManager={true}
            />
          ))}
      </DataContainer>
    </div>
  );
}

export default WorkManager;
