const learnerID = localStorage.getItem("id");

document.getElementById("missing-on-going-btn").addEventListener("click", function() {
	window.location.href = "/";
});
document.getElementById("missing-finished-btn").addEventListener("click", function() {
	window.location.href = "/";
});


async function loadOnGoingCourse() {
	let onGoingCourses = [];
	const boughtCourses = await fetch(`/api/boughtCourses/learner/${learnerID}`, {
		method: "GET",
	});
	if (boughtCourses.status !== 200) {
		document.getElementById("missing-on-going-btn").hidden = false;
		return;
	}
	const boughtCoursesJson = await boughtCourses.json();
	for(let i = 0; i < boughtCoursesJson.length; i++) {
		if (boughtCoursesJson[i].courseCompletionStatus === false) {
			onGoingCourses.push(boughtCoursesJson[i]);
		}
	}
	let courseRows = [];
	courseRows.push(document.createElement("div"));
	courseRows[0].className = "course-row";
	for (let i = 0; i < onGoingCourses.length; i++) {
		const boughtCourse = onGoingCourses[i];
		const courseData = await (await fetch(`/api/courses/${boughtCourse.courseInfo._id}`)).json();
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		let buyCert = boughtCourse.isCertificate ? "" : `<a href="/courses/buyCert/${boughtCourse._id}">Buy certificate for ${courseData.name} now!</a>`;
		courseCard.innerHTML = `
			<div class="course-card-image" id="course-${courseData._id}">
				<img src="${courseData.thumbnailImage}" alt="Course Image" onClick=goToCoursePage("${courseData._id}")>
			</div>
			<div class="course-card-content">
				<h3 onClick=goToCoursePage("${courseData._id})>${courseData.name}</h3>
				<p> By ${boughtCourse.instructorId.firstName} ${boughtCourse.instructorId.lastName}</p>
				${buyCert}
			</div>
		`;
		// check if last element in courses row contain 3 courses
		if (courseRows[courseRows.length - 1].childElementCount === 3) {
			courseRows.push(document.createElement("div"));
			courseRows[courseRows.length - 1].className = "course-row";
		}
		courseRows[courseRows.length - 1].appendChild(courseCard);
		// courseCard.addEventListener("click", function() {
		// 	window.location.href = `/courses/detailedPerformance/${courseData._id}`;
		// });
	}
	for (let i = 0; i < courseRows.length; i++) {
		const courseRow = courseRows[i];
		courseRow.className = "course-row";
		document.getElementById("on-going-courses").appendChild(courseRow);
	}
}
loadOnGoingCourse();


function goToCoursePage(courseID) {
	window.location.href = `/courses/detailedPerformance/${courseID}`;
}


async function loadAllCourse() {
	const boughtCourses = await fetch(`/api/boughtCourses/learner/${learnerID}`, {
		method: "GET",
	});
	const boughtCoursesJson = await boughtCourses.json();
	if (boughtCourses.status !== 200) {
		document.getElementById("missing-all-btn").hidden = false;
		return;
	}
	let courseRows = [];
	courseRows.push(document.createElement("div"));
	courseRows[0].className = "course-row";
	for (let i = 0; i < boughtCoursesJson.length; i++) {
		const boughtCourse = boughtCoursesJson[i];
		const courseData = await (await fetch(`/api/courses/${boughtCourse.courseInfo._id}`)).json();
		let buyCert = boughtCourse.isCertificate ? "" : `<a href="/courses/buyCert/${boughtCourse._id}">Buy certificate for ${courseData.name} now!</a>`;
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		courseCard.innerHTML = `
			<div class="course-card-image" id="course-${courseData._id}">
				<img src="${courseData.thumbnailImage}" alt="Course Image">
			</div>
			<div class="course-card-content">
				<h3>${courseData.name}</h3>
				<p> By ${boughtCourse.instructorId.firstName} ${boughtCourse.instructorId.lastName}</p>
				${buyCert}
			</div>
		`;
		// check if last element in courses row contain 3 courses
		if (courseRows[courseRows.length - 1].childElementCount === 3) {
			courseRows.push(document.createElement("div"));
			courseRows[courseRows.length - 1].className = "course-row";
		}
		courseRows[courseRows.length - 1].appendChild(courseCard);
		courseCard.addEventListener("click", function() {
			window.location.href = `/courses/detailedPerformance/${courseData._id}`;
		});
	}
	for (let i = 0; i < courseRows.length; i++) {
		const courseRow = courseRows[i];
		courseRow.className = "course-row";
		document.getElementById("all-courses").appendChild(courseRow);
	}
}
loadAllCourse();


