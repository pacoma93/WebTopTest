import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT } from './actions';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  timer = 0;
  companies = [];
  searchedcompanies = [];
  sArray = [];
  modalBody = {
    antall: '',
    navn: '',
    orgnr: '',
    regDate: '',
    address: '',
    Country: ''
  };
  searchStr;
  constructor(private ngRedux: NgRedux<IAppState>, private _http: Http) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    setInterval(() => {
      this.increment();
    }, 1000);
    this.getCompanies();
    this.usingES6();
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
    this.timer = this.ngRedux.getState().counter;
  }
  // would use the error and () to check but no need for it here in this example.
  getCompanies() {
    this._http.get(
      'http://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=10')
      .map(returData => returData.json())
      .subscribe(
      retur => {
        this.companies = retur.data;
      }
      );
    this._http.get(
      'http://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=100')
      .map(returData => returData.json())
      .subscribe(
      retur => {
        this.searchedcompanies = retur.data;
      },
      () => {
      }
      );
  }
  // I would usally search directly at the url for getting more options, but
  // for this example i will pretend i got a finite number of companies to search on
  filterCompany(text) {
    if (text === '') {
      this.sArray = [];
      return;
    }
      this.sArray = this.searchedcompanies.filter(elem => elem.navn.toLowerCase().includes(text.toLowerCase()));
  }
  clickedOn(i) {
    this.modalBody = {
      antall: this.companies[i].antallAnsatte,
      navn: this.companies[i].navn,
      orgnr: this.companies[i].organisasjonsnummer,
      regDate: this.companies[i].registreringsdatoEnhetsregisteret,
      address: this.companies[i].forretningsadresse.adresse,
      Country: this.companies[i].forretningsadresse.land,
    };
    // just speeding up. should use #modalButton
    document.getElementById('modalButton').click();
  }
  // just creating a method showing some of the nice features;
  usingES6() {
    const name = 'Paul';
    const stuff = 'Code';
    const tmp = `Hello!, my name is ${name}, and I like to ${stuff}`;
    console.log(tmp);

    // creating a object with use of features from ES6
    const object = {
      name,
      stuff,
      tmp
    };
    console.log(object);

    const Array_of_name_and_the_name_is_to_long = ['Jon', 'Jennifer', 'Jack', 'Thomas', 'Alfread', 'Paul'];

    const [Jon, Paul, Thomas] = Array_of_name_and_the_name_is_to_long;

    console.log(`Look who i found in this Array: ${Jon}, ${Paul}, ${Thomas}`);
  }
}
