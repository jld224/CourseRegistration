import React from 'react';
import StudentLayout from '../components/StudentLayout';

const CourseRegisterPage = ({ id }) => {
    return (
        <div>
            <h1>Course Register Page</h1>
            <p>This is the page for students to register for courses</p>
        </div>
    );
};

CourseRegisterPage.Layout = StudentLayout;

export default CourseRegisterPage;
