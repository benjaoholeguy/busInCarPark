import * as R from 'ramda';

const MSGS = {
  COMMAND_INPUT: 'COMMAND_INPUT',
  SAVE_COMMAND: 'SAVE_COMMAND',
  SAVE_POSSITION: 'SAVE_POSSITION',
  CHANGE_POSSITION: 'CHANGE_POSSITION'
}

export function commandInputMsg(command){
  return {
    type: MSGS.COMMAND_INPUT,
    command
  }
}

export function savePositionMsg(command){
  return {
    type: MSGS.SAVE_POSSITION,
    command
  }
}

// export const saveCommandMsg = { type: MSGS.SAVE_COMMAND };
export function saveCommandMsg(command) {
  return {
    type: MSGS.SAVE_COMMAND,
    command
  }
}

export function changePossitionMsg(posId){
  return {
    type: MSGS.CHANGE_POSSITION,
    posId
  }
}



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
    // case MSGS.SAVE_POSSITION: {
    //   return add(msg, model);
    // }
  }
  return model;
}

function faceConvertToNumber(str){
  switch (str.toLowerCase()) {
    case 'north':
      return 1;
      break;
    case 'east':
      return 2;
      break;
    case 'south':
      return 3;
      break;
    case 'west':
      return 4;
      break;
    default:
      break;
  }
}

function turnLeft(face){
  switch (face) {
    case 1:
      return 4;
      break;
    case 2:
      return 1;
      break;
    case 3:
      return 2;
      break;
    case 4:
      return 3;
      break;
    default:

  }
}


function turnRight(face){
  switch (face) {
    case 1:
      return 2;
      break;
    case 2:
      return 3;
      break;
    case 3:
      return 4;
      break;
    case 4:
      return 1;
      break;
    default:

  }
}

function add(msg, model){
  const {command} = msg;

  let words = command.split(' ');
  // let words = R.split(' ', words);
  switch (words[0].toLowerCase()) {
    case 'place':
      // console.log('place');
      if (words.length!==4){
        console.log('place command wrong parameters');
        break;
      } else {
        if ((0 <= words[1] && words[1] < 5) &&
        (0 <= words[2] && words[2] < 5) &&
        (words[3].toLowerCase() === 'north' || words[3].toLowerCase() === 'south'
        || words[3].toLowerCase() === 'east' || words[3].toLowerCase() === 'west')){
          // const posx = words[1] || model.posy;
          const posx = R.pipe(
            parseInt,
            R.defaultTo(0),
          )(words[1]);
          const posy = R.pipe(
            parseInt,
            R.defaultTo(0),
          )(words[2]);
          // const face = words[3];
          const face = R.pipe(
            faceConvertToNumber,
          )(words[3]);
          const movements = [...model, command];
          return {
            ...model,
            movements,
            posx,
            posy,
            face
          }
        }else{
          console.log('Place. wrong command. Eg: Place 1 3 north');
        }
      }
      break;
    case 'move':
      console.log('move');
      if (model.face===3 && model.posy < 4){
        const posy = model.posy + 1;
        return {
          ...model,
          posy
        }
      }
      if (model.face===1 && model.posy > 0){
        const posy = model.posy - 1;
        return {
          ...model,
          posy
        }
      }
      break;
    case 'left':
      console.log('left');
      if (model.command==='left'){
        const face = R.pipe(
          turnLeft,
        )(model.face);
        return {
          ...model,
          face
        }
      }
      break;
    case 'right':
      console.log('right');
      if (model.command==='right'){
        const face = R.pipe(
          turnRight,
        )(model.face);
        return {
          ...model,
          face
        }
      }
      break;
    default:
      console.log('wrong command');
      break;

  }
  // const posx = words[1] || model.posx;
  // const posy = words[2] || model.posy;
  // const face = words[3] || model.face;
  //
  //
  // const movements = [...model, command];
  // return {
  //   ...model,
  //   movements,
  //   posx,
  //   posy,
  //   face,
  //   // carpark
  // }
  return model;
}

export default update;
