const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

const username = "cosc2430";
const password = "fighting";

// MongoDB connection URL to the desired database
//Connection to physical server database
const connectionStringURL = `mongodb://${username}:${password}@itlearning.ddns.net:27017/`;
//Connection to localhost database for testing purpose
// const connectionStringURL = `mongodb://localhost:27017/`;

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
    const memberships = db.collection("Membership");
    const transactions = db.collection("Transactions");

    // Empty the collections before inserting new data
    await Promise.all([
      platformAdmins.deleteMany({}),
      instructors.deleteMany({}),
      learners.deleteMany({}),
      courses.deleteMany({}),
      lectures.deleteMany({}),
      contactForms.deleteMany({}),
      favoriteCourses.deleteMany({}),
      followingInstructors.deleteMany({}),
      boughtCourses.deleteMany({}),
      memberships.deleteMany({}),
      transactions.deleteMany({}),
    ]);

    console.log("Collections emptied successfully.");

    await platformAdmins.insertOne({
      email: "admin@itlearning.ddns.net",
      password: "Admin123",
      profilePicture: faker.image.avatar(),
      firstName: "Admin",
      lastName: "ITLearning",
      address: "702 Nguyen Van Linh, Tan Hung, District 7",
      city: "Ho Chi Minh",
      zipcode: "700000",
      country: "VN",
      phone: "02837761300",
    });

    await instructors.insertOne({
      email: "instructor@itlearning.ddns.net",
      password: "Instructor123",
      profilePicture: faker.image.avatar(),
      firstName: "Instructor",
      lastName: "ITLearning",
      address: "702 Nguyen Van Linh, Tan Hung, District 7",
      city: "Ho Chi Minh",
      zipcode: "700000",
      country: "VN",
      phone: "02837761300",
      schoolOrCompanyName: "RMIT Vietnam University",
      jobTitle: "Lecturer",
      specialization: "front-end",
      status: "active",
    });

    await learners.insertOne({
      email: "learner@itlearning.ddns.net",
      password: "Learner123",
      profilePicture: faker.image.avatar(),
      firstName: "Learner",
      lastName: "ITLearning",
      address: "702 Nguyen Van Linh, Tan Hung, District 7",
      city: "Ho Chi Minh",
      zipcode: "700000",
      country: "VN",
      phone: "02837761300",
    });

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
        profilePicture: faker.image.avatarGitHub(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        country: faker.location.countryCode(),
        phone: faker.phone.number(),
        schoolOrCompanyName: faker.company.name() + " University",
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
        createTime: new Date(Date.now()),
        Bio:
          Math.floor(Math.random() * 2) % 2 ? faker.lorem.paragraphs() : null,
      });
    }
    await instructors.insertMany(instructorData);

    // Generate and insert sample data for Learners
    let learnerData = [];
    for (let i = 0; i < 500; i++) {
      learnerData.push({
        email: faker.internet.email(),
        password: faker.internet.password(12),
        profilePicture: faker.image.avatarGitHub(),
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
        instructorId: (await instructors.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
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
        isPublish: Math.floor(Math.random() * 2) % 2 ? true : false,
        createTime: faker.date.recent(),
      });
    }
    await courses.insertMany(courseData);

    // Generate and insert sample data for Lectures
    let lectureData = [];
    for (let i = 0; i < 30; i++) {
      let numberLecture = faker.number.int({ min: 1, max: 2 });
      for (let index = 1; index <= numberLecture; index++) {
        lectureData.push({
          courseId: (await courses.find().toArray())[i]._id,
          name: faker.company.catchPhrase(),
          description: faker.lorem.paragraph(),
          video: "/video/NGGYU.webm",
          exercise: {
            question: faker.lorem.sentence(),
            options: ["option1", "option2", "option3"],
            correctAnswer: "option1",
          },
          index: index,
        });
      }
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
        learnerId: (await learners.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
        courseId: (await courses.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
      });
    }
    await favoriteCourses.insertMany(favoriteCourseData);

    // Generate and insert sample data for FollowingInstructors
    let followingInstructorData = [];
    for (let i = 0; i < 30; i++) {
      followingInstructorData.push({
        learnerId: (await learners.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
        instructorId: (await instructors.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
      });
    }
    await followingInstructors.insertMany(followingInstructorData);

    // Generate and insert sample data for BoughtCourses with generateCertificate field
    let boughtCourseData = [];
    for (let i = 0; i < 30; i++) {
      let lectureCompletionStatus = [];
      let selectCourse = (await courses.find().toArray())[
        Math.floor(Math.random() * 30)
      ]._id;
      let selectInstructor = (await courses.findOne({ _id: selectCourse }))
        .instructorId;
      boughtCourseData.push({
        learnerId: (await learners.find().toArray())[
          Math.floor(Math.random() * 30)
        ]._id,
        courseId: selectCourse,
        instructorId: selectInstructor,
        boughtDateTime: truncateToMinute(faker.date.recent()),
        lectureCompletionStatus: lectureCompletionStatus,
        completionDateTime: faker.helpers.maybe(
          () => truncateToMinute(faker.date.recent()),
          { probability: 0.3 }
        ),
        isCertificate: faker.datatype.boolean(),
        endDate: null,
        courseCompletionStatus: false,
      });
    }
    await boughtCourses.insertMany(boughtCourseData);

    let membershipData = [];
    instructorData = await instructors.find().toArray();
    for (let index = 0; index < instructorData.length; index++) {
      let planType = Math.floor(Math.random() * 2) % 2 ? "Monthly" : "Yearly";
      let startDate = new Date(Date.now());
      let paymentMethod = Math.floor(Math.random() * 2) % 2 ? "Card" : "Paypal";
      membershipData.push({
        instructorId: instructorData[index]._id,
        planName: "Gold", //this should be random
        planType: planType,
        commissionFee: 0.2,
        price: planType == "Monthly" ? 20 : 200,
        startDate: startDate,
        endDate:
          planType == "Monthly"
            ? new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate()
              )
            : new Date(
                startDate.getFullYear() + 1,
                startDate.getMonth(),
                startDate.getDate()
              ),
        paymentMethod: paymentMethod,
        cardNumber:
          paymentMethod == "Card" ? faker.finance.creditCardNumber() : null,
      });
    }
    await memberships.insertMany(membershipData);
    const membershipsData = await memberships.find().toArray();
    for (let index = 0; index < membershipsData.length; index++) {
      let instructor = await instructors.findOne({
        _id: membershipsData[index].instructorId,
      });
      instructor.membershipId = membershipsData[index]._id;
      await instructors.updateOne(
        { _id: membershipsData[index].instructorId },
        { $set: instructor }
      );
    }

    // Generate and insert sample data for Transactions
    let transactionData = [];
    for (let i = 0; i < 30; i++) {
      // Select a random learner and a random course
      const learner = (await learners.find().toArray())[
        Math.floor(Math.random() * 500)
      ];
      const course = (await courses.find().toArray())[
        Math.floor(Math.random() * 30)
      ];

      // Optionally generate certificate details
      const hasCertificate = Math.random() < 0.5; // 50% chance of having a certificate
      const certificateName = hasCertificate
        ? faker.commerce.productName() + " Certificate"
        : null;
      const certificatePrice = hasCertificate ? course.price * 0.1 : 0;

      transactionData.push({
        learnerId: learner._id.toString(), // Reference to learner
        totalAmount: course.price + certificatePrice, // Course price + certificate price
        transactionDate: truncateToMinute(faker.date.recent()), // Use recent date for transaction
        paymentMethod: faker.helpers.arrayElement([
          "VISA",
          "Mastercard",
          "Bank Transfer",
          "Momo",
        ]),
        transactionItems: [
          {
            courseId: course._id.toString(), // Reference to course
            certificateName: certificateName,
            certificatePrice: certificatePrice,
          },
        ],
      });
    }

    await transactions.insertMany(transactionData);

    console.log("Sample data for transactions inserted successfully!");
    

    console.log("Sample data inserted successfully!");
  } catch (err) {
    console.error(err.stack);
  } finally {
    await client.close();
  }
}

generateSampleData();
