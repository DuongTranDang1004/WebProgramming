async function loadData() {
	const courses = await (await fetch('/api/courses')).json();
	let sortedCourses = {};
	courses.forEach(course => {
		if (!sortedCourses[course.name.toLowerCase()[0]]) {
			sortedCourses[course.name.toLowerCase()[0]] = [course];
		} else {
			sortedCourses[course.name.toLowerCase()[0]].push(course);
		}
	});
	const sortedCoursesKeys = Object.keys(sortedCourses).sort();
	for (let i = 0; i < sortedCoursesKeys.length; i++) {
		const letter = sortedCoursesKeys[i];
		const courses = sortedCourses[letter];
		let group2 = [document.createElement('div')];
		group2[0].className = 'group2';
		courses.forEach(course => {
			const info = document.createElement('div');
			info.className = 'info';
			// Add image
			const courseImage = document.createElement('img');
			courseImage.src = course.thumbnailImage;
			info.appendChild(courseImage);
			// Add name
			const courseName = document.createElement('h3');
			courseName.textContent = course.name;
			info.appendChild(courseName);
			// Add instructor
			const instructor = document.createElement('p');
			instructor.textContent = `By ${course.instructorId.firstName} ${course.instructorId.lastName}`;
			info.appendChild(instructor);
			// Redirect to course page when clicked into info
			info.onclick = () => {
				window.location.href = `/courses/detail/${course._id}`;
			};
			// Get the last group2
			let lastGroup2 = group2[group2.length - 1];
			if (lastGroup2.children.length === 2) {
				group2.push(document.createElement('div'));
				group2[group2.length - 1].className = 'group2';
				lastGroup2 = group2[group2.length - 1];
			}
			lastGroup2.appendChild(info);
		});
		let group4 = [document.createElement('div')];
		group4[0].className = 'group4';
		group2.forEach(group => {
			let latestGroup4 = group4[group4.length - 1];
			if (latestGroup4.children.length === 2) {
				group4.push(document.createElement('div'));
				group4[group4.length - 1].className = 'group4';
				latestGroup4 = group4[group4.length - 1];
			}
			latestGroup4.appendChild(group);
		});
		group4.forEach(group => {
			document.getElementById(letter).appendChild(group);
		});
	}
}
loadData();