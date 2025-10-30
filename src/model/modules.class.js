import Module from "./module.class.js";

export default class Modules {
  constructor() {
    this.data = [];
  }

  populate(data) {
    this.data = data.map(
      (item) =>
        new Module(item.code, item.cliteral, item.vliteral, item.courseId)
    );
  }

  toString() {
    let text = `Modules: ${this.data.length}`;
    this.data.forEach((item) => {
      text += `\n${item.toString()}`;
    });

    return text;
  }

/**
 * Devuelve el array de módulos
 * @returns {Array}
 */
getModules() {
  return this.data;
}

/**
 * Devuelve un módulo buscando por su CÓDIGO
 * @param {string} code 
 * @returns {object}
 */
getModuleByCode(code) {
  
  return this.data.find(module => module.code === code);
}
}