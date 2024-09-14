// let frontEnd = [], backend = [], dataScience = [], AI = [], cyberSecurity = [], testing = [];
// let frontEndIndex = 0, backendIndex = 0, dataScienceIndex = 0, AIIndex = 0, cyberSecurityIndex = 0, testingIndex = 0;

// async function getCourses() {
// 	const response = await fetch("/api/courses/");
// 	const data = await response.json();
// 	data.forEach(course => {
// 		if (course.category == "back-end") backend.push(course);
// 		else if (course.category == "front-end") frontEnd.push(course);
// 		else if (course.category == "data science") dataScience.push(course);
// 		else if (course.category == "AI") AI.push(course);
// 		else if (course.category == "cyber security") cyberSecurity.push(course);
// 		else if (course.category == "testing") testing.push(course);	
// 	});

// 	// Displaying courses
// 	displayFE("current");
// 	displayBE("current");
// 	displayDS("current");
// 	displayAI("current");
// 	displayCS("current");
// 	displayTesting("current");
// }
// getCourses();


// function displayFE(status) {
// 	if (status == "current") {
// 		document.getElementById("fe-img").src = frontEnd[frontEndIndex].thumbnailImage;
// 		document.getElementById("fe-name").innerHTML = frontEnd[frontEndIndex].name;
// 		document.getElementById("fe-ins").innerHTML = `By ${frontEnd[frontEndIndex].instructorId.firstName} ${frontEnd[frontEndIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		frontEndIndex = (frontEndIndex + 1) % frontEnd.length;
// 		displayFE("current");
// 	}
// 	if (status == "prev") {
// 		frontEndIndex = (frontEndIndex + frontEnd.length - 1) % frontEnd.length;
// 		displayFE("current");
// 	}
// }
// document.getElementById("fe-next").addEventListener("click", () => displayFE("next"));
// document.getElementById("fe-prev").addEventListener("click", () => displayFE("prev"));
// document.getElementById("fe-course").addEventListener("click", () => window.location.href = `/courses/detail/${frontEnd[frontEndIndex]._id}`);


// function displayBE(status) {
// 	if (status == "current") {
// 		document.getElementById("be-img").src = backend[backendIndex].thumbnailImage;
// 		document.getElementById("be-name").innerHTML = backend[backendIndex].name;
// 		document.getElementById("be-ins").innerHTML = `By ${backend[backendIndex].instructorId.firstName} ${backend[backendIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		backendIndex = (backendIndex + 1) % backend.length;
// 		displayBE("current");
// 	}
// 	if (status == "prev") {
// 		backendIndex = (backendIndex + backend.length - 1) % backend.length;
// 		displayBE("current");
// 	}
// }
// document.getElementById("be-next").addEventListener("click", () => displayBE("next"));
// document.getElementById("be-prev").addEventListener("click", () => displayBE("prev"));
// document.getElementById("be-course").addEventListener("click", () => window.location.href = `/courses/detail/${backend[backendIndex]._id}`);


// function displayDS(status) {
// 	if (status == "current") {
// 		document.getElementById("ds-img").src = dataScience[dataScienceIndex].thumbnailImage;
// 		document.getElementById("ds-name").innerHTML = dataScience[dataScienceIndex].name;
// 		document.getElementById("ds-ins").innerHTML = `By ${dataScience[dataScienceIndex].instructorId.firstName} ${dataScience[dataScienceIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		dataScienceIndex = (dataScienceIndex + 1) % dataScience.length;
// 		displayDS("current");
// 	}
// 	if (status == "prev") {
// 		dataScienceIndex = (dataScienceIndex + dataScience.length - 1) % dataScience.length;
// 		displayDS("current");
// 	}
// }
// document.getElementById("ds-next").addEventListener("click", () => displayDS("next"));
// document.getElementById("ds-prev").addEventListener("click", () => displayDS("prev"));
// document.getElementById("ds-course").addEventListener("click", () => window.location.href = `/courses/detail/${dataScience[dataScienceIndex]._id}`);


// function displayAI(status) {
// 	if (status == "current") {
// 		document.getElementById("ai-img").src = AI[AIIndex].thumbnailImage;
// 		document.getElementById("ai-name").innerHTML = AI[AIIndex].name;
// 		document.getElementById("ai-ins").innerHTML = `By ${AI[AIIndex].instructorId.firstName} ${AI[AIIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		AIIndex = (AIIndex + 1) % AI.length;
// 		displayAI("current");
// 	}
// 	if (status == "prev") {
// 		AIIndex = (AIIndex + AI.length - 1) % AI.length;
// 		displayAI("current");
// 	}
// }
// document.getElementById("ai-next").addEventListener("click", () => displayAI("next"));
// document.getElementById("ai-prev").addEventListener("click", () => displayAI("prev"));
// document.getElementById("ai-course").addEventListener("click", () => window.location.href = `/courses/detail/${AI[AIIndex]._id}`);


// function displayCS(status) {
// 	if (status == "current") {
// 		document.getElementById("cs-img").src = cyberSecurity[cyberSecurityIndex].thumbnailImage;
// 		document.getElementById("cs-name").innerHTML = cyberSecurity[cyberSecurityIndex].name;
// 		document.getElementById("cs-ins").innerHTML = `By ${cyberSecurity[cyberSecurityIndex].instructorId.firstName} ${cyberSecurity[cyberSecurityIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		cyberSecurityIndex = (cyberSecurityIndex + 1) % cyberSecurity.length;
// 		displayCS("current");
// 	}
// 	if (status == "prev") {
// 		cyberSecurityIndex = (cyberSecurityIndex + cyberSecurity.length - 1) % cyberSecurity.length;
// 		displayCS("current");
// 	}
// }
// document.getElementById("cs-next").addEventListener("click", () => displayCS("next"));
// document.getElementById("cs-prev").addEventListener("click", () => displayCS("prev"));
// document.getElementById("cs-course").addEventListener("click", () => window.location.href = `/courses/detail/${cyberSecurity[cyberSecurityIndex]._id}`);


// function displayTesting(status) {
// 	if (status == "current") {
// 		document.getElementById("testing-img").src = testing[testingIndex].thumbnailImage;
// 		document.getElementById("testing-name").innerHTML = testing[testingIndex].name;
// 		document.getElementById("testing-ins").innerHTML = `By ${testing[testingIndex].instructorId.firstName} ${testing[testingIndex].instructorId.lastName}`;
// 	}
// 	if (status == "next") {
// 		testingIndex = (testingIndex + 1) % testing.length;
// 		displayTesting("current");
// 	}
// 	if (status == "prev") {
// 		testingIndex = (testingIndex + testing.length - 1) % testing.length;
// 		displayTesting("current");
// 	}
// }
// document.getElementById("testing-next").addEventListener("click", () => displayTesting("next"));
// document.getElementById("testing-prev").addEventListener("click", () => displayTesting("prev"));
// document.getElementById("testing-course").addEventListener("click", () => window.location.href = `/courses/detail/${testing[testingIndex]._id}`);
