const strategies = {
  isNonEmpty (value, errorMsg) {
    if (value.trim() === '') return errorMsg
  },
  isValidEmail (value, errorMsg) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if (!reg.test(value)) return errorMsg
  },
  minLength (value, length, errorMsg) {
    if (value.length < length) return errorMsg
  },
  maxLength (value, length, errorMsg) {
    if (value.length > length) return errorMsg
  },
  isSame (value, errorMsg) {
    if (Array.isArray(value) && value[0] !== value[1]) return errorMsg
  }
}

class Validator {
  constructor () {
    this.cache = []
  }

  add (data, rule, errorMsg) {
    // 规则针对要传入自己额外规则参数的验证 我们规定用':' 分开
    // 因此需要对规则在进行拆分
    // const strategyArr = rule.split(':')
    this.cache.push(() => {
      const strategyArr = rule.split(':')
      const strategy = strategyArr.shift() // 取出校验名称
      // 分析策略中最特殊需要参数的方法function (value, length, errorMsg)
      // 经过上一步的操作 strategyArr 中只能有两种情况，一种是空数组，一种是有一个自己定义的验证判断规则参数
      strategyArr.unshift(data) // 放入待校验值
      strategyArr.push(errorMsg)
      return strategies[strategy].apply(data, strategyArr)
    })
  }

  run () {
    for (let i = 0; i < this.cache.length; i++) {
      const validatorFunc = this.cache[i]
      console.log(validatorFunc())
      const errorMsg = validatorFunc()
      if (errorMsg) return errorMsg
    }
  }
}

export function signInValidator (form) {
  const validator = new Validator()
  validator.add(form.email, 'isNonEmpty', '邮箱不能为空')
  validator.add(form.email, 'isValidEmail', '请输入合法的邮箱地址')
  validator.add(form.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(form.password, 'maxLength:12', '密码长度不能大于12位')
  return validator.run()
}

export function signUpValidator (form) {
  const validator = new Validator()
  validator.add(form.email, 'isNonEmpty', '邮箱不能为空')
  validator.add(form.email, 'isValidEmail', '请输入合法的邮箱地址')
  validator.add(form.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(form.password, 'maxLength:12', '密码长度不能大于12位')
  validator.add([form.password, form.confirm], 'isSame', '密码输入不一致')
  return validator.run()
}
