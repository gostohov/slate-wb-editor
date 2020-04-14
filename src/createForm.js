import { store } from './store';
import { Subject } from 'rxjs';

export const createForm = (toggleBlock) => {
  const inputSbj = new Subject();
  const destroySbj = new Subject();
  const key = `input_${store.sidebar.getInputList().length}`;
  toggleBlock({key, inputSbj, destroySbj});
}