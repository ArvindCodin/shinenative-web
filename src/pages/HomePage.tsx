import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Shield, Award, Users, ChevronRight, Download } from "lucide-react";
import { projects, statusLabels, statusColors, formatPrice } from "../lib/data";
import { LeadForm } from "../components/LeadForm";
import { BrochureModal } from "../components/BrochureModal";

export function HomePage() {
  const [heroFormOpen, setHeroFormOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded mb-6 tracking-wider uppercase">
              Navi Mumbai's Premium Developer
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Your<br />
              <span className="text-amber-400">Dream Home</span><br />
              in Navi Mumbai
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Trusted by 1,200+ families. Premium residential developments designed for the way you live — crafted with care, delivered on promise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition-colors text-base"
              >
                Explore Projects <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setHeroFormOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all text-base"
              >
                Book a Site Visit
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { value: "1,200+", label: "Happy Families" },
                { value: "15+", label: "Years of Trust" },
                { value: "8", label: "Landmark Projects" },
                { value: "100%", label: "RERA Compliant" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {heroFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setHeroFormOpen(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <LeadForm
                leadType="book_visit"
                title="Book a Site Visit"
                subtitle="Our team will arrange a guided tour at your convenience."
                showVisitDate
                onSuccess={() => setTimeout(() => setHeroFormOpen(false), 2000)}
              />
            </div>
          </div>
        )}
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">Our Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Projects</h2>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-1 text-amber-600 font-semibold text-sm hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
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
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{project.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{project.location}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.configurations.map((c) => (
                        <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="font-bold text-amber-700 text-base">{formatPrice(project.priceMin)}</p>
                      </div>
                      <span className="text-amber-600 text-sm font-semibold flex items-center gap-1">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/projects" className="text-amber-600 font-semibold">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">Why Shine Native</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built on Trust & Excellence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-amber-600" />,
                title: "100% RERA Compliant",
                desc: "All projects are registered under MahaRERA, ensuring complete transparency and legal compliance.",
              },
              {
                icon: <Award className="w-8 h-8 text-amber-600" />,
                title: "Award-Winning Design",
                desc: "Recognised for architectural excellence and thoughtful living spaces that stand the test of time.",
              },
              {
                icon: <Users className="w-8 h-8 text-amber-600" />,
                title: "1,200+ Happy Families",
                desc: "Over 15 years of building homes, communities, and lasting relationships with our homebuyers.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NRI Desk */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded mb-4 tracking-wider uppercase">NRI Desk</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Investing from Abroad?<br />We've Got You Covered.</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our dedicated NRI team handles everything — from property selection and legal documentation to home loans and registration — so you can invest in Navi Mumbai without being here.
              </p>
              <ul className="space-y-3 text-gray-300 text-sm mb-8">
                {[
                  "Virtual site tours & walkthroughs",
                  "End-to-end documentation assistance",
                  "NRI home loan guidance",
                  "Power of attorney support",
                  "Repatriation & tax consultation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Contact NRI Desk <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <LeadForm
                leadType="nri_desk"
                title="NRI Enquiry"
                subtitle="Our NRI specialist will call you within 24 hours."
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-amber-100 mb-8">Talk to our experts today and take the first step towards your perfect home.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="bg-white text-amber-700 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors">
              Browse Projects
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Talk to an Expert
            </Link>
            <button
              onClick={() => setBrochureOpen(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/50 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              <Download size={16} /> Download Brochure
            </button>
          </div>
        </div>
      </section>

      {brochureOpen && (
        <BrochureModal onClose={() => setBrochureOpen(false)} />
      )}
    </div>
  );
}
