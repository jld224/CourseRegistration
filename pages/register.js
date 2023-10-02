export default function Register() {
    return (
      <div>
        <h1>Register for a Course</h1>
        <form>
          <label>
            Course ID:
            <input type="text" name="courseId" />
          </label>
          <label>
            Student ID:
            <input type="text" name="studentId" />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }