import { Cpu, FileStack, Network, Zap } from 'lucide-react';

const steps = [
  {
    icon: FileStack,
    title: "Data Collection",
    description: "7.48M words from multiple sources including Wikipedia and web documents",
    details: ["5,000 kh_data files", "2,481 Wikipedia articles", "293,594 sentences"]
  },
  {
    icon: Network,
    title: "FastText Embeddings",
    description: "Skip-gram model with subword information for better OOV handling",
    details: ["100-dimensional vectors", "57,107 vocabulary", "45.93 MB model size"]
  },
  {
    icon: Cpu,
    title: "BiLSTM-CRF Model",
    description: "Bidirectional LSTM with Conditional Random Fields for sequence labeling",
    details: ["128 hidden dimensions", "BIO tagging schema", "PER/LOC entity recognition"]
  },
  {
    icon: Zap,
    title: "Inference & Deployment",
    description: "Real-time entity extraction with high accuracy and performance",
    details: ["99.5% accuracy", "Real-time processing", "REST API backend"]
  }
];

export function Architecture() {
  return (
    <section id="model" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Model <span className="text-khmer-blue">Architecture</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A two-phase approach combining subword embeddings with sequence labeling
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-khmer-blue rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-khmer-blue">{index + 1}</span>
                </div>

                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-blue-50 mb-4">
                      <step.icon className="h-8 w-8 text-khmer-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {/* Details */}
                    <div className="space-y-2 w-full">
                      {step.details.map((detail) => (
                        <div 
                          key={detail} 
                          className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Architecture</h3>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Input</div>
              <div className="bg-gray-100 rounded-lg p-4 font-khmer text-lg">
                អតីតនាយករដ្ឋមន្ត្រី [PER]ហ៊ុន សែន[/PER]
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Processing</div>
              <div className="space-y-2">
                <div className="bg-blue-50 text-khmer-blue rounded-lg p-3 text-sm font-medium">
                  FastText → BiLSTM → CRF
                </div>
                <div className="text-xs text-gray-500">Subword embeddings → Sequence labeling → Entity classification</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Output</div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-khmer-emerald"></div>
                  <span className="font-medium">PER: ហ៊ុន សែន</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}