async function loadFinishedCourse() {
	let finishedCourses = [];
	const boughtCourses = await fetch(`/api/boughtCourses/learner/${learnerID}`, {
		method: "GET",
	});
	if (boughtCourses.status !== 200) {
		document.getElementById("missing-finished-btn").hidden = false;
		return;
	}
	const boughtCoursesJson = await boughtCourses.json();
	for(let i = 0; i < boughtCoursesJson.length; i++) {
		if (boughtCoursesJson[i].courseCompletionStatus === true) {
			finishedCourses.push(boughtCoursesJson[i]);
		}
	}
	if (finishedCourses.length === 0) {
		document.getElementById("missing-finished-btn").hidden = false;
		return;
	}
	let courseRows = [];
	courseRows.push(document.createElement("div"));
	courseRows[0].className = "course-row";
	for (let i = 0; i < finishedCourses.length; i++) {
		const boughtCourse = finishedCourses[i];
		const courseData = await (await fetch(`/api/courses/${boughtCourse.courseInfo._id}`)).json();
		let buyCert = boughtCourse.isCertificate ? "" : `<a href="/courses/buyCert/${boughtCourse._id}">Buy certificate for ${courseData.name} now!</a>`;
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		courseCard.innerHTML = `
			<div class="course-card-image" id="course-${courseData._id}">
				<img src="${courseData.thumbnailImage}" alt="Course Image">
			</div>
			<div class="course-card-content">
				<h3>${courseData.name}</h3>
				<p> By ${boughtCourse.instructorId.firstName} ${boughtCourse.instructorId.lastName}</p>
				${buyCert}
			</div>
		`;
		// check if last element in courses row contain 3 courses
		if (courseRows[courseRows.length - 1].childElementCount === 3) {
			courseRows.push(document.createElement("div"));
			courseRows[courseRows.length - 1].className = "course-row";
		}
		courseRows[courseRows.length - 1].appendChild(courseCard);
		courseCard.addEventListener("click", function() {
			window.location.href = `/courses/detailedPerformance/${courseData._id}`;
		});
	}
	for (let i = 0; i < courseRows.length; i++) {
		const courseRow = courseRows[i];
		courseRow.className = "course-row";
		document.getElementById("finished-courses").appendChild(courseRow);
	}
}
loadFinishedCourse();


async function loadCertificates() {
	let certificates = [];
	const boughtCourses = await fetch(`/api/boughtCourses/learner/${learnerID}`, {
		method: "GET",
	});
	if (boughtCourses.status !== 200) {
		document.getElementById("missing-certificate-btn").hidden = false;
		return;
	}
	const boughtCoursesJson = await boughtCourses.json();
	for(let i = 0; i < boughtCoursesJson.length; i++) {
		if (boughtCoursesJson[i].courseCompletionStatus === true && boughtCoursesJson[i].isCertificate === true) {
			certificates.push(boughtCoursesJson[i]);
		}
	}
	if (certificates.length === 0) {
		document.getElementById("missing-certificate-btn").hidden = false;
		return;
	}
	const learner = await (await fetch(`/api/learners/${localStorage.getItem("id")}`)).json();
	let courseRows = [];
	courseRows.push(document.createElement("div"));
	courseRows[0].className = "course-row";
	for (let i = 0; i < certificates.length; i++) {
		const boughtCourse = certificates[i];
		const courseData = await (await fetch(`/api/courses/${boughtCourse.courseInfo._id}`)).json();
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		courseCard.innerHTML = `
			<div class="course-card-image" id="course-${courseData._id}">
				<img src="${courseData.thumbnailImage}" alt="Course Image">
			</div>
			<div class="course-card-content">
				<h2>Completion Certificate</h2>
				<h5> has been presented to </h5>
				<h2> ${learner.firstName} ${learner.lastName} <h2>
			</div>
		`;
		// check if last element in courses row contain 3 courses
		if (courseRows[courseRows.length - 1].childElementCount === 3) {
			courseRows.push(document.createElement("div"));
			courseRows[courseRows.length - 1].className = "course-row";
		}
		courseRows[courseRows.length - 1].appendChild(courseCard);
		courseCard.addEventListener("click", function() {
			window.location.href = `/courses/detailedPerformance/${courseData._id}`;
		});
	}
	for (let i = 0; i < courseRows.length; i++) {
		const courseRow = courseRows[i];
		courseRow.className = "course-row";
		document.getElementById("certificates").appendChild(courseRow);
	}
}
loadCertificates();