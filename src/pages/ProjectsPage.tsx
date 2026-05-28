import { useState } from "react";
import { Link } from "wouter";
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import { projects, statusLabels, statusColors, formatPrice } from "../lib/data";

const allStatuses = ["new_launch", "under_construction", "ready_to_move", "ready_for_registration"];
const allConfigs = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [configFilter, setConfigFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchConfig = !configFilter || p.configurations.includes(configFilter);
    return matchSearch && matchStatus && matchConfig;
  });

  const hasFilters = !!statusFilter || !!configFilter;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">Our Portfolio</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">All Projects</h1>
          <p className="text-gray-500">Discover premium residential developments across Navi Mumbai</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-3 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
              showFilters || hasFilters ? "bg-amber-600 text-white border-amber-600" : "border-gray-200 text-gray-700 hover:border-amber-500"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasFilters && <span className="bg-white text-amber-600 rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">!</span>}
          </button>

          {hasFilters && (
            <button onClick={() => { setStatusFilter(""); setConfigFilter(""); }} className="text-sm text-gray-500 hover:text-red-500">
              Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 flex items-center">Status:</span>
              {allStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    statusFilter === s ? "bg-amber-600 text-white border-amber-600" : "border-gray-200 text-gray-600 hover:border-amber-400"
                  }`}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              <span className="text-xs text-gray-500 flex items-center">Config:</span>
              {allConfigs.map((c) => (
                <button
                  key={c}
                  onClick={() => setConfigFilter(configFilter === c ? "" : c)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    configFilter === c ? "bg-amber-600 text-white border-amber-600" : "border-gray-200 text-gray-600 hover:border-amber-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-500 mb-6">{filtered.length} project{filtered.length !== 1 ? "s" : ""} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects match your search.</p>
            <button onClick={() => { setSearch(""); setStatusFilter(""); setConfigFilter(""); }} className="mt-4 text-amber-600 font-medium">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100">
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-0.5">{project.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{project.location}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.configurations.map((c) => (
                        <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                      <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="font-bold text-amber-700">{formatPrice(project.priceMin)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Possession</p>
                        <p className="text-sm font-medium text-gray-700">{project.possession}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end text-amber-600 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
