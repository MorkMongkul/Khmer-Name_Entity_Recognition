import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, History, Clock, Layout } from "lucide-react";
import { CleanInputPanel } from "../components/ner/CleanInputPanel";
import { ResultsVisualizer } from "../components/ner/ResultsVisualizer";
import { Container } from "../components/layout/Container";
import { nerService, HistoryItem } from "../services/api/nerService";
import { Entity } from "../types/ner";

/* =========================
   Helper functions
========================= */
const countPER = (entities: Entity[] = []) =>
  entities.filter((e) => typeof e.label === "string" && e.label.includes("PER"))
    .length;

const countLOC = (entities: Entity[] = []) =>
  entities.filter((e) => typeof e.label === "string" && e.label.includes("LOC"))
    .length;

export function CleanDemoPage() {
  const navigate = useNavigate();

  // Input & Prediction state
  const [text, setText] = useState("");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [processingTime, setProcessingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [entityCount, setEntityCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Tabs & history
  const [activeTab, setActiveTab] = useState<"input" | "history">("input");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(
    null
  );

  /* =========================
     Effects
  ========================== */
  useEffect(() => {
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  }, [text]);

  useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);

  /* =========================
     API Calls
  ========================== */
  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const historyData = await nerService.getHistory(0, 50);
      setHistory(historyData);
    } catch (error) {
      console.error("Failed to load history:", error);
      setHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handlePredict = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    // Clear selected history when doing a new prediction
    setSelectedHistory(null);

    try {
      const result = await nerService.predict(text);
      setEntities(result.entities);
      setProcessingTime(result.processing_time);
      setEntityCount(
        result.entities.filter((e: Entity) => e.label !== "O").length
      );
      // Refresh history in background
      const historyData = await nerService.getHistory(0, 50);
      setHistory(historyData);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed. Please check backend.");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     Render
  ========================== */
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* 1. Header - Fixed height */}
      <header className="bg-white border-b flex-none z-20">
        <Container>
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-blue-600 transition font-medium">
              <ArrowLeft className="mr-2" size={20} /> Back
            </button>
            <div className="flex items-center space-x-2 text-blue-600">
              <Brain size={24} />
              <span className="font-bold text-gray-900 text-lg">
                Khmer NER Demo
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* 2. Main Body - Fills remaining height */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Container className="flex-1 flex flex-col min-h-0 py-6">
          {/* Tabs Container */}
          <div className="flex border-b mb-6 flex-none">
            <button
              onClick={() => setActiveTab("input")}
              className={`px-8 py-3 font-semibold transition-all border-b-2 ${
                activeTab === "input"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              Input Panel
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-8 py-3 font-semibold flex items-center transition-all border-b-2 ${
                activeTab === "history"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              <History className="h-4 w-4 mr-2" />
              History
              {history.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded-full">
                  {history.length}
                </span>
              )}
            </button>
          </div>

          {/* Grid Layout - Fixed structure to prevent width changes */}
          <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* LEFT SIDE: Input or History (Spans 2/3) */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              <div className="bg-white border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === "input" ? (
                    <div className="h-full w-full">
                      <CleanInputPanel
                        text={text}
                        onTextChange={setText}
                        onPredict={handlePredict}
                        onFilePredict={() => {}}
                        isLoading={isLoading}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {isLoadingHistory ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                          <p>Loading your history...</p>
                        </div>
                      ) : history.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                          <History className="mx-auto h-12 w-12 opacity-20 mb-4" />
                          <p>No previous analyses found</p>
                        </div>
                      ) : (
                        history.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedHistory(item)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedHistory?.id === item.id
                                ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                                : "hover:border-blue-300 hover:bg-gray-50"
                            }`}>
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(item.created_at).toLocaleString()}
                              </span>
                              <div className="flex gap-2">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  {countPER(item.entities)} Per
                                </span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  {countLOC(item.entities)} Loc
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700 line-clamp-2 text-sm leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Visualizer (Spans 1/3) */}
            <div className="lg:col-span-1 flex flex-col min-h-0">
              <div className="bg-white border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Real-time Analysis
                  </h3>
                  <Layout size={14} className="text-gray-400" />
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {selectedHistory ? (
                    <ResultsVisualizer
                      text={selectedHistory.text}
                      entities={selectedHistory.entities ?? []}
                      processingTime={selectedHistory.processing_time}
                      wordCount={
                        selectedHistory.text.trim().split(/\s+/).length
                      }
                      entityCount={
                        selectedHistory.entities?.filter((e) => e.label !== "O")
                          .length ?? 0
                      }
                    />
                  ) : entities.length > 0 ? (
                    <ResultsVisualizer
                      text={text}
                      entities={entities}
                      processingTime={processingTime}
                      wordCount={wordCount}
                      entityCount={entityCount}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 italic">
                      <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <Brain className="h-10 w-10 text-gray-200" />
                      </div>
                      <p className="text-sm">
                        Enter Khmer text and click "Analyze" to see results here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
