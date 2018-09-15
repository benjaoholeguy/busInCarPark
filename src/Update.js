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
      // saveInCarpark(model, posx, posy);
      // const {carpark}=model;
      // console.log(carpark);
      // let carpark = [
      //   {col1: '', col2: '', col3: '', col4: '', col5: ''},
      //   {col1: '', col2: '', col3: '', col4: '', col5: ''},
      //   {col1: '', col2: '', col3: '', col4: '', col5: ''},
      //   {col1: '', col2: '', col3: '', col4: '', col5: ''},
      //   {col1: '', col2: '', col3: '', col4: '', col5: ''}
      // ];
      // carpark[posy].col1 = 'w';
      return {
        type: MSGS.SAVE_PARAMETERS,
        posx,
        posy,
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
  let carpark = [
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
      carpark[posy].col1 = car;
      return carpark;
      break;
    case 1:
      carpark[posy].col2 = car;
      return carpark;
      break;
    case 2:
      carpark[posy].col3 = car;
      return carpark;
      break;
    case 3:
      carpark[posy].col4 = car;
      return carpark;
      break;
    case 4:
      carpark[posy].col5 = car;
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
  if (model.command==='right'){
    const face = R.pipe(
      turnRight,
    )(model.face);
    return {
      type: MSGS.TURN_RIGHT,
      face,
      command: ''
    }
  }
}

export function reportMsg(model){
  const report = model.posx + ' ' + model.posy + ' ' + numberConvertToFace(model.face)
  return {
    type: MSGS.REPORT,
    report
  }
}

export function moveMsg(model){

  if (model.face===3 && model.posy > 0){
    const posy = model.posy - 1;
    return {
      type: MSGS.MOVE_SOUTH,
      posy,
      command: ''
    }
  } else if (model.face===1 && model.posy < 4){
    const posy = model.posy + 1;
    return {
      type: MSGS.MOVE_NORTH,
      posy,
      command: ''
    }
  } else if (model.face===2 && model.posx < 4){
    const posx = model.posx + 1;

    return {
      type: MSGS.MOVE_EAST,
      posx,
      command: ''
    }
  } else if (model.face===4 && model.posx > 0){
    const posx = model.posx - 1;
    return {
      type: MSGS.MOVE_WEST,
      posx,
      command: ''
    }
  } else{
      return {
        type: MSGS.ERROR,
        error: 'Cant move outside the carpark'
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
  console.log(msg.type);
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
      const {posx, posy, face} = msg;
      return {
        ...model,
        posx,
        posy,
        face,
        command: ''
      };
    }
    case MSGS.MOVE_NORTH: {
      const {posy} = msg;
      return {
        ...model,
        posy,
        command: ''
      };
    }
    case MSGS.MOVE_SOUTH: {
      const {posy} = msg;
      return {
        ...model,
        posy,
        command: ''
      };
    }
    case MSGS.MOVE_WEST: {
      const {posx} = msg;
      return {
        ...model,
        posx,
        command: ''
      };
    }
    case MSGS.MOVE_EAST: {
      const {posx} = msg;
      return {
        ...model,
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
