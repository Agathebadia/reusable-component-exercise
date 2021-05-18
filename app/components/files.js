import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilesComponent extends Component {

  @tracked selected = false
  @tracked checkboxState = [false, false, false, false, false]
  @tracked indeterminate = false

  parentCheckbox = () => {
      return document.getElementById('select-all');
    }

  @action download() {

  if (this.status !== 'available') {
    window.alert('Please select an available file to download')
  }
  window.alert('You are about to download: ');
}


  setIndeterminate = () =>  {
    this.indeterminate = true;
    this.parentCheckbox().indeterminate = true;
  }

  resetIndeterminate = () => {
    this.indeterminate = false;
    this.parentCheckbox().indeterminate = false;
  }

  //parent/main checkbox
  @action selectAll() {
    if (this.selected === false ) {
      this.checkboxState = [true, true, true, true, true];
      this.selected = true;
    } else {
      this.checkboxState = [false, false, false, false, false];
      this.selected = false;
    }
  }

  //children checkboxes
  @action toggle(index) {
    //override checkboxstate - element = boolean
    this.checkboxState = this.checkboxState.map(function(element, i) {
      if (i === index) {
        return !element;
      }
      return element;
    });
  }

  //displaying number of selection + all or none
  @computed('checkboxState')
  //also setting states on the component
  get count() {
    this.resetIndeterminate();
    let truthValue = (currentValue) => currentValue === true;

    if (this.checkboxState.every(truthValue)) {
      return `All selected`;
    } else if (this.checkboxState.some(truthValue)) {
      let count = this.checkboxState.filter(element => element).length;
      this.setIndeterminate();
        return `Selected ${count}`
    } else {
      return 'None selected';
    }
  }
}
