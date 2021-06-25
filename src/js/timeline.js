/* eslint-disable class-methods-use-this */
import moment from 'moment';
import getLocation from './location';
import postFactory from './postfactory';

moment.locale('ru');

export default class Timeline {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }

    this.timeline = this.element.querySelector('.app-wall');
    this.form = this.element.querySelector('.app-form');

    this.form.addEventListener('submit', (e) => {
      this.onSubmit(e, this);
    });
  }

  onSubmit(e, app) {
    e.preventDefault();
    getLocation().then((res) => {
      const time = `${moment().format('L')} ${moment().format('LTS')}`;
      const obj = {
        content: this.form.querySelector('.app-form-input').value,
        coords: res,
        date: time,
      };
      app.timeline.insertAdjacentHTML('beforeend', postFactory(obj));
      app.save(obj);
      this.form.querySelector('.app-form-input').value = '';
    }, (reject) => {
      console.log(reject);
    });
  }

  save(obj) {
    const array = JSON.parse(localStorage.getItem('timelineData')).data;
    array.push(obj);
    localStorage.setItem('timelineData', JSON.stringify({ data: array }));
  }

  init() {
    if (localStorage.getItem('timelineData') === null) {
      localStorage.setItem('timelineData', JSON.stringify({ data: [] }));
    } else {
      JSON.parse(localStorage.getItem('timelineData')).data.forEach((el) => {
        this.timeline.insertAdjacentHTML('beforeend', postFactory(el));
      });
    }
  }
}
