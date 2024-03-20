import Joi from "joi";

const productObject = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "tên không để trống",
    "string.empty": "tên không đúng định dạng",
  }),
  image: Joi.string().required().empty().messages({
    "any.required": "ảnh không để trống",
    "string.empty": "ảnh không đúng định dạng",
  }),
  price: Joi.number().required().min(1000).messages({
    "any.required": "giá không để trống",
    "number.min": "giá sp không nhỏ hơn 1000",
  }),
});

export const CheckProductValidate = (req, res, next) => {
  const { name, image, price } = req.body;
  const { error } = productObject.validate({ name, image, price });
  console.log(error.details);
  if (error) {
    res.send({ status: false, message: error.message });
  } else {
    next();
  }
};

export default productObject;
