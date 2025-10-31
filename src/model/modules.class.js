import Module from "./module.class.js";
import {getDBModules} from '../services/api.js'

export default class Modules{
    constructor(){
        this.data = [];
    }

    async populate(){
            const modules = await getDBModules();
            modules.forEach(module => {
                let moduloAIntroducir = new Module(module.code, module.cliteral, module.vliteral, module.courseId);
                this.data.push(moduloAIntroducir);
            });
        }
}