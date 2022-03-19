// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { parse, join } = require('path')

module.exports = {
  prompt: async ({ prompter, args }) => {
    let nameInput = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: "What's your hook's name?"
    })

    const { ext, name } = parse(nameInput.name);
    let extensionInput;

    if (ext === '') {
      extensionInput = await prompter.prompt({
        type: 'select',
        name: 'extension',
        message: `What javascript flavor do you want use?`,
        choices: ['.js', '.ts']
      })
    } else {
      extensionInput = { extension: ext };
      nameInput = { name: name };
    }

    let pathInput = {
      path: `src/hooks/${nameInput.name}${extensionInput.extension}`
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
      ...nameInput,
      ...extensionInput,
      ...pathInput
    }
  }
}