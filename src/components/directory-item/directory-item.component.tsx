import { useNavigate } from "react-router-dom";
import { Category } from "../../types/systemTypes";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }: { category: Category }) => {
  const { imageUrl, title } = category;

  const navigateTo = useNavigate();
  return (
    <div className="directory-item-container" onClick={() => navigateTo(`/shop/${title}`)}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
