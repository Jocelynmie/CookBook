// import { useState } from "react";
// import "./AddRecipeForm.css";
// import PropTypes from "prop-types";

// import IngredientInput from "./IngredientInput"; // 导入 IngredientInput 组件

// function AddRecipeForm({ onRecipeAdded }) {
//   const [recipeData, setRecipeData] = useState({
//     name: "",
//     description: "",
//     cookTime: 30,
//     ingredients: [{ name: "", amount: "", unit: "" }],
//   });

//   const handleIngredientChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedIngredients = [...recipeData.ingredients];
//     updatedIngredients[index] = {
//       ...updatedIngredients[index],
//       [name]: value,
//     };
//     setRecipeData({
//       ...recipeData,
//       ingredients: updatedIngredients,
//     });
//   };

//   const addIngredient = () => {
//     setRecipeData({
//       ...recipeData,
//       ingredients: [
//         ...recipeData.ingredients, //copy before
//         { name: "", amount: "", unit: "" }, //add new one(empty)
//       ],
//     });
//   };

//   //   const removeIngredient = (index) => {
//   //     const updatedIngredients = recipeData.ingredients.filter(
//   //       (element, i) => i !== index
//   //     ); //need to be saved

//   //     setRecipeData({
//   //       ...recipeData,
//   //       ingredients: updatedIngredients,
//   //     });
//   //   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // data ready for submit
//       const recipeToSubmit = {
//         ...recipeData,
//         cookTime: parseInt(recipeData.cookTime, 10) || 0,
//       };

//       // send to backend api (router.post("/recipes", async (req, res)....)
//       //add new recipe
//       const response = await fetch("/api/recipes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(recipeToSubmit),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add recipe");
//       }

//       const result = await response.json();
//       console.log("Recipe added successfully:", result);

//       setRecipeData({
//         name: "",
//         description: "",
//         cookTime: 30,
//         ingredients: [{ name: "", amount: "", unit: "" }],
//       });

//       alert("Recipe added successfully!");
//       if (onRecipeAdded) {
//         onRecipeAdded();
//       }

//       //get all recipes
//     } catch (error) {
//       console.error("Error submitting recipe:", error);
//       alert("Failed to add recipe: " + error.message);
//     }
//   };

//   return (
//     <div className="add-recipe-form-container">
//       <div className="add-recipe-form-header">
//         <h3>Add New Recipe</h3>
//       </div>

//       <form className="recipe-form" onSubmit={handleSubmit}>
//         {/* recipe name */}
//         <div className="form-group">
//           <label htmlFor="name">Name:*</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={recipeData.name}
//             onChange={(e) =>
//               setRecipeData({ ...recipeData, name: e.target.value })
//             }
//             required
//           />
//         </div>

//         {/* description */}
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             rows="3"
//             value={recipeData.description}
//             onChange={(e) =>
//               setRecipeData({ ...recipeData, description: e.target.value })
//             }
//           />
//         </div>

//         {/* cooktime */}
//         <div className="form-group">
//           <label htmlFor="cookTime">CookTime (mins)*</label>
//           <input
//             type="number"
//             id="cookTime"
//             name="cookTime"
//             min="1"
//             value={recipeData.cookTime}
//             onChange={(e) =>
//               setRecipeData({ ...recipeData, cookTime: e.target.value })
//             }
//             required
//           />
//         </div>

//         {/* image */}
//         <div className="form-group">
//           <label htmlFor="image">Recipe Image</label>
//           <input type="file" id="image" name="image" accept="image/*" />
//         </div>

//         {/* ingredient */}
//         <div className="form-group ingredients-section">
//           <label>Ingredients*</label>

//           {recipeData.ingredients.map((ingredient, index) => (
//             <IngredientInput
//               key={index}
//               ingredient={ingredient}
//               index={index}
//               onChange={handleIngredientChange}
//             />
//           ))}

