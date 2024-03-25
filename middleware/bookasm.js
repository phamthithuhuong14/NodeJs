import Joi from "joi";

const postsasmObject = Joi.object({
  title: Joi.string().required().empty().messages({
    "any.required": " title này k có",
    "string.empty": "title không đúng định dạng",
  }),
  description: Joi.string().required().empty().messages({
    "any.required": " description không có",
    "string.empty": "description không đúng định dạng",
  }),
  image: Joi.string().required().empty().messages({
    "any.required": " image không có",
    "string.empty": "image không đúng định dạng",
  }),
  author: Joi.string().required().empty().messages({
    "any.required": " author không có",
    "string.empty": "author không đúng định dạng",
  }),
  category: Joi.number().required().empty().messages({
    "any.required": " category không có",
    "number.empty": "category không đúng định dạng",
  }),
});

export const CheckPostValidate = (req, res, next) => {
  const { title, description, image, author, category } = req.body;

  const { error } = postsasmObject.validate({
    title,
    description,
    image,
    author,
    category,
  });
  // console.log(error.details);
  if (error) {
    res.send({ status: false, message: error.message });
  } else {
    next();
  }
};
