import { Users, GraduationCap, BookOpen } from "lucide-react";

const teamMembers = [
  { name: "MORK Mongkul", id: "e20210249" },
  { name: "PHALLY Makara", id: "e20211154" },
  { name: "Phao Chanthin", id: "e20210227" },
];

const lecturers = [
  { name: "Dr. KHON Vanny", role: "Instructure" },
  { name: "M. TOUCH Sopheak", role: "Instructure" },
];

export function Team() {
  return (
    <section id="team" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full mb-4">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Group AMS B-06</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Project <span className="text-khmer-blue">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated students and mentors behind this NLP research project
          </p>
        </div>

        {/* Lecturers */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <GraduationCap className="h-6 w-6 text-khmer-blue" />
            <h3 className="text-2xl font-bold text-gray-900">
              Project Supervisors
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {lecturers.map((lecturer) => (
              <div
                key={lecturer.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {lecturer.name}
                </h4>
                <p className="text-gray-600">{lecturer.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="h-6 w-6 text-khmer-blue" />
            <h3 className="text-2xl font-bold text-gray-900">Student Team</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{member.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-xl px-6 py-4">
            <div>
              <div className="text-sm text-gray-500">Course</div>
              <div className="font-semibold text-gray-900">
                Natural Language Processing
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <div className="text-sm text-gray-500">Project</div>
              <div className="font-semibold text-gray-900">
                Named Entity Recognition for Khmer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
