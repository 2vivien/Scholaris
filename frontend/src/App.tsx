import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { landingRoutes } from './pages/landing/data/landingRoutes';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SetupSuperAdmin from './pages/SetupSuperAdmin';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import SchoolDashboard from './pages/dashboard/SchoolDashboard';
import SchoolYearManager from './pages/dashboard/academic/SchoolYearManager';
import ClassManager from './pages/dashboard/academic/ClassManager';
import SubjectManager from './pages/dashboard/academic/SubjectManager';
import StudentsPage from './pages/dashboard/students/StudentsPage';
import TeachersPage from './pages/dashboard/teachers/TeachersPage';
import GradesPage from './pages/dashboard/grades/GradesPage';
import GradeEntryPage from './pages/dashboard/grades/GradeEntryPage';
import BulletinsPage from './pages/dashboard/grades/BulletinsPage';
import FinancePage from './pages/dashboard/finance/FinancePage';
import AttendancePage  from './pages/dashboard/attendance/AttendancePage';
import TimetablePage   from './pages/dashboard/timetable/TimetablePage';
import SettingsPage    from './pages/dashboard/settings/SettingsPage';
import MessagesPage       from './pages/dashboard/messages/MessagesPage';
import AffectationsPage  from './pages/dashboard/affectations/AffectationsPage';
import CalendarPage      from './pages/dashboard/calendar/CalendarPage';
import ReportsPage       from './pages/dashboard/reports/ReportsPage';
import TeacherLayout     from './pages/teacher/TeacherLayout';
import TeacherHome       from './pages/teacher/TeacherHome';
import TeacherClasses    from './pages/teacher/TeacherClasses';
import TeacherGrades     from './pages/teacher/TeacherGrades';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherTimetable  from './pages/teacher/TeacherTimetable';
import TeacherParentView from './pages/teacher/TeacherParentView';
import ParentDashboard from './pages/parent/ParentDashboard';
import UserDashboard from './pages/user/UserDashboard';
import ForumPage from './pages/forum/ForumPage';
import CreateTopicPage from './pages/forum/CreateTopicPage';
import TopicDetailPage from './pages/forum/TopicDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/setup-superadmin" element={<SetupSuperAdmin />} />
          
          {/* Landing Subpages */}
          {landingRoutes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={<PlaceholderPage title={route.title} category={route.category} />} 
            />
          ))}
          
          {/* Portail Parent / Simple User */}
          <Route element={<ProtectedRoute allowedRoles={['parent', 'user']} />}>
            <Route path="/parent" element={<ParentDashboard />}>
              <Route path="feed" element={<ForumPage />} />
              <Route path="feed/create" element={<CreateTopicPage />} />
              <Route path="feed/topics/:id" element={<TopicDetailPage />} />
              <Route path="feed/topics/:id/:slug" element={<TopicDetailPage />} />
            </Route>
            <Route path="/user" element={<UserDashboard />}>
              <Route path="feed" element={<ForumPage />} />
              <Route path="feed/create" element={<CreateTopicPage />} />
              <Route path="feed/topics/:id" element={<TopicDetailPage />} />
              <Route path="feed/topics/:id/:slug" element={<TopicDetailPage />} />
              <Route path="settings" />
            </Route>
          </Route>

          {/* Super Admin */}
          <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
            <Route path="/dashboard" element={<SuperAdminDashboard />} />
          </Route>

          {/* Admin École + Super Admin */}
          <Route element={<ProtectedRoute allowedRoles={['super_admin', 'admin_ecole']} />}>
            <Route path="/ecole-dashboard" element={<SchoolDashboard />}>
              <Route path="years"    element={<SchoolYearManager />} />
              <Route path="classes"  element={<ClassManager />} />
              <Route path="academic" element={<SubjectManager />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="teachers" element={<TeachersPage />} />
              <Route path="grades" element={<GradesPage />} />
              <Route path="grades/entry" element={<GradeEntryPage />} />
              <Route path="grades/bulletins" element={<BulletinsPage />} />
              <Route path="finances"    element={<FinancePage />} />
              <Route path="attendance"  element={<AttendancePage />} />
              <Route path="timetable"  element={<TimetablePage />} />
              <Route path="settings"   element={<SettingsPage />} />
              <Route path="messages"      element={<MessagesPage />} />
              <Route path="affectations" element={<AffectationsPage />} />
              <Route path="calendar"     element={<CalendarPage />} />
              <Route path="reports"      element={<ReportsPage />} />
              <Route path="feed" element={<ForumPage />} />
              <Route path="feed/create" element={<CreateTopicPage />} />
              <Route path="feed/topics/:id" element={<TopicDetailPage />} />
              <Route path="feed/topics/:id/:slug" element={<TopicDetailPage />} />
            </Route>
          </Route>

          {/* Portail Enseignant */}
          <Route element={<ProtectedRoute allowedRoles={['enseignant']} />}>
            <Route path="/prof" element={<TeacherLayout />}>
              <Route index element={<TeacherHome />} />
              <Route path="classes"     element={<TeacherClasses />} />
              <Route path="grades"      element={<TeacherGrades />} />
              <Route path="grades/entry" element={<GradeEntryPage />} />
              <Route path="attendance"  element={<TeacherAttendance />} />
              <Route path="timetable"   element={<TeacherTimetable />} />
              <Route path="parent"      element={<TeacherParentView />} />
              <Route path="feed" element={<ForumPage />} />
              <Route path="feed/create" element={<CreateTopicPage />} />
              <Route path="feed/topics/:id" element={<TopicDetailPage />} />
              <Route path="feed/topics/:id/:slug" element={<TopicDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
