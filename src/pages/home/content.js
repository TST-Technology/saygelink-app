import CONSTANT from "../../utils/constants";
import {
  CatIconWrapper,
  ChatIconWrapper,
  Contentblock,
  ContentCard,
  ContentContainer,
  ContentMainWrapper,
  ContentPink,
  ContentText,
  ContentTextChat,
  ContentTextmessage,
  DescriptionContainer,
  HeadCardText,
} from "../../style-component/home/content";
import Catimage from "../../assets/images/CatImage.svg";
const ContentInfo = () => {
  return (
    <ContentCard>
      <HeadCardText>HPM Happenings</HeadCardText>
      {CONSTANT.CONTENT_DATA.map((data) => (
        <>
          <hr></hr>
          <ContentMainWrapper>
            <ContentContainer>
              <ChatIconWrapper src={data.img}></ChatIconWrapper>
              <Contentblock>
                <ContentText>{data.name}</ContentText>
                <ContentTextmessage>{data.textjust}</ContentTextmessage>
              </Contentblock>
            </ContentContainer>
            <div>
              <ContentPink>{data.textbutton}</ContentPink>
            </div>
          </ContentMainWrapper>
          <DescriptionContainer>
            <ContentTextChat>{data.textdescription}</ContentTextChat>
          </DescriptionContainer>
        </>
      ))}
      <CatIconWrapper src={Catimage}></CatIconWrapper>
    </ContentCard>
  );
};
export default ContentInfo;
