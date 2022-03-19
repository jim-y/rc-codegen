// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { parse, join } = require('path')
const changeCase = require('change-case')
const { upperCaseFirst } = require('upper-case-first')

module.exports = {
  prompt: async ({ prompter, args }) => {
    let nameInput = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: "What's your provider's name?"
    })

    const { ext, name } = parse(nameInput.name);
    let extensionInput;

    if (ext === '') {
      extensionInput = await prompter.prompt({
        type: 'select',
        name: 'extension',
        message: `What javascript flavor do you want use?`,
        choices: ['.jsx', '.tsx']
      })
    } else {
      extensionInput = { extension: ext };
    }

    nameInput = { name: changeCase.pascalCase(name) };

    let stateInput = await prompter.prompt({
      type: 'select',
      name: 'stateContainer',
      message: "What kind of state container?",
      choices: ['useState', 'useReducer', 'none']
    })

    let pathInput = {
      path: `src/providers/${nameInput.name}${extensionInput.extension}`
    }

    const outputConfirmation = await prompter.prompt({
      type: 'confirm',
      name: 'ok',
      message: `Outfile: ${pathInput.path}`
    })
     
    if (!outputConfirmation.ok) {
      const outPath = await prompter.prompt({
        type: 'input',
        name: 'path',
        message: `Please provide a path for ${nameInput.name}${extensionInput.extension}`
      })
      pathInput.path = `${join(outPath.path, nameInput.name + extensionInput.extension)}`
    }

    return {
      contextName: upperCaseFirst(changeCase.noCase(nameInput.name).split(" ")[0]),
      ...nameInput,
      ...extensionInput,
      ...pathInput,
      ...stateInput
    }
  }
}