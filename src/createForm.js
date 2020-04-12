import { store } from './store';
import { Subject } from 'rxjs';

export const createForm = (toggleBlock) => {
  const subject = new Subject();
  const key = `input_${store.sidebar.getInputList().length}`;
  toggleBlock({key, subject});
}