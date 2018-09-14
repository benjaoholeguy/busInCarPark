import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';

import {
  commandInputMsg,
  saveCommandMsg
} from './Update';

/* unpack pre function from hyperscript-helpers library
* creates the pre tag useful for pre formating text
*/
const {pre, div, h1, button, form, label, input, table, thead, tbody, tr, th, td} = hh(h);


function cell(tag, className, value){
  return tag({className}, value)
}

function carparkRow(dispatch, className, command){
  return tr({ className }, [
    cell(td, 'pa2', ''),
    cell(td, 'pa2', ''),
    cell(td, 'pa2', ''),
    cell(td, 'pa2', ''),
    cell(td, 'pa2', ''),
  ])
}

function tableView(dispatch, command){
  return table({ className: 'mv2 w-100 collapse' }, [
    carparkBody(dispatch, '', command),
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
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
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
        dispatch(saveCommandMsg);
      },
    },
    [
      fieldSet('Command', command || '',
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
 * @param {object} dispatch fn CarPark's config
 * @param {object} model current App model who potentialy could be changed based on the msg received
 * @constructor
 */
function view(dispatch, model){
  return div ({className: 'mw6 center '}, [
    h1({className: 'f2 pv2 bb'}, 'Bus in carpark simulator'),
    formView(dispatch, model),

    // show the model on the page
    pre(JSON.stringify(model, null, 2)),
  ])
}

export default view;
