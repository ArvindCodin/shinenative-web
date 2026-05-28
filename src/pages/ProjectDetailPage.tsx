import { useState } from "react";
import { Link, useParams } from "wouter";
import { MapPin, Calendar, Building2, FileText, Download, ChevronLeft, CheckCircle, X, Phone } from "lucide-react";
import { projects, statusLabels, statusColors, formatPrice } from "../lib/data";
import { LeadForm } from "../components/LeadForm";
import { EmiCalculator } from "../components/EmiCalculator";
import { BrochureModal } from "../components/BrochureModal";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "floorplans" | "amenities" | "emi">("overview");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Project not found</p>
          <Link href="/projects" className="text-amber-600 font-medium">← Back to Projects</Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-amber-600">Projects</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{project.name}</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-4 rounded-xl overflow-hidden h-64 sm:h-96">
              <img
                src={project.images[activeImage]}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col gap-3">
              {project.images.slice(0, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-amber-500" : "border-transparent opacity-60 hover:opacity-90"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          {/* Mobile thumbnails */}
          <div className="flex gap-2 mt-3 lg:hidden overflow-x-auto">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${activeImage === i ? "border-amber-500" : "border-transparent opacity-60"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[project.status]} mb-2 inline-block`}>
                  {statusLabels[project.status]}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {project.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Starting from</p>
                <p className="text-2xl font-bold text-amber-700">{formatPrice(project.priceMin)}</p>
                <p className="text-xs text-gray-400">up to {formatPrice(project.priceMax)}</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Configurations", value: project.configurations.join(", "), icon: Building2 },
                { label: "Possession", value: project.possession, icon: Calendar },
                { label: "Total Units", value: project.totalUnits || "—", icon: Building2 },
                { label: "Total Area", value: project.totalArea || "—", icon: MapPin },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
              {[
                { key: "overview", label: "Overview" },
                { key: "floorplans", label: "Floor Plans" },
                { key: "amenities", label: "Amenities" },
                { key: "emi", label: "EMI Calculator" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-amber-600 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">{project.about}</p>
                <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="text-green-500 w-4 h-4 shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
                {project.reraNumber && (
                  <p className="mt-6 text-xs text-gray-400">
                    <span className="font-medium">RERA No:</span> {project.reraNumber}
                  </p>
                )}
              </div>
            )}

            {activeTab === "floorplans" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.floorPlans.map((fp) => (
                  <div key={fp.label} className="border border-gray-100 rounded-xl overflow-hidden">
                    <img src={fp.image} alt={fp.label} className="w-full h-40 object-cover" />
                    <p className="px-4 py-3 text-sm font-semibold text-gray-800">{fp.label}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "amenities" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                    <CheckCircle className="text-amber-500 w-4 h-4 shrink-0" />
                    <span className="text-sm text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "emi" && (
              <EmiCalculator defaultAmount={project.priceMin * 0.8} />
            )}
          </div>

          {/* Right — CTA Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Interested in {project.name}?</h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowEnquiry(true)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Send Enquiry
                  </button>
                  <button
                    onClick={() => setShowVisit(true)}
                    className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Book a Visit
                  </button>
                  <button
                    onClick={() => setShowBrochure(true)}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-xl transition-colors text-sm"
                  >
                    <Download size={16} /> Download Brochure
                  </button>
                  <a
                    href="tel:+912227421000"
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <Phone size={16} /> Call Us Now
                  </a>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 text-sm">
                <p className="font-semibold text-amber-800 mb-1">Price starts at {formatPrice(project.priceMin)}</p>
                <p className="text-amber-700 text-xs">* All-inclusive price. Final pricing subject to unit selection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowEnquiry(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-900">Enquire about {project.name}</h2>
              <button onClick={() => setShowEnquiry(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <LeadForm
              leadType="enquiry"
              projectName={project.name}
              projectId={project.id}
              onSuccess={() => setTimeout(() => setShowEnquiry(false), 2000)}
            />
          </div>
        </div>
      )}

      {showVisit && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowVisit(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-900">Book a Visit — {project.name}</h2>
              <button onClick={() => setShowVisit(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <LeadForm
              leadType="book_visit"
              projectName={project.name}
              projectId={project.id}
              showVisitDate
              onSuccess={() => setTimeout(() => setShowVisit(false), 2000)}
            />
          </div>
        </div>
      )}

      {showBrochure && (
        <BrochureModal
          projectName={project.name}
          projectId={project.id}
          onClose={() => setShowBrochure(false)}
        />
      )}
    </div>
  );
}
