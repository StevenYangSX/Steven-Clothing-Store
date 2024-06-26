import { Category } from "../../types/systemTypes";
import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
