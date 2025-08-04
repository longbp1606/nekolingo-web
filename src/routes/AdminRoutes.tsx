/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout"
import Archivement from "@/pages/Admin/Archivement/Archivement";
import Course from "@/pages/Admin/Course/Course";
import ExerciseManager from "@/pages/Admin/Exercise/Exercise";
import Grammar from "@/pages/Admin/Grammar/Grammar";
import Language from "@/pages/Admin/Language/Language";
import Lesson from "@/pages/Admin/Lesson/Lesson";
import Quest from "@/pages/Admin/Quest/Quest";
import Topic from "@/pages/Admin/Topic/Topic";
import Transaction from "@/pages/Admin/Transaction/Transaction";
import Users from "@/pages/Admin/Users/Users";
import Vocab from "@/pages/Admin/Vocabulary/Vocab";
import cookieUtils from "@/services/cookieUtils";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AdminRouter = () => {
    const [selectedCourseIn, setSelectedCourse] = useState<any>(null);

    if (cookieUtils.getRole() !== 1) return <Navigate to={config.routes.public.home} />;
    return <AdminLayout selectedCourse={selectedCourseIn} setSelectedCourse={setSelectedCourse} />;
}

const adminRoutes = {
    children: [
        // { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.topic, element: <Topic /> },
        { path: config.routes.admin.grammar, element: <Grammar /> },
        { path: config.routes.admin.vocabulary, element: <Vocab /> },
        { path: config.routes.admin.language, element: <Language /> },
        { path: config.routes.admin.course, element: <Course /> },
        { path: config.routes.admin.lesson, element: <Lesson /> },
        { path: config.routes.admin.exercise, element: <ExerciseManager /> },
        { path: config.routes.admin.quest, element: <Quest /> },
        { path: config.routes.admin.archivement, element: <Archivement /> },
        { path: config.routes.admin.transaction, element: <Transaction /> },
        { path: config.routes.admin.user, element: <Users /> },
    ]
}

const AdminRoutes = {
    element: <AdminRouter />,
    children: [adminRoutes],
}

export default AdminRoutes;

