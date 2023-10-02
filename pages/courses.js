export default function Courses() {

    // Add code here to fetch courses data from your database
    let courses = []; // This will be replaced by actual data
  
    return (
      <div>
        <h1>Courses</h1>
  
        {courses.map(course => 
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        )}
  
      </div>
    );
  }