//           {/* button for adding ingredient */}
//           <button
//             type="button"
//             className="add-ingredient-btn"
//             onClick={addIngredient}
//           >
//             + Add Ingredient
//           </button>
//         </div>

//         {/* form btn */}
//         <div className="form-actions">
//           <button type="button" className="cancel-btn">
//             Cancel
//           </button>
//           <button type="submit" className="submit-btn">
//             Add Recipe
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddRecipeForm;

// AddRecipeForm.propTypes = {
//   onRecipeAdded: PropTypes.func,
// };
import { useState } from "react";
import "./AddRecipeForm.css";
import PropTypes from "prop-types";
import IngredientInput from "./IngredientInput";

function AddRecipeForm({ onRecipeAdded }) {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    cookTime: 30,
    ingredients: [{ name: "", amount: "", unit: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setRecipeData({
      ...recipeData,
      ingredients: updatedIngredients,
    });
  };

  const addIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [
        ...recipeData.ingredients,
        { name: "", amount: "", unit: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    if (recipeData.ingredients.length <= 1) {
      return;
    }

    const updatedIngredients = recipeData.ingredients.filter(
      (_, i) => i !== index
    );

    setRecipeData({
      ...recipeData,
      ingredients: updatedIngredients,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    // 重置表单
    setRecipeData({
      name: "",
      description: "",
      cookTime: 30,
      ingredients: [{ name: "", amount: "", unit: "" }],
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 准备要提交的食谱数据
      const recipeToSubmit = {
        ...recipeData,
        cookTime: parseInt(recipeData.cookTime, 10) || 0,
      };

      // 如果有图片，先上传图片
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const imageResult = await imageResponse.json();
        recipeToSubmit.imageUrl = imageResult.imageUrl;
      }

      // 发送到后端API添加新食谱
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const result = await response.json();
      console.log("Recipe added successfully:", result);

      // 重置表单
      setRecipeData({
        name: "",
        description: "",
        cookTime: 30,
        ingredients: [{ name: "", amount: "", unit: "" }],
      });
      setImageFile(null);

      // 显示成功通知
      setNotification({
        show: true,
        message: "Recipe added successfully!",
        type: "success",
      });

      // 通知父组件
      if (onRecipeAdded) {
        onRecipeAdded();
      }

      // 3秒后隐藏通知
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting recipe:", error);

      // 显示错误通知
      setNotification({
        show: true,
        message: `Failed to add recipe: ${error.message}`,
        type: "error",
      });

      // 3秒后隐藏通知
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-recipe-form-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="add-recipe-form-header">
        <h3>Add New Recipe</h3>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        {/* 食谱名称 */}
        <div className="form-group">
          <label htmlFor="name">Name:*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipeData.name}
            onChange={(e) =>
              setRecipeData({ ...recipeData, name: e.target.value })
            }
            required
          />
        </div>

        {/* 描述 */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
          />
        </div>

        {/* 烹饪时间 */}
        <div className="form-group">
          <label htmlFor="cookTime">CookTime (mins)*</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            min="1"
            value={recipeData.cookTime}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cookTime: e.target.value })
            }
            required
          />
        </div>

        {/* 图片 */}
        <div className="form-group">
          <label htmlFor="image">Recipe Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && (
            <div className="image-preview">
              <p>Selected image: {imageFile.name}</p>
            </div>
          )}
        </div>

        {/* 配料 */}
        <div className="form-group ingredients-section">
          <label>Ingredients*</label>

          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <IngredientInput
                ingredient={ingredient}
                index={index}
                onChange={handleIngredientChange}
              />
              {recipeData.ingredients.length > 1 && (
                <button
                  type="button"
                  className="remove-ingredient-btn"
                  onClick={() => removeIngredient(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          {/* 添加配料按钮 */}
          <button
            type="button"
            className="add-ingredient-btn"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>

        {/* 表单按钮 */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}

AddRecipeForm.propTypes = {
  onRecipeAdded: PropTypes.func,
};

export default AddRecipeForm;
