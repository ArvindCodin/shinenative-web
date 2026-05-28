import { Link } from "wouter";
import { ArrowRight, Building2, Users, Award, Shield } from "lucide-react";
import { teamMembers } from "../lib/data";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 max-w-2xl">Building Homes, Building Trust Since 2009</h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Shine Native is Navi Mumbai's trusted real estate developer — known for quality construction, timely delivery, and homes that families love.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "1,200+", label: "Happy Families" },
              { value: "8", label: "Completed Projects" },
              { value: "3", label: "Ongoing Projects" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-amber-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">From a Vision to a Legacy</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009, Shine Native started with a simple belief: every family deserves a home that reflects their dreams and aspirations. We began with a single project in Panvel and have grown into one of Navi Mumbai's most respected residential developers.
                </p>
                <p>
                  Over 15 years, we have delivered 8 landmark projects, housing over 1,200 families across Navi Mumbai. Our commitment is not just to construction — it's to creating communities where people thrive.
                </p>
                <p>
                  Every Shine Native home is built with the finest materials, delivered on time, and supported by our dedicated after-sales team — because your journey with us doesn't end at possession.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&auto=format&fit=crop"
                alt="Our Story"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-amber-600 text-white rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-amber-100 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-7 h-7 text-amber-600" />, title: "Integrity", desc: "We are transparent in every transaction and stand by every promise we make." },
              { icon: <Award className="w-7 h-7 text-amber-600" />, title: "Quality", desc: "We use premium materials and employ skilled craftsmen to build homes that last generations." },
              { icon: <Users className="w-7 h-7 text-amber-600" />, title: "Customer First", desc: "Every decision we make is guided by what is best for our homebuyers and their families." },
              { icon: <Building2 className="w-7 h-7 text-amber-600" />, title: "Timely Delivery", desc: "We have a track record of on-time possession with zero compromises on quality." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4 w-14 h-14 bg-amber-50 rounded-xl mx-auto items-center">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Leadership</p>
            <h2 className="text-3xl font-bold text-gray-900">The Team Behind Shine Native</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100 group-hover:border-amber-200 transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-amber-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Home?</h2>
          <p className="text-gray-400 mb-8">Browse our projects or reach out — our team is here to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              Browse Projects <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white font-bold px-8 py-3 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
