import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function App() {
  const base = getBasePath();

  return (
    <Router base={base}>
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/projects" component={ProjectsPage} />
              <Route path="/project/:id" component={ProjectDetailPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
                    <p className="text-gray-500 mb-6">Page not found</p>
                    <a href={base + "/"} className="text-amber-600 font-semibold hover:underline">← Go Home</a>
                  </div>
                </div>
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
