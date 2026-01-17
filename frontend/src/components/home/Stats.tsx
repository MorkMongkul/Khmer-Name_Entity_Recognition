import { Database, Zap, Target, Layers } from 'lucide-react';

const stats = [
  {
    icon: Database,
    value: "7.78M",
    label: "Words in Corpus",
    description: "Trained on 7,481 documents",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Target,
    value: "99.5%",
    label: "Test Accuracy",
    description: "On PER/LOC entities",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    icon: Layers,
    value: "72,364",
    label: "Total Entities",
    description: "34,725 LOC + 37,639 PER",
    color: "text-violet-500",
    bgColor: "bg-violet-50"
  },
  {
    icon: Zap,
    value: "47,367",
    label: "Sentences/min",
    description: "Training throughput",
    color: "text-amber-500",
    bgColor: "bg-amber-50"
  },
];

export function Stats() {
  return (
    <section id="stats" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Project <span className="text-blue-600">Statistics</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive metrics showcasing the scale and performance of our Khmer NER system
          </p>
        </div>

        {/* Stats Grid - Remove index from map */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => ( // Remove index parameter
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="font-medium text-gray-900">{stat.label}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Model Specifications</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• 100-dimensional FastText embeddings</li>
              <li>• BiLSTM-CRF architecture</li>
              <li>• 128 hidden dimensions</li>
              <li>• Skip-gram training</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Training Details</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Window size: 5</li>
              <li>• Min count: 3</li>
              <li>• Workers: 4</li>
              <li>• Epochs: 10</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Data Composition</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• 72.3% Khmer words</li>
              <li>• 19.1% English terms</li>
              <li>• 5,000 kh_data files</li>
              <li>• 2,481 Wikipedia articles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}