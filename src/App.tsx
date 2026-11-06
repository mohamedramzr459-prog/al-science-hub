import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectPage from './pages/SubjectPage';
import ComingSoonPage from './pages/ComingSoonPage';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subjects/:subjectId" element={<SubjectPage />} />
        <Route path="papers" element={<LibraryPage key="papers" mode="papers" />} />
        <Route path="notes" element={<LibraryPage key="notes" mode="notes" />} />
        <Route path="videos" element={<ComingSoonPage titleKey="navVideos" textKey="videosText" stage={3} />} />
        <Route path="ai-tutor" element={<ComingSoonPage titleKey="navAi" textKey="aiText" stage={4} />} />
        <Route path="planner" element={<ComingSoonPage titleKey="navPlanner" textKey="plannerText" stage={6} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
