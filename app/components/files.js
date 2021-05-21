import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilesComponent extends Component {

  @tracked selected = false
  @tracked checkboxState = [false, false, false, false, false]

  parentCheckbox = () => {
      return document.getElementById('select-all');
    }

    get files() {
      //arguments passed from index.hbs @model.data
      return this.args.files;
    }

  @action download() {
    let fileNames = this.files.reduce((acc, value, index) => {
      if (this.checkboxState[index] && value.status === 'available') {
        acc.push(value.device) + acc.push(value.path)
      }
      return acc;
    //initial value is empty for the acc
    }, []
    )

    if (fileNames.length === 0) {
      window.alert('None of the files are available to download')
    } else {
    window.alert('You are about to download: ' + fileNames.join(', '));
    }
  }

  setIndeterminate = () =>  {
    this.parentCheckbox().indeterminate = true;
  }

  resetIndeterminate = () => {
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
    //if everything is selected manually, parent checkbox needs to be true state
    this.selected = this.checkboxState.every(el => el === true)
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

  @computed('checkboxState')
  get disableButton() {
    //if elements are all false
    if (this.checkboxState.every(el => !el)) {
      return true
    }
    return false
  }
}
