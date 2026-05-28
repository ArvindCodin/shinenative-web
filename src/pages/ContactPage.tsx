import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { LeadForm } from "../components/LeadForm";

export function ContactPage() {
  const [activeForm, setActiveForm] = useState<"enquiry" | "book_visit" | "nri_desk">("enquiry");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl">Our team is ready to help you find your perfect home. Reach out — we typically respond within 2 hours.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Office Address</p>
                    <p className="text-gray-500 text-sm mt-0.5">Shine Native Realty Pvt. Ltd.<br />Sector 15, CBD Belapur<br />Navi Mumbai — 400614</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Phone</p>
                    <a href="tel:+912227421000" className="text-amber-600 hover:underline text-sm">+91 22 2742 1000</a>
                    <br />
                    <a href="tel:+919876543210" className="text-amber-600 hover:underline text-sm">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <a href="mailto:info@shinenative.in" className="text-amber-600 hover:underline text-sm">info@shinenative.in</a>
                    <br />
                    <a href="mailto:sales@shinenative.in" className="text-amber-600 hover:underline text-sm">sales@shinenative.in</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
                    <a
                      href="https://wa.me/912227421000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Office Hours</p>
                    <p className="text-gray-500 text-sm mt-0.5">Mon–Sat: 10:00 AM – 7:00 PM<br />Sunday: 11:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NRI Desk callout */}
            <div className="bg-gray-900 text-white rounded-2xl p-5">
              <p className="font-bold text-amber-400 text-sm uppercase tracking-wide mb-2">NRI Desk</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Investing from outside India? Our NRI specialists handle everything end-to-end for you.
              </p>
              <button
                onClick={() => setActiveForm("nri_desk")}
                className="text-amber-400 font-semibold text-sm hover:underline"
              >
                Use the NRI Enquiry Form →
              </button>
            </div>
          </div>

          {/* Right — Forms */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {/* Form Type Tabs */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {[
                  { key: "enquiry", label: "General Enquiry" },
                  { key: "book_visit", label: "Book a Visit" },
                  { key: "nri_desk", label: "NRI Desk" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveForm(tab.key as typeof activeForm)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeForm === tab.key
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeForm === "enquiry" && (
                <LeadForm
                  key="enquiry"
                  leadType="enquiry"
                  title="Send us an Enquiry"
                  subtitle="Tell us what you're looking for and our team will get back to you."
                />
              )}
              {activeForm === "book_visit" && (
                <LeadForm
                  key="book_visit"
                  leadType="book_visit"
                  title="Book a Site Visit"
                  subtitle="Pick a date and our sales team will arrange a guided tour."
                  showVisitDate
                />
              )}
              {activeForm === "nri_desk" && (
                <LeadForm
                  key="nri_desk"
                  leadType="nri_desk"
                  title="NRI Enquiry"
                  subtitle="Our NRI specialist will contact you within 24 hours."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
