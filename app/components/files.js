import Component from '@glimmer/component';
import { action } from '@ember/object'

export default class FilesComponent extends Component {
  isChecked = false;

  @action
  toggleColor() {
    this.set('isChecked', !this.isChecked)
  }
}
