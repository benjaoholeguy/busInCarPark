import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';
import {
  commandInputMsg,
  saveCommandMsg,
  saveParametersMsg,
  moveMsg,
  leftMsg,
  rightMsg,
  errorMsg,
  reportMsg

} from './Update';

import * as R from 'ramda';


/* unpack pre, div ... functions from hyperscript-helpers library
* creates the pre tag useful for pre formating text
*/
const {pre, div, h1, button, form, label, input, table, thead, tbody, tr, th, td} = hh(h);

function cell(tag, className, value){
  return tag({className}, value)
}

function carparkRow(dispatch, className, carpark){
  return tr({ className }, [
    cell(td, 'pa2 ba w-10 h3 tc', carpark.cel1),
    cell(td, 'pa2 ba w-10 h3 tc', carpark.cel2),
    cell(td, 'pa2 ba w-10 h3 tc', carpark.cel3),
    cell(td, 'pa2 ba w-10 h3 tc', carpark.cel4),
    cell(td, 'pa2 ba w-10 h3 tc', carpark.cel5),
  ])
}

function carparkBody(dispatch, className, carpark){
  // console.log(carpark);
  const rows = R.map(
    R.partial(carparkRow, [dispatch, '']),
    carpark
  )
  return tbody({className}, rows);
}

function tableView(dispatch, carpark){
  return table({ className: 'mv2 w-100 collapse' }, [
    carparkBody(dispatch, '', carpark),
  ])
}

//impure code below

/**
 * The view function
 * @param {object} dispatch CarPark's config
 * @param {object} model CarPark's config
 * @constructor
 */
 function fieldSet(labelText, inputValue, oninput){
   return div([
     label({className: 'db mb1'}, labelText),
     input({
       className: 'pa2 input-reset ba w-100 mb2',
       type: 'text',
       value: inputValue,
       oninput
     })
   ])
 }

 /**
  * The view function
  * @param {object} dispatch CarPark's config
  * @param {object} model CarPark's config
  * @constructor
  */
function buttonSet(dispatch){
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-light-blue white bn mr2 dim',
        type: 'submit',
      },
      'Run',
    )
  ])
}


/**
 * The view function
 * @param {object} dispatch CarPark's config
 * @param {object} model CarPark's config
 * @constructor
 */
function formView(dispatch, model) {
  const {command} = model;
  return form(
    {
      className: 'w-100 mv2',
      onsubmit: e => {
        e.preventDefault();
        if (command.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
          dispatch(saveCommandMsg);
          dispatch(saveParametersMsg(model, command.trim().split(/(?:\s+|,\s*)/i).slice(1)));
        } else if (command.match(/^move\s*$/i)) {
          dispatch(moveMsg(model));
        } else if (command.match(/^left\s*$/i)) {
          dispatch(leftMsg(model));
        } else if (command.match(/^right\s*$/i)) {
          dispatch(rightMsg(model));
        } else if (command.match(/^report\s*$/i)) {
          dispatch(reportMsg(model));
        } else {
          dispatch(errorMsg);
        }
      },
    },
    [
      fieldSet('Enter the Command', command || '',
        e => dispatch(commandInputMsg(e.target.value))
    ),
      buttonSet(dispatch),
    ]
  )
  // return button({className: 'f3 pv2 ph3 bg-blue white bn'},
  //   'Run',
  // );
}

/**
 * The view function
 * @param {object} dispatch CarPark's config
 * @param {object} model CarPark's config
 * @constructor
 */
function view(dispatch, model){
  return div ({className: 'cf pa4-l bg-white'}, [
    div({className: 'fl w-20 pa4 bg-lightest-blue'}, [
      'PLACE X,Y,F - MOVE - LEFT - RIGHT - REPORT - PLACE will put the bus in the carpark in position X,Y and facing NORTH, SOUTH, EAST or WEST.'
    ]),
    div ({className: 'fl w-50 pa1 pl6'}, [
      h1({className: 'f2 pv2 bb'}, 'Bus in carpark simulator'),
      formView(dispatch, model),
      div({className: 'mw6 center dark-red'}, [pre(model.error)]),
      div({className: 'mw6 center'}, [pre(model.report)]),
      tableView(dispatch, model.carpark),
      pre(JSON.stringify(model, null, 2))
    ])
  ])
}

export default view;
