import React from "react";
import ContentInfo from "../../pages/home/content";
import EventInfo from "../../pages/home/event";
import HeadInfo from "../../pages/home/head";
import InterestInfo from "../../pages/home/mygroup";
import CategorySidebar from "../../pages/home/sidebar";
import {
  ContentWrapperHome,
  HomeEvent,
  HomeWrapper,
} from "../../style-component/home/home";
import NavbarComponent from "../general/navbar";

const HomeComponent = () => {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <HomeWrapper>
        <div>
          <CategorySidebar></CategorySidebar>
        </div>
        <ContentWrapperHome>
          <HeadInfo></HeadInfo>
          <ContentInfo></ContentInfo>
        </ContentWrapperHome>
        <HomeEvent>
          <EventInfo></EventInfo>
          <InterestInfo></InterestInfo>
        </HomeEvent>
      </HomeWrapper>
    </div>
  );
};
export default HomeComponent;
