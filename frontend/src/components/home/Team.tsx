import { Users } from "lucide-react";

export function Team() {
  return (
    <section id="team" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full mb-4">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Profile</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Project <span className="text-khmer-blue">Owner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This project is presented and maintained by:
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                MORK Mongkul
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
