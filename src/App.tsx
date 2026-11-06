import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectPage from './pages/SubjectPage';
import ComingSoonPage from './pages/ComingSoonPage';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import VideosPage from './pages/VideosPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route
          index
          element={<HomePage />}
        />

        {/* Subjects */}
        <Route
          path="subjects"
          element={<SubjectsPage />}
        />

        <Route
          path="subjects/:subjectId"
          element={<SubjectPage />}
        />

        {/* Learning Library */}
        <Route
          path="papers"
          element={<LibraryPage key="papers" mode="papers" />}
        />

        <Route
          path="notes"
          element={<LibraryPage key="notes" mode="notes" />}
        />

        {/* Stage 3: Video Learning */}
        <Route
          path="videos"
          element={<VideosPage />}
        />

        {/* Future Features */}
        <Route
          path="ai-tutor"
          element={
            <ComingSoonPage
              titleKey="navAi"
              textKey="aiText"
              stage={4}
            />
          }
        />

        <Route
          path="planner"
          element={
            <ComingSoonPage
              titleKey="navPlanner"
              textKey="plannerText"
              stage={6}
            />
          }
        />

        {/* Student Dashboard */}
        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        {/* Invalid Routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}
