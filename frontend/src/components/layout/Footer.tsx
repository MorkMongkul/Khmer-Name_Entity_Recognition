import { Github, FileText, University } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-khmer-slate text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <University className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Khmer NER Project</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced NLP research focusing on Khmer language Named Entity Recognition.
              Built with FastText + BiLSTM-CRF architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#model" className="hover:text-white transition-colors">Model Architecture</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors">Performance Stats</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#future" className="hover:text-white transition-colors">Future Work</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/your-repo" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="/report.pdf" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Download Report"
              >
                <FileText className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              © {new Date().getFullYear()} AMS B-06 Group. All rights reserved.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>Natural Language Processing Course Project | Dr. KHON Vanny | M. TOUCH Sopheak</p>
        </div>
      </div>
    </footer>
  );
}