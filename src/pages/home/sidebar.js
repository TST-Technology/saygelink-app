import {
  ButtonWithCategory,
  CategoryCard,
  CategoryText,
  IconArrow,
} from "../../style-component/home/sidebar";
import ArrowIcon from "../../assets/images/IconArrow.svg";
import CONSTANT from "../../utils/constants";

const CategorySidebar = () => {
  return (
    <CategoryCard>
      <CategoryText>Category</CategoryText>
      <hr></hr>
      {CONSTANT.CATEGORY_DATA.map((category) => (
        <ButtonWithCategory>
          {category.name}
          <IconArrow src={ArrowIcon}></IconArrow>
        </ButtonWithCategory>
      ))}
    </CategoryCard>
  );
};
export default CategorySidebar;
