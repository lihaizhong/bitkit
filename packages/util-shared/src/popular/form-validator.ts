export interface IFormRule {
  rule: boolean | (() => boolean)
  message: string
}

export async function formValidate(schema: IFormRule[] = []) {
  try {
    let error = "form error"
    const isValidForm = schema.every((item: IFormRule) => {
      const { rule, message } = item

      if ((typeof rule === "function" && rule()) || rule) {
        return true
      }

      if (typeof message === "string" && message !== "") {
        error = message
      }

      return false
    });

    return Promise.resolve({
      valid: isValidForm,
      error: isValidForm ? null : error,
    })
  } catch (ex) {
    return Promise.reject(ex)
  }
}
