const validateRegisterInput = ({ username, email, password, confirm }) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username is empty";
  }

  if (!email.includes("@")) {
    errors.email = "email type is wrong";
  }

  if (email.trim() === "") {
    errors.email = "email is empty";
  }

  if (password.trim() === "") {
    errors.password = "password is empty";
  }

  if (confirm.trim() == "") {
    errors.confirm = "confirm is empty";
  }

  if (password.trim() !== confirm.trim()) {
    errors.confirm = "confirm and password does not match,";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = ({ username, password }) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username is empty";
  }

  if (password.trim() === "") {
    errors.password = "password is empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateArticleInput = ({ article }) => {
  const errors = {};

  if (article.trim() === "") {
    errors.article = "article is empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateArticleInput,
};
