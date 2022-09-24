import { HeadImageBlue, HeadImageMain } from "../../style-component/home/head";
import findsayimg from "../../assets/images/findsaylinkimage.svg";
import Besaylinkimg from "../../assets/images/Besaylinkimage.svg";
const HeadInfo = () => {
  return (
    <HeadImageMain>
      <HeadImageBlue src={findsayimg}></HeadImageBlue>
      <HeadImageBlue src={Besaylinkimg}></HeadImageBlue>
    </HeadImageMain>
  );
};
export default HeadInfo;
