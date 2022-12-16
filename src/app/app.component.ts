import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string): void {
		let matchingSatellites: Satellite[] = [];
		searchTerm = searchTerm.toLowerCase();
		// loop through satellite objects list
		for(let i=0; i < this.sourceList.length; i++) {
			// isolate the names, orbit types, types
			let name = this.sourceList[i].name.toLowerCase();
			let orbitType = this.sourceList[i].orbitType.toLowerCase();
 	 		let type = this.sourceList[i].type.toLowerCase();
			//find the index if the searchterm in names & orbit types, of it exists, push to matching satellites
			//if orbit type is the same as searchterm Ex: high == high && low == low, push to array
			if (name.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm) >= 0 || orbitType == searchTerm) {
				matchingSatellites.push(this.sourceList[i]);
			}
				
		}
		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches
		this.displayList = matchingSatellites;
	}
}




// original
// search(searchTerm: string): void {
// 	let matchingSatellites: Satellite[] = [];
// 	searchTerm = searchTerm.toLowerCase();
// 	// loop through satellite objects list
// 	for(let i=0; i < this.sourceList.length; i++) {
// 		// isolate the names
// 		let name = this.sourceList[i].name.toLowerCase();
// 		//find the index if the searchterm, of it exists, push to matching satellites
// 		if (name.indexOf(searchTerm) >= 0) {
// 			matchingSatellites.push(this.sourceList[i]);
// 		}
// 	}
// 	// assign this.displayList to be the array of matching satellites
// 	// this will cause Angular to re-make the table, but now only containing matches
// 	this.displayList = matchingSatellites;
// }


//failed attempt #1
// search(searchTerm: string): void {
// 	let matchingSatellites: Satellite[] = [];
// 	let matchingOrbitTypes: Satellite [] = [];
// 	let matchingTypes: Satellite [] = [];

// 	searchTerm = searchTerm.toLowerCase();
// 	for(let i=0; i < this.sourceList.length; i++) {
// 		let name = this.sourceList[i].name.toLowerCase();
// 		let orbitType = this.sourceList[i].orbitType.toLowerCase();
// 		let type = this.sourceList[i].type.toLowerCase();
// 		if (name.indexOf(searchTerm) >= 0 || orbitType.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm)) {
// 			matchingSatellites.push(this.sourceList[i]);
// 			matchingOrbitTypes.push(this.sourceList[i]);
// 			matchingTypes.push(this.sourceList[i]);
// 		}
// 	}
// 	// assign this.displayList to be the array of matching satellites
// 	// this will cause Angular to re-make the table, but now only containing matches
// 	this.displayList = matchingSatellites;
// }


//attempt no 2, close but will push the same array more than once
// search(searchTerm: string): void {
// 	let matchingSatellites: Satellite[] = [];
// 	searchTerm = searchTerm.toLowerCase();
// 	// loop through satellite objects list
// 	for(let i=0; i < this.sourceList.length; i++) {
// 		// isolate the names, orbit types, types
// 		let name = this.sourceList[i].name.toLowerCase();
// 		let orbitType = this.sourceList[i].orbitType.toLowerCase();
// 		  let type = this.sourceList[i].type.toLowerCase();
// 		//find the index if the searchterm in names, of it exists, push to matching satellites
// 		if (name.indexOf(searchTerm) >= 0) {
// 			matchingSatellites.push(this.sourceList[i]);
// 		}
// 		//find index of search terms in types, if exists, push
// 		if (type.indexOf(searchTerm) >= 0) {
// 			matchingSatellites.push(this.sourceList[i]);
// 		}
// 		//if orbit type is the same as searchterm Ex: high == high && low == low, push to array
// 		if (orbitType == searchTerm) {
// 			matchingSatellites.push(this.sourceList[i]);
// 		}	
// 	}
// 	// assign this.displayList to be the array of matching satellites
// 	// this will cause Angular to re-make the table, but now only containing matches
// 	this.displayList = matchingSatellites;
// }
// }