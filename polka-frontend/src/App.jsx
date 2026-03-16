import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home      from '@/pages/Home'
import Swap      from '@/pages/Swap'
import Causes    from '@/pages/Causes'
import Create    from '@/pages/Create'
import Dashboard from '@/pages/Dashboard'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/swap"      element={<Swap />} />
        <Route path="/causes"    element={<Causes />} />
        <Route path="/create"    element={<Create />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}
