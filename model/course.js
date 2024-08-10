// Get all courses

class Course {
  //some course field

  async getAllCourses() {
    try {
      const courses = await courseRepository.getAllCourses();
      // You could add additional business logic here if needed
      return courses;
    } catch (error) {
      throw new Error("Error getting courses");
    }
  }

  // Get a specific course by ID
  async getCourseById(id) {
    try {
      const course = await courseRepository.getCourseById(id);
      if (!course) {
        throw new Error("Course not found");
      }
      return course;
    } catch (error) {
      throw new Error("Error getting course");
    }
  }

  // Create a new course
  async createCourse(courseData) {
    try {
      // You could add validation or other business logic here
      const newCourse = await courseRepository.addCourse(courseData);
      return newCourse;
    } catch (error) {
      throw new Error("Error creating course");
    }
  }

  // Update an existing course
  async updateCourse(id, updatedData) {
    try {
      const updatedCourse = await courseRepository.updateCourse(
        id,
        updatedData
      );
      if (!updatedCourse) {
        throw new Error("Course not found");
      }
      return updatedCourse;
    } catch (error) {
      throw new Error("Error updating course");
    }
  }

  // Delete a course by ID
  async deleteCourse(id) {
    try {
      const success = await courseRepository.deleteCourse(id);
      if (!success) {
        throw new Error("Course not found");
      }
      return success;
    } catch (error) {
      throw new Error("Error deleting course");
    }
  }
  // Example of a business logic specific to the service layer
  async getTopCourses(limit = 5) {
    try {
      const courses = await courseRepository.getAllCourses();
      // Assuming we have a field `enrollments` in the course model to sort by popularity
      courses.sort((a, b) => b.enrollments - a.enrollments);
      return courses.slice(0, limit);
    } catch (error) {
      throw new Error("Error fetching top courses");
    }
  }
}
