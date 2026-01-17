import { Hero } from '../components/home/Hero';
import { Stats } from '../components/home/Stats';
import { Architecture } from '../components/home/Architecture';
import { Team } from '../components/home/Team';
import { Container } from '../components/layout/Container';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Container>
        <Stats />
        <Architecture />
        <Team />
        
        {/* Future Work Section */}
        <section id="future" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Future <span className="text-khmer-blue">Work</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planned enhancements and research directions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transformer Models</h3>
              <p className="text-gray-600">
                Transition to BERT/RoBERTa architectures for improved contextual understanding
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expanded Entities</h3>
              <p className="text-gray-600">
                Add ORG, DATE, MONEY, TIME entity types for comprehensive coverage
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cross-Lingual Transfer</h3>
              <p className="text-gray-600">
                Leverage multilingual models for knowledge transfer from high-resource languages
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}