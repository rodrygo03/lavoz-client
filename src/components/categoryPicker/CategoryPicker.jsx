import "./categoryPicker.scss";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../hooks/useCategories";

// value: array of selected subcategory ids. onChange: (nextIds) => void.
const CategoryPicker = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { data: categories, isLoading } = useCategories();
  const [categoryId, setCategoryId] = useState("");

  const selectedCategory = useMemo(
    () => categories?.find((c) => String(c.id) === String(categoryId)),
    [categories, categoryId]
  );

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    onChange([]);
  };

  const handleSubcategoryChange = (e) => {
    onChange(e.target.value ? [Number(e.target.value)] : []);
  };

  if (isLoading) return null;

  return (
    <div className="category-picker">
      <select value={categoryId} onChange={handleCategoryChange}>
        <option value="">{t("taxonomy.selectCategory")}</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {selectedCategory && selectedCategory.subcategories.length > 0 && (
        <select value={value[0] ?? ""} onChange={handleSubcategoryChange}>
          <option value="">{t("taxonomy.selectSubcategory")}</option>
          {selectedCategory.subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryPicker;
