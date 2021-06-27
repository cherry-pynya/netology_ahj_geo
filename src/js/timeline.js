/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import moment from 'moment';
import getLocation from './location';
import postFactory from './postfactory';
import validate from './validate';

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
    this.coordsForm = document.querySelector('.coords-form');

    this.form.addEventListener('submit', (e) => {
      this.onSubmit(e, this);
    });
    this.coordsForm.addEventListener('submit', (e) => {
      this.coordsSubmit(e, this);
    });
    this.coordsForm.addEventListener('reset', (e) => {
      this.cancelCoords(e);
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
      document.querySelector('.modal').classList.toggle('invalid');
      this.coordsForm.classList.toggle('invalid');
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

  coordsSubmit(e, app) {
    e.preventDefault();
    if (validate(app.coordsForm.querySelector('.coords-form-input').value)) {
      const time = `${moment().format('L')} ${moment().format('LTS')}`;
      const obj = {
        content: this.form.querySelector('.app-form-input').value,
        coords: `[${this.coordsForm.querySelector('.coords-form-input').value}]`,
        date: time,
      };
      app.timeline.insertAdjacentHTML('beforeend', postFactory(obj));
      app.save(obj);
      document.querySelector('.modal').classList.toggle('invalid');
      this.coordsForm.classList.toggle('invalid');
      this.form.querySelector('.app-form-input').value = '';
      this.coordsForm.querySelector('.coords-form-input').value = '';
    } else {
      alert('Введите координаты в формате: Х.ХХХ, Х.ХХХ');
      this.coordsForm.querySelector('.coords-form-input').value = '';
    }
  }

  cancelCoords(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('invalid');
    this.coordsForm.classList.toggle('invalid');
    this.form.querySelector('.app-form-input').value = '';
    this.coordsForm.querySelector('.coords-form-input').value = '';
  }
}
