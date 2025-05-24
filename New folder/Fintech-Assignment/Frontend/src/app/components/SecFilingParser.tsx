"use client";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface Section {
  text: string;
  raw_html?: string;
}

interface StructuredOutput {
  cik: string;
  company: string;
  ticker: string;
  form: string;
  table_of_contents: Array<{ item: string; title: string }>;
  [key: string]: any;
}

interface Chunk {
  chunk_id: string;
  section: string;
  text: string;
  tokens: number;
  source: string;
}

interface ParsedResult {
  structured: StructuredOutput;
  chunked: {
    metadata: {
      cik: string;
      company: string;
      ticker: string;
      form: string;
    };
    chunks: Chunk[];
  };
}

export default function SecFilingParser() {
  const [ticker, setTicker] = useState("");
  const [formType, setFormType] = useState("10-K");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'structured' | 'chunked'>('structured');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/sec-filing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, formType, year })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to fetch filing");
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to parse filing");
      }

      setResult(data.data);
    } catch (err) {
      console.error('Error fetching filing:', err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStructuredOutput = () => {
    if (!result?.structured) return null;

    const { structured } = result;
    const sections = Object.entries(structured)
      .filter(([key]) => key.startsWith('item_'))
      .map(([key, value]) => ({
        key,
        title: structured.table_of_contents?.find(toc => toc.item === key)?.title || key,
        content: (value as Section).text
      }));

    return (
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Company Information</h3>
          <p>Company: {structured.company}</p>
          <p>Ticker: {structured.ticker}</p>
          <p>CIK: {structured.cik}</p>
          <p>Form Type: {structured.form}</p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.key} className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p className="whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChunkedOutput = () => {
    if (!result?.chunked) return null;

    const { chunks } = result.chunked;

    return (
      <div className="space-y-4">
        {chunks.map((chunk) => (
          <div key={chunk.chunk_id} className="bg-gray-800 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{chunk.section}</h3>
              <span className="text-sm text-gray-400">{chunk.tokens} tokens</span>
            </div>
            <p className="whitespace-pre-wrap">{chunk.text}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="p-4 bg-red-500/10 border border-red-500 text-red-400 rounded">
        <h3 className="font-semibold mb-2">Error</h3>
        <p>{error}</p>
        <p className="mt-2 text-sm">Please check your input and try again.</p>
      </div>
    );
  };

  const renderLoadingState = () => {
    if (!loading) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaSpinner className="animate-spin text-2xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Processing Filing</h3>
              <p className="text-gray-400">This may take a few minutes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold">SEC Filing Parser</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="ticker" className="block text-sm font-medium text-gray-300">
            Ticker Symbol
          </label>
          <input
            id="ticker"
            type="text"
            placeholder="Ticker (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            required
            pattern="[A-Z]{1,5}"
            title="1-5 uppercase letters"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="formType" className="block text-sm font-medium text-gray-300">
            Form Type
          </label>
          <select
            id="formType"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="10-K">10-K</option>
            <option value="10-Q">10-Q</option>
            <option value="8-K">8-K</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="block text-sm font-medium text-gray-300">
            Year
          </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            min="1993"
            max={new Date().getFullYear()}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center transition-colors"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            "Fetch Filing"
          )}
        </button>
      </form>

      {renderError()}
      {renderLoadingState()}

      {result && (
        <div className="mt-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('structured')}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === 'structured'
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Structured View
            </button>
            <button
              onClick={() => setActiveTab('chunked')}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === 'chunked'
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Chunked View
            </button>
          </div>

          <div className="max-h-[800px] overflow-y-auto">
            {activeTab === 'structured' ? renderStructuredOutput() : renderChunkedOutput()}
          </div>
        </div>
      )}
    </div>
  );
}
