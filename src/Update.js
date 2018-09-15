import * as R from 'ramda';

const MSGS = {
  COMMAND_INPUT: 'COMMAND_INPUT',
  SAVE_COMMAND: 'SAVE_COMMAND',
  SAVE_PARAMETERS: 'SAVE_PARAMETERS',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_SOUTH: 'MOVE_SOUTH',
  MOVE_WEST: 'MOVE_WEST',
  MOVE_EAST: 'MOVE_EAST',
  TURN_LEFT: 'TURN_LEFT',
  TURN_RIGHT: 'TURN_RIGHT',
  ERROR: 'ERROR',
  REPORT: 'REPORT'

}

/**
 * Update function
 * evaluates the messages
 * @param {Array} parameters of command place
 * @param {object} model current App model who potentialy could be changed based on the msg received
 */
export function saveParametersMsg(model, parameters){
  // console.log(parameters);
  const posx = R.pipe(
    parseInt,
    R.defaultTo(0),
  )(parameters[0]);

  const posy = R.pipe(
    parseInt,
    R.defaultTo(0),
  )(parameters[1]);

  const face = R.pipe(
    faceConvertToNumber,
  )(parameters[2]);
  if ((0 <= posx && posx < 5) &&
    (0 <= posy && posy < 5) &&
    (1 <= face && face < 5)
    ){
      const carpark = matrix(posx, posy, model.face);
      return {
        type: MSGS.SAVE_PARAMETERS,
        posx,
        posy,
        carpark,
        face
      }
  }else{
    return {
      type: MSGS.ERROR,
      error: 'Wrong params of Place command. Eg. Place 1 1 north'
    }
  }

}

function matrix(posx, posy, face){
  var carpark = [
    {col1: '', col2: '', col3: '', col4: '', col5: ''},
    {col1: '', col2: '', col3: '', col4: '', col5: ''},
    {col1: '', col2: '', col3: '', col4: '', col5: ''},
    {col1: '', col2: '', col3: '', col4: '', col5: ''},
    {col1: '', col2: '', col3: '', col4: '', col5: ''}
  ];
  if (face === 1){
    var car = '^';
  }
  if (face === 2){
    var car = '>';
  }
  if (face === 3){
    var car = 'v';
  }
  if (face === 4){
    var car = '<';
  }
  switch (posx) {
    case 0:
      carpark[4-posy].col1 = 'x';
      return carpark;
      break;
    case 1:
      carpark[4-posy].col2 = 'x';
      return carpark;
      break;
    case 2:
      carpark[4-posy].col3 = 'x';
      return carpark;
      break;
    case 3:
      carpark[4-posy].col4 = 'x';
      return carpark;
      break;
    case 4:
      carpark[4-posy].col5 = 'x';
      return carpark;
      break;
    default:

  }

}

export function commandInputMsg(command){

  return {
    type: MSGS.COMMAND_INPUT,
    command,
  }
}

export const errorMsg = { type: MSGS.ERROR };


export function leftMsg(model){
    if (model.face === ""){
      return {
        type: MSGS.ERROR,
      }
    }
    const face = R.pipe(
      turnLeft,
    )(model.face);
    return {
      type: MSGS.TURN_LEFT,
      face,
      command: ''
    }
}

export function rightMsg(model){
    if (model.face === ""){
      return {
        type: MSGS.ERROR,
      }
    }
    const face = R.pipe(
      turnRight,
    )(model.face);
    return {
      type: MSGS.TURN_RIGHT,
      face,
      command: ''
    }
}

export function reportMsg(model){
  if (model.face === ""){
    return {
      type: MSGS.ERROR,
    }
  }
  const report = model.posx + ' ' + model.posy + ' ' + numberConvertToFace(model.face)
  return {
    type: MSGS.REPORT,
    report
  }
}

export function moveMsg(model){
  if (model.face===3 && model.posy > 0){
    const posy = model.posy - 1;
    const carpark = matrix(model.posx, posy, model.face);
    return {
      type: MSGS.MOVE_SOUTH,
      carpark,
      posy,
      command: ''
    }
  } else if (model.face===1 && model.posy < 4){
    const posy = model.posy + 1;
    const carpark = matrix(model.posx, posy, model.face);
    return {
      type: MSGS.MOVE_NORTH,
      carpark,
      posy,
      command: ''
    }
  } else if (model.face===2 && model.posx < 4){
    const posx = model.posx + 1;
    const carpark = matrix(posx, model.posy, model.face);

    return {
      type: MSGS.MOVE_EAST,
      carpark,
      posx,
      command: ''
    }
  } else if (model.face===4 && model.posx > 0){
    const posx = model.posx - 1;
    const carpark = matrix(posx, model.posy, model.face);
    return {
      type: MSGS.MOVE_WEST,
      carpark,
      posx,
      command: ''
    }
  } else{
      return {
        type: MSGS.ERROR,
      }
    }

}

export const saveCommandMsg = { type: MSGS.SAVE_COMMAND };


/**
 * Update function
 * evaluates the messages
 * @param {String} msg indicates what interaction happens
 * @param {object} model current App model who potentialy could be changed based on the msg received
 */
function update(msg, model){
  switch (msg.type) {
    case MSGS.COMMAND_INPUT: {
      const {command} = msg;
      return { ...model, command, report:'', error: ''}
    }
    case MSGS.SAVE_COMMAND: {
      const {command} = model;
      const commands = [...model.commands, command];
      return {
        ...model,
        commands,
        command: ''
      }
    }
    case MSGS.SAVE_PARAMETERS: {
      const {posx, posy, face, carpark} = msg;
      return {
        ...model,
        posx,
        posy,
        face,
        carpark,
        command: ''
      };
    }
    case MSGS.MOVE_NORTH: {
      const {posy, carpark} = msg;
      return {
        ...model,
        carpark,
        posy,
        command: ''
      };
    }
    case MSGS.MOVE_SOUTH: {
      const {posy, carpark} = msg;
      return {
        ...model,
        carpark,
        posy,
        command: ''
      };
    }
    case MSGS.MOVE_WEST: {
      const {posx, carpark} = msg;
      return {
        ...model,
        carpark,
        posx,
        command: ''
      };
    }
    case MSGS.MOVE_EAST: {
      const {posx, carpark} = msg;
      return {
        ...model,
        carpark,
        posx,
        command: ''
      }
    };
    case MSGS.TURN_LEFT: {
      const {face} = msg;
      return {
        ...model,
        face,
        command: ''
      }
    };
    case MSGS.TURN_RIGHT: {
      const {face} = msg;
      return {
        ...model,
        face,
        command: ''
      }
    };
    case MSGS.ERROR:{
      const {error} = msg;
      return {
        ...model,
        error: error || 'Wrong Command',
        command: ''

      }
    };
    case MSGS.REPORT:{
      const {report} = msg;
      return {
        ...model,
        command:'',
        report: report || 'No data to report'

      }
    }
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
      return false;
      break;
  }
}

function numberConvertToFace(num){
  switch (num) {
    case 1:
      return 'NORTH';
      break;
    case 2:
      return 'EAST';
      break;
    case 3:
      return 'SOUTH';
      break;
    case 4:
      return 'WEST';
      break;
    default:
      return false;
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

export default update;
