"use client";
import { DataContainer } from "@/components/dataContainer";
import { AOUSkill, deleteSkill } from "@/components/skills/crud";
import useCustomQuery from "@/hooks/useQuery";
import useModalStore from "@/stores/modal";
import { Button } from "@/uikits/buttons";
import { DataSpinner } from "@/uikits/others";
import { Skills } from "@prisma/client";
import React from "react";

function ManageSkills() {
  const { data, isLoading, refetch } = useCustomQuery<Skills[]>("/api/skill");
  const toggleModal = useModalStore((state) => state.toggle);

  function showSkillPopup(skill?: Skills) {
    toggleModal(
      skill ? (
        <AOUSkill skill={skill} refetchSkills={refetch} />
      ) : (
        <AOUSkill refetchSkills={refetch} />
      )
    );
  }

  if (isLoading) return <DataSpinner />;
  return (
    <div>
      <DataContainer
        title="Gestion des competences"
        actionButton={
          <Button onClick={() => showSkillPopup()}>
            Ajouter une nouvelle competence
          </Button>
        }
      >
        {data && data.length > 0 ? (
          <>
            {data.map((item: Skills, i: number) => (
              <article key={"skill nb" + i} className="skillCard">
                <b>{item.name} </b>
                <div>
                  <img src={item.icon} alt={"icon de" + item.name} />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    showSkillPopup(item);
                  }}
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => {
                    deleteSkill(item.id, toggleModal, refetch);
                  }}
                >
                  Supprimer
                </Button>
              </article>
            ))}
          </>
        ) : (
          <p>Aucunes competences disponible</p>
        )}
      </DataContainer>
    </div>
  );
}

export default ManageSkills;
