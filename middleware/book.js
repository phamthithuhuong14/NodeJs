import Joi from "joi";

const bookObject = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": " tên không để trống",
    "string.empty": "tên không đúng định dạng",
  }),
  price: Joi.number().required().empty().messages({
    "any.required": " giá không để trống",
    "number.empty": "giá không đúng định dạng",
  }),
  description: Joi.string().required().empty().messages({
    "any.required": " des không để trống",
    "string.empty": "des không đúng định dạng",
  }),
  image: Joi.string().required().empty().messages({
    "any.required": "ảnh không để trống",
    "string.empty": "ảnh không đúng định dạng",
  }),
  author: Joi.string().required().empty().messages({
    "any.required": "tác giả không để trống",
    "string.empty": "tác giả không đúng định dạng",
  }),
});
export const CheckBookValidate = (res, req, next) => {
  const { name, price, description, image, author } = req.body;
  const { error } = bookObject.validate({
    name,
    price,
    description,
    image,
    author,
  });
  console.log(error.details);
  if (error) {
    res.send({ status: false, message: error.message });
  } else {
    next();
  }
};
export default bookObject;
