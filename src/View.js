import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';

/* unpack pre function from hyperscript-helpers library
* creates the pre tag useful for pre formating text
*/
const {pre} = hh(h);

//impure code below

/**
 * The view function
 * @param {object} dispatch fn CarPark's config
 * @param {object} model current App model who potentialy could be changed based on the msg received
 * @constructor
 */
function view(dispatch, model){
  // show the model on the page
  return pre(JSON.stringify(model, null, 2));
}

export default view;
