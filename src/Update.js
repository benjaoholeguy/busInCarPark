import * as R from 'ramda';

const MSGS = {
  COMMAND_INPUT: 'COMMAND_INPUT',
  SAVE_COMMAND: 'SAVE_COMMAND'
}

export function commandInputMsg(command){
  return {
    type: MSGS.COMMAND_INPUT,
    command
  }
}

export const saveCommandMsg = { type: MSGS.SAVE_COMMAND };


/**
 * The update function
 * @param {String} msg indicates what interaction happens
 * @param {object} model current App model who potentialy could be changed based on the msg received
 *
 */

function update(msg, model){
  switch (msg.type) {
    case MSGS.COMMAND_INPUT: {
      const command = msg.command;
      return { ...model, command}
    }
    case MSGS.SAVE_COMMAND: {
      return add(msg, model);
    }
  }
  return model;
}

function add(msg, model){
  const {command} = model;
  const strcommand = {command};
  const movements = [...model.movements, strcommand];
  return {
    ...model,
    movements
  }
}

export default update;
