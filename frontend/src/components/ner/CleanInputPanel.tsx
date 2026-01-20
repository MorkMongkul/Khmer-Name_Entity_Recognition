import { useState, useRef } from "react";
import { Upload, FileText, Type, X, Loader2 } from "lucide-react";

interface CleanInputPanelProps {
  text: string;
  onTextChange: (text: string) => void;
  onPredict: () => void;
  onFilePredict: (file: File) => void;
  isLoading: boolean;
  className?: string;
}

export function CleanInputPanel({
  text,
  onTextChange,
  onPredict,
  onFilePredict,
  isLoading,
}: CleanInputPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTextChange(content);
      };
      reader.readAsText(file);
      await onFilePredict(file);
    } else {
      alert("Please upload a text file (.txt)");
    }
  };

  const handleClear = () => {
    onTextChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Type className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Input Text</h3>
              <p className="text-sm text-gray-500">
                Enter Khmer text or upload a file
              </p>
            </div>
          </div>
          {text && (
            <button
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Clear text">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div className="p-6">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="សូមបញ្ចូលអត្ថបទខ្មែរនៅទីនេះ..."
          className="w-full h-48 font-khmer text-lg bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          dir="auto"
        />
      </div>

      {/* File Upload Area */}
      <div
        className={`px-6 pb-6 ${dragActive ? "bg-blue-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}>
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragActive ?
              "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
          }`}>
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Drag & drop a text file</span> or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium">
              browse files
            </button>
          </p>
          <p className="text-sm text-gray-500">Supports .txt files</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onPredict}
            disabled={isLoading || !text.trim()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center font-semibold">
            {isLoading ?
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing...
              </>
            : "Detect Entities"}
          </button>

          {text && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Upload More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
