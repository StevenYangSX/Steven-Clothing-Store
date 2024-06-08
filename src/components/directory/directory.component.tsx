import { Category } from "../../types/systemTypes";
import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
