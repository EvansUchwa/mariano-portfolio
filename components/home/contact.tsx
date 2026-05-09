import React from "react";
import { MyContactInformationList, SectionTitleAndSubTitle } from "../others";
import { ProfileUserProps } from "@/app/page";

function HomeContact({ user }: ProfileUserProps) {
  return (
    <div className="home-contact" id="contact">
      <SectionTitleAndSubTitle
        title="Contact"
        subTitle="Prenons contact pour discuter de vos projets"
      />

      <div className="hc-formAndInfos flex f-wrap">
        <form action="">
          <div className="formField">
            <label htmlFor="">Nom complet</label>
            <input type="text" placeholder="Sourou Feat Chinese" />
          </div>
          <div className="formField">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="iluvchinese@kawai.fr" />
          </div>
          <div className="formField">
            <label htmlFor="">Message</label>
            <textarea
              name="message"
              placeholder="Why do you love jeuns?"
            ></textarea>
          </div>
        </form>
        <div>
          <MyContactInformationList user={user} />
        </div>
      </div>
    </div>
  );
}

export default HomeContact;
