import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-8">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Research Project</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Khmer <span className="text-blue-600">Named Entity</span>
          <br />
          Recognition
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Khmer Named Entity Recognition (NER) is a system for Khmer text that
          build and trained to predict name of the <strong>Person</strong>,{" "}
          <strong>Location</strong>, <strong>Organization</strong> and more ...
          <br />
          by using a{" "}
          <strong>
            <i>character-level autoencoder </i>{" "}
          </strong>{" "}
          for word embeddings and a{" "}
          <strong>
            <i>BiLSTM-CRF</i>
          </strong>{" "}
          sequence labeling model. the system can predict khmer text well.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/demo"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg font-semibold group">
            Try Live Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#model"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-lg font-semibold">
            View Architecture
          </a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">Person</div>
            <div className="text-sm text-gray-500">labeled</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-emerald-500">Location</div>
            <div className="text-sm text-gray-500">labeled</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-violet-500">
              Organization
            </div>
            <div className="text-sm text-gray-500">labeled</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-amber-500">ADDRESS</div>
            <div className="text-sm text-gray-500">labeled</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
