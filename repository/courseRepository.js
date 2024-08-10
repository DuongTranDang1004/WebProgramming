const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db"); // Assuming you have a db.js file for database connection

class CourseRepository {
  constructor() {
    this.collectionName = "courses";
  }

  // Fetch all courses
  async getAllCourses() {
    const db = getDb();
    return await db.collection(this.collectionName).find({}).toArray();
  }

  // Fetch a single course by ID
  async getCourseById(id) {
    const db = getDb();
    return await db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(id) });
  }

  // Add a new course
  async addCourse(courseData) {
    const db = getDb();
    const result = await db
      .collection(this.collectionName)
      .insertOne(courseData);
    return result.ops[0];
  }

  // Update a course by ID
  async updateCourse(id, updatedData) {
    const db = getDb();
    const result = await db
      .collection(this.collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedData },
        { returnOriginal: false }
      );
    return result.value;
  }

  // Delete a course by ID
  async deleteCourse(id) {
    const db = getDb();
    const result = await db
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}

module.exports = new CourseRepository();
