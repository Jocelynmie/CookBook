// 定义应用中使用的数据模型接口

/**
 * 食材接口
 * @typedef {Object} Ingredient
 * @property {string} name - 食材名称
 * @property {number} amount - 食材数量
 * @property {string} unit - 单位(个、克、汤匙等)
 */

/**
 * 菜谱接口
 * @typedef {Object} Recipe
 * @property {string} _id - 菜谱ID (MongoDB自动生成)
 * @property {string} name - 菜谱名称
 * @property {string} description - 菜谱描述
 * @property {number} cookTime - 烹饪时间(分钟)
 * @property {Array<Ingredient>} ingredients - 食材列表
 * @property {string} [instructions] - 制作步骤(可选)
 * @property {Date} createdAt - 创建时间
 * @property {Date} [updatedAt] - 更新时间(可选)
 */

/**
 * 菜单计划接口
 * @typedef {Object} MealPlan
 * @property {string} _id - 菜单计划ID (MongoDB自动生成)
 * @property {string} name - 菜单计划名称
 * @property {Array<string>} recipeIds - 菜谱ID列表
 * @property {Date} createdAt - 创建时间
 * @property {Date} [updatedAt] - 更新时间(可选)
 */

/**
 *
 * @typedef {Object} ShoppingItem
 * @property {string} name
 * @property {number} totalAmount
 * @property {string} unit
 * @property {boolean} checked
 */
