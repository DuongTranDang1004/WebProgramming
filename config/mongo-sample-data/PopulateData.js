const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

const username = "cosc2430";
const password = "fighting";

// MongoDB connection URL to the desired database
const connectionStringURL = `mongodb://${username}:${password}@itlearning.ddns.net:27017/`;
const dbName = "ITLearning";

function truncateToMinute(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );
}

async function generateSampleData() {
  const client = new MongoClient(connectionStringURL);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Define collections
    const platformAdmins = db.collection("PlatformAdmins");
    const instructors = db.collection("Instructors");
    const learners = db.collection("Learners");
    const courses = db.collection("Courses");
    const lectures = db.collection("Lectures");
    const contactForms = db.collection("ContactForms");
    const favoriteCourses = db.collection("FavoriteCourses");
    const followingInstructors = db.collection("FollowingInstructors");
    const boughtCourses = db.collection("BoughtCourses");

    // Empty the collections before inserting new data
    await platformAdmins.deleteMany({});
    await instructors.deleteMany({});
    await learners.deleteMany({});
    await courses.deleteMany({});
    await lectures.deleteMany({});
    await contactForms.deleteMany({});
    await favoriteCourses.deleteMany({});
    await followingInstructors.deleteMany({});
    await boughtCourses.deleteMany({});

    console.log("Collections emptied successfully.");

    // Generate and insert sample data for PlatformAdmins
    let platformAdminData = [];
    for (let i = 0; i < 30; i++) {
      platformAdminData.push({
        email: faker.internet.email(),
        password: faker.internet.password(12),
        profilePicture: faker.image.avatar(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        country: faker.location.countryCode(),
        phone: faker.phone.number(),
      });
    }
    await platformAdmins.insertMany(platformAdminData);

    // Generate and insert sample data for Instructors
    let instructorData = [];
    for (let i = 0; i < 30; i++) {
      instructorData.push({
        email: faker.internet.email(),
        password: faker.internet.password(12),
        profilePicture: faker.image.avatar(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        country: faker.location.countryCode(),
        phone: faker.phone.number(),
        schoolOrCompanyName: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        specialization: faker.helpers.arrayElement([
          "front-end",
          "back-end",
          "data science",
          "AI",
          "cyber security",
          "testing",
        ]),
        status: faker.helpers.arrayElement(["active", "inactive"]),
        membership: faker.helpers.arrayElement([
          "basic",
          "silver",
          "gold",
          "diamond",
        ]),
      });
    }
    await instructors.insertMany(instructorData);

    // Generate and insert sample data for Learners
    let learnerData = [];
    for (let i = 0; i < 30; i++) {
      learnerData.push({
        email: faker.internet.email(),
        password: faker.internet.password(12),
        profilePicture: faker.image.avatar(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        country: faker.location.countryCode(),
        phone: faker.phone.number(),
      });
    }
    await learners.insertMany(learnerData);

    // Generate and insert sample data for Courses
    let courseData = [];
    for (let i = 0; i < 30; i++) {
      courseData.push({
        instructorId: (await instructors.find().toArray())[Math.floor(Math.random() * 30)]._id,
        category: faker.helpers.arrayElement([
          "front-end",
          "back-end",
          "data science",
          "AI",
          "cyber security",
          "testing",
        ]),
        name: faker.commerce.productName(),
        thumbnailImage: faker.image.url(),
        price: faker.commerce.price(),
        description: faker.lorem.paragraph(),
      });
    }
    await courses.insertMany(courseData);

    // Generate and insert sample data for Lectures
    let lectureData = [];
    for (let i = 0; i < 30; i++) {
      lectureData.push({
        courseId: (await courses.find().toArray())[Math.floor(Math.random() * 30)]._id,
        name: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        video: faker.internet.url(),
        exercise: {
          question: faker.lorem.sentence(),
          options: ["option1", "option2", "option3"],
          correctAnswer: "option1",
        },
      });
    }
    await lectures.insertMany(lectureData);

    // Generate and insert sample data for ContactForms
    let contactFormData = [];
    for (let i = 0; i < 30; i++) {
      contactFormData.push({
        contactPurpose: faker.helpers.arrayElement([
          "General Inquiry",
          "Support",
          "Feedback",
        ]),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        preferredContactMethod: faker.helpers.arrayElement(["email", "phone"]),
        contactDays: faker.helpers.arrayElement([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]),
        message: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(["pending", "replied"]),
        replyMessage: faker.lorem.sentence(),
      });
    }
    await contactForms.insertMany(contactFormData);

    // Generate and insert sample data for FavoriteCourses
    let favoriteCourseData = [];
    for (let i = 0; i < 30; i++) {
      favoriteCourseData.push({
        learnerId: (await learners.find().toArray())[Math.floor(Math.random() * 30)]._id,
        courseId: (await courses.find().toArray())[Math.floor(Math.random() * 30)]._id,
      });
    }
    await favoriteCourses.insertMany(favoriteCourseData);

    // Generate and insert sample data for FollowingInstructors
    let followingInstructorData = [];
    for (let i = 0; i < 30; i++) {
      followingInstructorData.push({
        learnerId: (await learners.find().toArray())[Math.floor(Math.random() * 30)]._id,
        instructorId: (await instructors.find().toArray())[Math.floor(Math.random() * 30)]._id,
      });
    }
    await followingInstructors.insertMany(followingInstructorData);

    // Generate and insert sample data for BoughtCourses with generateCertificate field
    let boughtCourseData = [];
    for (let i = 0; i < 30; i++) {
      let lectureCompletionStatus = [];
      for (let j = 1; j <= 5; j++) {
        lectureCompletionStatus.push({
          lectureId: (await lectures.find().toArray())[Math.floor(Math.random() * 30)]._id,
          completeStatus: faker.datatype.boolean(),
        });
      }

      boughtCourseData.push({
        learnerId: (await instructors.find().toArray())[Math.floor(Math.random() * 30)]._id,
        courseId: (await instructors.find().toArray())[Math.floor(Math.random() * 30)]._id,
        boughtDateTime: truncateToMinute(faker.date.recent()),
        lectureCompletionStatus: lectureCompletionStatus,
        completionDateTime: faker.helpers.maybe(
          () => truncateToMinute(faker.date.recent()),
          { probability: 0.3 }
        ),
        generateCertificate: faker.datatype.boolean(),
      });
    }
    await boughtCourses.insertMany(boughtCourseData);

    console.log("Sample data inserted successfully!");
  } catch (err) {
    console.error(err.stack);
  } finally {
    await client.close();
  }
}

generateSampleData();
