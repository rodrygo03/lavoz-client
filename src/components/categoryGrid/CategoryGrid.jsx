import "./categoryGrid.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../hooks/useCategories";

const CategoryGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();

  if (isLoading || !categories || categories.length === 0) return null;

  const handleChange = (e) => {
    if (e.target.value) navigate(`/projects?category=${e.target.value}`);
  };

  return (
    <div className="category-grid">
      <div className="row">
        <span className="label">{t("taxonomy.browseBy")}</span>
        <select defaultValue="" onChange={handleChange}>
          <option value="" disabled>{t("taxonomy.selectCategory")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryGrid;
