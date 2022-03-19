#!/usr/bin/env node
'use strict'

const { runner, Logger, availableActions } = require('hygen')
const chalk = require('chalk')
const path = require('path')
const { AutoComplete, Select } = require('enquirer')

const defaultTemplates = path.join(__dirname, '_templates')
const actions = availableActions(defaultTemplates)

// We don't want to "leak" hygen commands to generate generators
if (actions.generator) delete actions.generator
if (actions.init) delete actions.init

function runHygen(command) {
    runner(command, {
        templates: defaultTemplates,
        cwd: process.cwd(),
        logger: new Logger(console.log.bind(console)),
        createPrompter: () => require('enquirer'),
        exec: (action, body) => {
            const opts = body && body.length > 0 ? { input: body } : {}
            return require('execa').shell(action, opts)
        },
        debug: !!process.env.DEBUG,
    })
}

async function run() {
    try {
        const commandsPrompt = new AutoComplete({
            name: 'generator',
            message: 'What do you want to generate?',
            choices: Object.keys(actions),
        })
        const command = await commandsPrompt.run()

        if (actions[command].length > 0) {
            const subcommandsPrompt = new Select({
                name: 'generator',
                message: `What kind of ${chalk.magenta(
                    command
                )} do you want to generate?`,
                choices: actions[command],
            })
            try {
                const subcommand = await subcommandsPrompt.run()
                runHygen(`${command} ${subcommand}`)
            } catch (error) {
                console.error(error)
            }
        } else {
            runHygen(command)
        }
    } catch (error) {
        console.error(error)
    }
}
run()
