export function formValidate(schema = []) {
  return new Promise((resolve, reject) => {
    try {
      let error = "表单错误";
      const isValidForm = schema.every((item) => {
        const { rule, message } = item;

        if ((typeof rule === "function" && rule()) || rule) {
          return true;
        }

        if (typeof message === "string" && message !== "") {
          error = message;
        }

        return false;
      });

      resolve({
        valid: isValidForm,
        error: isValidForm ? null : error,
      });
    } catch (ex) {
      reject(ex);
    }
  });
}
