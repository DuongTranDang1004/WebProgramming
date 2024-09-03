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

    /*
   1. PlatformAdmins Collection
_id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
email: String - Stores the email address of the admin.
password: String - Stores the hashed password of the admin.
profilePicture: String (URL) - Stores the URL of the admin's profile picture.
firstName: String - Stores the first name of the admin.
lastName: String - Stores the last name of the admin.
address: String - Stores the street address of the admin.
city: String - Stores the city of the admin.
zipcode: String - Stores the postal/zip code of the admin.
country: String - Stores the country code of the admin.
phone: String - Stores the phone number of the admin.
     */

    let platformAdminData = [];
    for (let i = 0; i < 30; i++) {
      platformAdminData.push({
        _id: i + 1, 
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

    /*
    Instructors Collection
_id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
email: String - Stores the email address of the instructor.
password: String - Stores the hashed password of the instructor.
profilePicture: String (URL) - Stores the URL of the instructor's profile picture.
firstName: String - Stores the first name of the instructor.
lastName: String - Stores the last name of the instructor.
address: String - Stores the street address of the instructor.
city: String - Stores the city of the instructor.
zipcode: String - Stores the postal/zip code of the instructor.
country: String - Stores the country code of the instructor.
phone: String - Stores the phone number of the instructor.
schoolOrCompanyName: String - Stores the name of the school or company where the instructor works.
jobTitle: String - Stores the job title of the instructor.
specialization: String - Stores the instructor's specialization (e.g., "front-end", "back-end", etc.).
status: String - Stores the status of the instructor (e.g., "active", "inactive").
membership: String - Stores the membership level of the instructor (e.g., "basic", "silver", etc.).
     */

    let instructorData = [];
    for (let i = 0; i < 30; i++) {
      instructorData.push({
        _id: i + 1,
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

    /*
   Learners Collection
_id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
email: String - Stores the email address of the learner.
password: String - Stores the hashed password of the learner.
profilePicture: String (URL) - Stores the URL of the learner's profile picture.
firstName: String - Stores the first name of the learner.
lastName: String - Stores the last name of the learner.
address: String - Stores the street address of the learner.
city: String - Stores the city of the learner.
zipcode: String - Stores the postal/zip code of the learner.
country: String - Stores the country code of the learner.
phone: String - Stores the phone number of the learner.
     */

    let learnerData = [];
    for (let i = 0; i < 30; i++) {
      learnerData.push({
        _id: i + 1,
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

    /*
   Courses Collection
_id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
instructorId: Integer - Stores the reference to the Instructors collection, representing the instructor who teaches the course.
category: String - Stores the category of the course (e.g., "front-end", "back-end", etc.).
name: String - Stores the name of the course.
thumbnailImage: String (URL) - Stores the URL of the course's thumbnail image.
price: String - Stores the price of the course.
description: String - Stores a description of the course.
     */

    let courseData = [];
    for (let i = 0; i < 30; i++) {
      courseData.push({
        _id: i + 1,
        instructorId: faker.number.int({ min: 1, max: 30 }),
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

    /*
   _id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
courseId: Integer - Stores the reference to the Courses collection, representing the course to which the lecture belongs.
lectureId: Integer - Stores a unique identifier for the lecture within the course.
name: String - Stores the name of the lecture.
description: String - Stores a description of the lecture.
video: String (URL) - Stores the URL of the lecture video.
exercise: Object - Stores the exercise associated with the lecture, including:
question: String - The question of the exercise.
options: Array of Strings - The options for the exercise (e.g., "option1", "option2", etc.).
correctAnswer: String - The correct answer from the options.
     */

    let lectureData = [];
    for (let i = 0; i < 30; i++) {
      lectureData.push({
        _id: i + 1, // Assign a normal integer for the _id field
        courseId: faker.number.int({ min: 1, max: 30 }),
        lectureId: faker.number.int({ min: 1, max: 999 }),
        name: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        video: faker.internet.url(),
        exercise: {
          // Renamed from form to exercise
          question: faker.lorem.sentence(),
          options: ["option1", "option2", "option3"],
          correctAnswer: "option1",
        },
      });
    }
    await lectures.insertMany(lectureData);

    // Generate and insert sample data for ContactForms

    /*
   _id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
contactPurpose: String - Stores the purpose of the contact (e.g., "General Inquiry", "Support", etc.).
name: String - Stores the name of the person filling out the contact form.
email: String - Stores the email address of the person filling out the contact form.
phone: String - Stores the phone number of the person filling out the contact form.
preferredContactMethod: String - Stores the preferred contact method (e.g., "email", "phone").
contactDays: String - Stores the preferred contact days (e.g., "Monday", "Tuesday", etc.).
message: String - Stores the message submitted in the contact form.
status: String - Stores the status of the contact form (e.g., "pending", "replied").
replyMessage: String - Stores the reply message.
     */

    let contactFormData = [];
    for (let i = 0; i < 30; i++) {
      contactFormData.push({
        _id: i + 1,
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

    /*
   _id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
learnerId: Integer - Stores the reference to the Learners collection, representing the learner who favorited the course.
courseId: Integer - Stores the reference to the Courses collection, representing the course that was favorited.
     */

    let favoriteCourseData = [];
    for (let i = 0; i < 30; i++) {
      favoriteCourseData.push({
        _id: i + 1,
        learnerId: faker.number.int({ min: 1, max: 30 }),
        courseId: faker.number.int({ min: 1, max: 30 }),
      });
    }
    await favoriteCourses.insertMany(favoriteCourseData);

    // Generate and insert sample data for FollowingInstructors

    /*
   FollowingInstructors Collection
_id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
learnerId: Integer - Stores the reference to the Learners collection, representing the learner who is following the instructor.
instructorId: Integer - Stores the reference to the Instructors collection, representing the instructor being followed.
     */

    let followingInstructorData = [];
    for (let i = 0; i < 30; i++) {
      followingInstructorData.push({
        _id: i + 1,
        learnerId: faker.number.int({ min: 1, max: 30 }),
        instructorId: faker.number.int({ min: 1, max: 30 }),
      });
    }
    await followingInstructors.insertMany(followingInstructorData);

    // Generate and insert sample data for BoughtCourses with generateCertificate field

    /*
   _id: Integer - The primary identifier for each document, manually set as an integer starting from 1.
learnerId: Integer - Stores the reference to the Learners collection, representing the learner who bought the course.
courseId: Integer - Stores the reference to the Courses collection, representing the course that was bought.
boughtDateTime: Date (truncated to minutes) - Stores the date and time when the course was bought.
lectureCompletionStatus: Array of Objects - Stores the completion status for each lecture in the course:
lectureId: Integer - The identifier of the lecture.
completeStatus: Boolean - Whether the lecture is completed or not.
completionDateTime: Date (nullable, truncated to minutes) - Stores the date and time when the course was completed, or null if not completed.
generateCertificate: Boolean - Indicates whether a certificate can be generated for the course.
     */
    let boughtCourseData = [];
    for (let i = 0; i < 30; i++) {
      let lectureCompletionStatus = [];
      for (let j = 1; j <= 5; j++) {
        lectureCompletionStatus.push({
          lectureId: j,
          completeStatus: faker.datatype.boolean(),
        });
      }

      boughtCourseData.push({
        _id: i + 1,
        learnerId: faker.number.int({ min: 1, max: 30 }),
        courseId: faker.number.int({ min: 1, max: 30 }),
        boughtDateTime: truncateToMinute(faker.date.recent()),
        lectureCompletionStatus: lectureCompletionStatus,
        completionDateTime: faker.helpers.maybe(
          () => truncateToMinute(faker.date.recent()),
          { probability: 0.3 }
        ),
        generateCertificate: faker.datatype.boolean(), // New field included
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
