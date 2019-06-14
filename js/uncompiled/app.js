class App {

	constructor(name) {
		this.name = name;
	}

	sayHi() {
		window.alert("Hello " + this.name);
	}
}

new App("Colin").sayHi();
