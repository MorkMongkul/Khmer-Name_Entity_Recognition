import {
  CheckCircle,
  Clock,
  BarChart3,
  MapPin,
  User,
  AlertCircle,
} from "lucide-react";
import { Entity } from "../../types/ner";

interface ResultsVisualizerProps {
  text: string;
  entities: Entity[];
  processingTime: number;
  wordCount: number;
  entityCount: number;
}

export function ResultsVisualizer({
  text,
  entities,
  processingTime,
  wordCount,
  entityCount,
}: ResultsVisualizerProps) {
  const getEntityColor = (label: string) => {
    if (label === "B-PER" || label === "I-PER") {
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        border: "border-emerald-300",
        icon: <User className="h-4 w-4" />,
        type: "Person",
      };
    }
    if (label === "B-LOC" || label === "I-LOC") {
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
        icon: <MapPin className="h-4 w-4" />,
        type: "Location",
      };
    }
    return {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-300",
      icon: null,
      type: "Other",
    };
  };

  // Filter only non-O entities
  const nonOEntities = entities.filter((entity) => entity.label !== "O");
  const hasEntities = nonOEntities.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 ${
                hasEntities ? "bg-emerald-50" : "bg-gray-50"
              } rounded-lg`}>
              {hasEntities ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Detected Entities</h3>
              <p className="text-sm text-gray-500">
                {hasEntities
                  ? `${nonOEntities.length} entities found`
                  : "No entities detected"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {wordCount}
                </div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {(processingTime / 1000).toFixed(2)}s
                </div>
                <div className="text-sm text-gray-600">Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entity List */}
      <div className="p-6">
        {hasEntities ? (
          <>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {nonOEntities.map((entity, index) => {
                const colors = getEntityColor(entity.label);
                return (
                  <div
                    key={index}
                    className={`${colors.bg} ${colors.border} border rounded-lg p-3`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {colors.icon}
                        <span className={`font-medium ml-2 ${colors.text}`}>
                          {entity.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {colors.type}
                        </div>
                        <div className="text-xs text-gray-500">type</div>
                      </div>
                    </div>
                    <div className="font-khmer text-gray-900 mt-1">
                      "{entity.text}"
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Entity Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Entity Summary</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="font-medium text-emerald-700">PER</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-800 mt-2">
                    {nonOEntities.filter((e) => e.label.includes("PER")).length}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="font-medium text-blue-700">LOC</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mt-2">
                    {nonOEntities.filter((e) => e.label.includes("LOC")).length}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-600 mb-2">No entities detected</p>
            <p className="text-sm text-gray-500">
              The model didn't find any Person (PER) or Location (LOC) entities
              in this text.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
